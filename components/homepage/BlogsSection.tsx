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
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();

                if (data.success) {
                    // Get only the first 4 blogs for the homepage
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
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                            📚 Knowledge Hub
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-foreground">
                            Latest from Our
                        </span>{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Stay ahead with insights, tutorials, and industry trends from our expert instructors and tech leaders.
                    </p>
                </div>

                {/* Blog Cards Carousel */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                        <p className="ml-4 text-muted-foreground">Loading latest articles...</p>
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
                            {blogs.map((blog, index) => (
                                <CarouselItem
                                    key={blog._id}
                                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
                                >
                                    <div
                                        style={{
                                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                        }}
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
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons */}
                        <CarouselPrevious className="hidden md:flex -left-12 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-white border-2 border-border hover:border-primary shadow-lg transition-all duration-300" />
                        <CarouselNext className="hidden md:flex -right-12 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-white border-2 border-border hover:border-primary shadow-lg transition-all duration-300" />
                    </Carousel>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            No blogs available yet. Check back soon!
                        </p>
                    </div>
                )}

                {/* Read All Blogs Button */}
                <div className="text-center">
                    <Link href="/blogs">
                        <Button
                            size="lg"
                            className="px-8 py-6 h-auto text-base font-semibold bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white shadow-lg shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 rounded-xl border-2 border-secondary/20 hover:border-secondary/40 group"
                        >
                            Read All Blogs
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </div>
            </Container>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
