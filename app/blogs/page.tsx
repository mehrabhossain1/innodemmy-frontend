"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/lib/models";
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
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>(["All"]);

    // Fetch blogs from API
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();

                if (data.success) {
                    setBlogs(data.blogs);

                    // Extract unique categories
                    const uniqueCategories = new Set<string>(["All"]);
                    data.blogs.forEach((blog: Blog) => {
                        if (blog.category) {
                            uniqueCategories.add(blog.category);
                        }
                    });
                    setCategories(Array.from(uniqueCategories));
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    const filteredAndSortedBlogs = useMemo(() => {
        const filtered = blogs.filter((blog) => {
            const matchesSearch =
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()));
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
                        new Date(a.date).getTime() -
                        new Date(b.date).getTime()
                    );
                case "title":
                    return a.title.localeCompare(b.title);
                default: // newest
                    return (
                        new Date(b.date).getTime() -
                        new Date(a.date).getTime()
                    );
            }
        });

        return filtered;
    }, [blogs, searchTerm, selectedCategory, sortBy]);

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
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredAndSortedBlogs.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredAndSortedBlogs.map((blog) => (
                                <motion.div
                                    key={blog._id}
                                    variants={cardHover}
                                    className="group"
                                >
                                    <BlogCard
                                        id={blog._id!}
                                        title={blog.title}
                                        description={blog.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...'}
                                        publishedDate={new Date(blog.date).toISOString().split('T')[0]}
                                        image={blog.thumbnail || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                        category={blog.category || "Uncategorized"}
                                        author={blog.author || "Innodemy Team"}
                                        readTime={`${blog.minRead} min`}
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
