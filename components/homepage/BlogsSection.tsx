"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "../BlogCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { Blog } from "@/lib/models";
import Container from "../Container";

export default function BlogsSection() {
    const [blogs, setBlogs] = React.useState<Blog[]>([]);
    const [loading, setLoading] = React.useState(true);
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();

                if (data.success) {
                    // Get only the first 6 blogs for the homepage
                    setBlogs(data.blogs.slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Latest from Our Blog
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest insights, tutorials, and
                        industry trends from our expert instructors and thought
                        leaders in technology and design.
                    </p>
                </div>

                {/* Blog Cards Carousel */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : blogs.length > 0 ? (
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full mb-16"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {blogs.map((blog) => (
                                <CarouselItem
                                    key={blog._id}
                                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
                                >
                                    <BlogCard
                                        id={blog._id!}
                                        title={blog.title}
                                        description={
                                            blog.content
                                                .substring(0, 150)
                                                .replace(/<[^>]*>/g, "") + "..."
                                        }
                                        publishedDate={
                                            new Date(blog.date)
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        image={
                                            blog.thumbnail ||
                                            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        }
                                        category={
                                            blog.category || "Uncategorized"
                                        }
                                        author={blog.author || "Innodemy Team"}
                                        readTime={`${blog.minRead} min`}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons */}
                        <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white border-2 border-indigo-200 shadow-lg" />
                        <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white border-2 border-indigo-200 shadow-lg" />
                    </Carousel>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            No blogs available yet. Check back soon!
                        </p>
                    </div>
                )}

                {/* Read All Blogs Button */}
                <div className="text-center">
                    <Link href="/blogs">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 h-auto text-base bg-transparent border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 ease-out"
                        >
                            Read All Blogs
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
