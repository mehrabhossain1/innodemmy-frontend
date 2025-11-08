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

const featuredBlogs = [
    {
        id: "future-of-web-development-2024",
        title: "The Future of Web Development: Trends to Watch in 2024",
        description:
            "Explore the latest trends shaping web development, from AI integration to progressive web apps. Learn how these technologies will impact developers and businesses in the coming year. Discover the tools and frameworks that are gaining momentum and how to prepare for the future of web development.",
        publishedDate: "2024-01-15",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Technology",
        author: "Sarah Johnson",
        readTime: "5 min",
    },
    {
        id: "mastering-react-hooks-guide",
        title: "Mastering React Hooks: A Complete Developer's Guide",
        description:
            "Deep dive into React Hooks and learn how to build more efficient and maintainable React applications. This comprehensive guide covers useState, useEffect, custom hooks, and advanced patterns. Perfect for developers looking to level up their React skills and write cleaner code.",
        publishedDate: "2024-01-12",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Development",
        author: "Alex Thompson",
        readTime: "8 min",
    },
    {
        id: "ui-ux-design-principles-2024",
        title: "Essential UI/UX Design Principles Every Designer Should Know",
        description:
            "Learn the fundamental principles of user interface and user experience design that create exceptional digital products. From color theory to user psychology, this guide covers everything you need to know to design interfaces that users love and businesses value.",
        publishedDate: "2024-01-10",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Design",
        author: "Emma Rodriguez",
        readTime: "6 min",
    },
    {
        id: "machine-learning-career-guide",
        title: "Breaking into Machine Learning: A Career Transition Guide",
        description:
            "Discover how to successfully transition into a machine learning career, regardless of your current background. This comprehensive guide covers the essential skills, learning path, portfolio projects, and job search strategies to land your first ML role in today's competitive market.",
        publishedDate: "2024-01-08",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Career",
        author: "Dr. Michael Chen",
        readTime: "10 min",
    },
    {
        id: "machine-learning-career-guides2",
        title: "Breaking into Machine Learning: A Career Transition Guide",
        description:
            "Discover how to successfully transition into a machine learning career, regardless of your current background. This comprehensive guide covers the essential skills, learning path, portfolio projects, and job search strategies to land your first ML role in today's competitive market.",
        publishedDate: "2024-01-08",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Career",
        author: "Dr. Michael Chen",
        readTime: "10 min",
    },
    {
        id: "machine-learning-career-guide3",
        title: "Breaking into Machine Learning: A Career Transition Guide",
        description:
            "Discover how to successfully transition into a machine learning career, regardless of your current background. This comprehensive guide covers the essential skills, learning path, portfolio projects, and job search strategies to land your first ML role in today's competitive market.",
        publishedDate: "2024-01-08",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Career",
        author: "Dr. Michael Chen",
        readTime: "10 min",
    },
];

export default function BlogsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                        {featuredBlogs.map((blog) => (
                            <CarouselItem
                                key={blog.id}
                                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
                            >
                                <BlogCard
                                    id={blog.id}
                                    title={blog.title}
                                    description={blog.description}
                                    publishedDate={blog.publishedDate}
                                    image={blog.image}
                                    category={blog.category}
                                    author={blog.author}
                                    readTime={blog.readTime}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white border-2 border-indigo-200 shadow-lg" />
                    <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-gray-800 hover:bg-indigo-600 hover:text-white border-2 border-indigo-200 shadow-lg" />
                </Carousel>

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
            </div>
        </section>
    );
}
