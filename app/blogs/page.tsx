"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
import { 
    Search, 
    ArrowLeft, 
    BookOpen, 
    Target, 
    Lightbulb, 
    Award, 
    Shield, 
    Zap,
    TrendingUp,
    Filter
} from "lucide-react";

import Link from "next/link";
import BlogCard from "@/components/BlogCard";

const allBlogs = [
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
        id: "javascript-performance-optimization",
        title: "JavaScript Performance Optimization: Best Practices and Techniques",
        description:
            "Learn how to optimize JavaScript performance for better user experience and faster web applications. This guide covers code splitting, lazy loading, memory management, and modern optimization techniques that every developer should know.",
        publishedDate: "2024-01-05",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardHover = {
    hover: { 
        y: -8,
        transition: { duration: 0.3 }
    }
};

// Core Values data
const coreValues = [
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge insights and fresh perspectives on technology trends." },
    { icon: Award, title: "Excellence", description: "High-quality content that delivers real value to our readers." },
    { icon: Shield, title: "Trust", description: "Reliable information from industry experts and practitioners." },
    { icon: Zap, title: "Impact", description: "Actionable knowledge that drives career and business success." }
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
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section 
                className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-6 w-px bg-gray-300" />
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-8 w-8 text-blue-600" />
                                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                                    Knowledge Hub
                                </h1>
                            </div>
                        </div>
                        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Discover insights, trends, and expert knowledge to accelerate your career in technology and beyond.
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <Badge variant="secondary" className="text-sm px-4 py-2">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                {filteredAndSortedBlogs.length} articles
                            </Badge>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section 
                className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900 dark:bg-blue-800"
                {...fadeInUp}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <Target className="w-16 h-16 text-blue-300 mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Why Read Our Blog</h2>
                        <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                            We deliver content that matters - from industry insights to practical guides that drive real results.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={cardHover}
                                className="group"
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center h-full transition-all duration-300 group-hover:border-blue-200">
                                    <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Search and Filters Section */}
            <motion.section 
                className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-200 dark:bg-slate-800"
                {...fadeInUp}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <Filter className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Find Your Perfect Read</h2>
                        <p className="text-gray-600 dark:text-gray-300">Search and filter through our comprehensive collection of articles</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-700 rounded-xl p-6"
                    >
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
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="title">Title A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Active Filters */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedCategory !== "All" && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    {selectedCategory} ×
                                </Badge>
                            )}
                            {searchTerm && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => setSearchTerm("")}
                                >
                                    "{searchTerm}" ×
                                </Badge>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Blog Grid Section */}
            <motion.section 
                className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-300 dark:bg-slate-700"
                {...fadeInUp}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    {filteredAndSortedBlogs.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredAndSortedBlogs.map((blog) => (
                                <motion.div
                                    key={blog.id}
                                    variants={cardHover}
                                    className="group"
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
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center py-16"
                        >
                            <div className="max-w-md mx-auto">
                                <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    No articles found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    Try adjusting your search criteria to find more articles that match your interests.
                                </p>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("All");
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </div>
            </motion.section>
        </div>
    );
}
