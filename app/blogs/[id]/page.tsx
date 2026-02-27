"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/lib/models";
import { HtmlContent } from "@/components/ui/html-content";

// Banner for specific blog / when no valid thumbnail (public/blogs folder)
const BLOG_BANNER_SRC = "/blogs/web-banner-innodemy.png";
const BLOG_ID_USE_BANNER = "69653175f5a433918988e0df";

// Fetch blog from API
const getBlogData = async (id: string): Promise<Blog | null> => {
    try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();

        if (data.success) {
            return data.blog;
        }
        return null;
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
};

interface BlogPageProps {
    params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogPageProps) {
    // Unwrap params using React.use
    const { id } = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlog() {
            const blogData = await getBlogData(id);
            setBlog(blogData);
            setLoading(false);
        }
        loadBlog();
    }, [id]);

    const formatDate = (dateString: string | Date) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleShareClick = async () => {
        const shareData = {
            title: blog?.title || "Blog Post",
            text: "Check out this blog post",
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy URL to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert("Blog link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Blog Post Not Found
                    </h1>
                    <Link href="/blogs">
                        <Button>Back to Blogs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blogs
                    </Link>
                </div>
            </div>

            <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <Badge variant="secondary">
                                {blog.category || "Uncategorized"}
                            </Badge>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(blog.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{blog.minRead} min read</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Author and Actions */}
                        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                    {blog.author?.[0]?.toUpperCase() || "I"}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {blog.author || "Innodemy Team"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Published {formatDate(blog.date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <BookmarkPlus className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShareClick}
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image - use banner for this blog or when no thumbnail */}
                    <div className="mb-8 relative w-full h-64 sm:h-96">
                        {id === BLOG_ID_USE_BANNER || !blog.thumbnail ? (
                            <Image
                                src={BLOG_BANNER_SRC}
                                alt={blog.title}
                                fill
                                className="object-cover rounded-xl shadow-lg"
                            />
                        ) : (
                            <Image
                                src={blog.thumbnail}
                                alt={blog.title}
                                width={800}
                                height={400}
                                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
                            />
                        )}
                    </div>

                    {/* Article Content */}
                    <HtmlContent
                        html={blog.content}
                        className="prose prose-lg max-w-none mb-8"
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                                {blog.author?.[0]?.toUpperCase() || "I"}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {blog.author || "Innodemy Team"}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                    Dedicated to providing quality educational
                                    content and helping students achieve their
                                    learning goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
