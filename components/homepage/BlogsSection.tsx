import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import BlogCard from "../BlogCard";

const featuredBlogs = [
    {
        id: "future-of-web-development-2024",
        title: "The Future of Web Development: Trends to Watch in 2024",
        description:
            "Explore the latest trends shaping web development, from AI integration to progressive web apps. Learn how these technologies will impact developers and businesses in the coming year. Discover the tools and frameworks that are gaining momentum and how to prepare for the future of web development.",
        publishedDate: "2024-01-15",
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
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
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
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
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
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
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
        category: "Career",
        author: "Dr. Michael Chen",
        readTime: "10 min",
    },
];

export default function BlogsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Latest from Our Blog
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest insights, tutorials, and
                        industry trends from our expert instructors and thought
                        leaders in technology and design.
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            description={blog.description}
                            publishedDate={blog.publishedDate}
                            image={blog.image}
                            category={blog.category}
                            author={blog.author}
                            readTime={blog.readTime}
                        />
                    ))}
                </div>

                {/* Read All Blogs Button */}
                <div className="text-center">
                    <Link href="/blogs">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 h-auto text-base bg-transparent"
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
