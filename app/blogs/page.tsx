"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, ArrowLeft, BookOpen } from "lucide-react";

import Link from "next/link";
import BlogCard from "@/components/BlogCard";

const allBlogs = [
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
    {
        id: "javascript-performance-optimization",
        title: "JavaScript Performance Optimization: Best Practices and Techniques",
        description:
            "Learn how to optimize JavaScript performance for better user experience and faster web applications. This guide covers code splitting, lazy loading, memory management, and modern optimization techniques that every developer should know.",
        publishedDate: "2024-01-05",
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
        category: "Development",
        author: "Kevin Zhang",
        readTime: "7 min",
    },
    {
        id: "remote-work-productivity-tips",
        title: "Remote Work Productivity: Tips for Tech Professionals",
        description:
            "Maximize your productivity while working remotely with proven strategies and tools. From setting up the perfect home office to managing time effectively, this guide helps tech professionals thrive in remote work environments.",
        publishedDate: "2024-01-03",
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
        category: "Career",
        author: "Lisa Chen",
        readTime: "6 min",
    },
    {
        id: "css-grid-flexbox-mastery",
        title: "CSS Grid vs Flexbox: When to Use Each Layout Method",
        description:
            "Master modern CSS layout techniques with this comprehensive comparison of CSS Grid and Flexbox. Learn when to use each method, their strengths and limitations, and practical examples to improve your web design skills.",
        publishedDate: "2024-01-01",
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
        category: "Development",
        author: "Maria Garcia",
        readTime: "9 min",
    },
    {
        id: "data-science-tools-2024",
        title: "Top Data Science Tools and Libraries to Learn in 2024",
        description:
            "Stay ahead in data science with the latest tools and libraries. From Python frameworks to visualization tools, discover what's trending in the data science community and how to incorporate these tools into your workflow.",
        publishedDate: "2023-12-28",
        image: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?t=st=1753634546~exp=1753638146~hmac=e830741e8b8d35d3f6ac3da5091881f8a6e5f2724eae0f3246f5c10ff3251d3e&w=1380",
        category: "Data Science",
        author: "Dr. Robert Kim",
        readTime: "8 min",
    },
];

const categories = [
    "All",
    "Technology",
    "Development",
    "Design",
    "Career",
    "Data Science",
];

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const filteredAndSortedBlogs = useMemo(() => {
        const filtered = allBlogs.filter((blog) => {
            const matchesSearch =
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                blog.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // Sort blogs
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "oldest":
                    return (
                        new Date(a.publishedDate).getTime() -
                        new Date(b.publishedDate).getTime()
                    );
                case "title":
                    return a.title.localeCompare(b.title);
                default: // newest
                    return (
                        new Date(b.publishedDate).getTime() -
                        new Date(a.publishedDate).getTime()
                    );
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-6 w-px bg-gray-300" />
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    All Blogs
                                </h1>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                            {filteredAndSortedBlogs.length} articles found
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort By */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">
                                    Newest First
                                </SelectItem>
                                <SelectItem value="oldest">
                                    Oldest First
                                </SelectItem>
                                <SelectItem value="title">Title A-Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {selectedCategory !== "All" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory("All")}
                            >
                                {selectedCategory} ×
                            </Badge>
                        )}
                        {searchTerm && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSearchTerm("")}
                            >
                                "{searchTerm}" ×
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Blog Grid */}
                {filteredAndSortedBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedBlogs.map((blog) => (
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
                ) : (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No articles found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search criteria to find more
                                articles.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Load More Button */}
                {filteredAndSortedBlogs.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Articles
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
