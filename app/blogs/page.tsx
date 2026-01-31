"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Blog } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    BookOpen,
    TrendingUp,
    Filter,
    FileText,
    Newspaper,
    BookMarked,
    Search,
} from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Container from "@/components/Container";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

// Map category names to icons
const categoryIcons: Record<string, typeof FileText> = {
    Technology: FileText,
    Research: BookMarked,
    News: Newspaper,
};

const ITEMS_PER_PAGE = 9;

// Banner image for first blog card (public/blogs folder)
const BLOG_BANNER_IMAGE = "/blogs/web-banner-innodemy.png";

export default function BlogsPage() {
    const topRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch blogs from API
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();

                if (data.success) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    // Build dynamic categories with counts
    const categories = useMemo(() => {
        const categoryCounts: Record<string, number> = {};

        // Count blogs per category
        blogs.forEach((blog) => {
            if (blog.category) {
                categoryCounts[blog.category] =
                    (categoryCounts[blog.category] || 0) + 1;
            }
        });

        // Build category tabs
        const tabs = [
            {
                id: "all",
                label: "All Articles",
                icon: BookOpen,
                count: `${blogs.length} Articles`,
            },
        ];

        // Add each unique category
        Object.keys(categoryCounts).forEach((category) => {
            const count = categoryCounts[category];
            tabs.push({
                id: category,
                label: category,
                icon: categoryIcons[category] || FileText,
                count: `${count} ${count === 1 ? "Article" : "Articles"}`,
            });
        });

        return tabs;
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesSearch =
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.author &&
                    blog.author
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()));
            const matchesCategory =
                activeCategory === "all" || blog.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [blogs, searchTerm, activeCategory]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    return (
        <div
            ref={topRef}
            className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background"
        >
            <div className="bg-gradient-to-r from-white to-primary/5 dark:from-gray-900 dark:to-gray-800 border-b border-primary/20 dark:border-gray-700 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-primary dark:text-primary-foreground hover:text-primary/80 dark:hover:text-primary/70 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                            <div className="flex items-center space-x-3">
                                <BookOpen className="h-8 w-8 text-primary dark:text-primary-foreground" />
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    All Articles
                                </h1>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-sm px-4 py-2">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {filteredBlogs.length} articles found
                        </Badge>
                    </div>
                </div>
            </div>

            <Container className="py-10">
                {/* Search Bar */}
                <div className="mb-6 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles by title, content, or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-10 h-12 rounded-xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <span className="text-xl font-semibold">×</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="relative mb-8">
                    <div className="flex justify-center items-center overflow-x-auto pb-3 scrollbar-hide">
                        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                                        activeCategory === category.id
                                            ? "bg-primary border-primary text-white shadow-md"
                                            : "bg-white dark:bg-card border-gray-200 dark:border-border hover:border-primary text-foreground hover:bg-gray-50 dark:hover:bg-accent"
                                    }`}
                                >
                                    <category.icon className="h-4 w-4" />
                                    <div className="text-left">
                                        <div className="text-sm font-semibold whitespace-nowrap">
                                            {category.label}
                                        </div>
                                        {category.count && (
                                            <div
                                                className={`text-xs ${
                                                    activeCategory ===
                                                    category.id
                                                        ? "text-white/80"
                                                        : "text-muted-foreground"
                                                }`}
                                            >
                                                {category.count}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-pulse"
                            >
                                <div className="relative h-48 bg-muted"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-3 bg-muted rounded w-full"></div>
                                    <div className="h-3 bg-muted rounded w-5/6"></div>
                                    <div className="flex gap-2 pt-2">
                                        <div className="h-6 bg-muted rounded w-20"></div>
                                        <div className="h-6 bg-muted rounded w-20"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredBlogs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedBlogs.map((blog, index) => (
                                        <BlogCard
                                            key={blog._id}
                                            id={blog._id!}
                                            title={blog.title}
                                            description={
                                                blog.content
                                                    .substring(0, 200)
                                                    .replace(/<[^>]*>/g, "") +
                                                "..."
                                            }
                                            publishedDate={
                                                new Date(blog.date)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            image={
                                                index === 0
                                                    ? BLOG_BANNER_IMAGE
                                                    : blog.thumbnail ||
                                                      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            }
                                            unoptimized={index === 0}
                                            category={
                                                blog.category || "Uncategorized"
                                            }
                                            author={
                                                blog.author || "Innodemy Team"
                                            }
                                            readTime={`${blog.minRead} min`}
                                        />
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        setCurrentPage((prev) =>
                                                            Math.max(
                                                                1,
                                                                prev - 1
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        currentPage === 1
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                />
                                            </PaginationItem>
                                            {[...Array(totalPages)].map(
                                                (_, i) => (
                                                    <PaginationItem key={i + 1}>
                                                        <PaginationLink
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    i + 1
                                                                )
                                                            }
                                                            isActive={
                                                                currentPage ===
                                                                i + 1
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            {i + 1}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            )}
                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        setCurrentPage((prev) =>
                                                            Math.min(
                                                                totalPages,
                                                                prev + 1
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        currentPage ===
                                                        totalPages
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <Filter className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                        No articles found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        Try adjusting your search criteria to
                                        find more articles that match your
                                        interests.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setActiveCategory("all");
                                        }}
                                        className="px-8 py-3"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
