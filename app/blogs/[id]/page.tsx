"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/lib/models";
import { HtmlContent } from "@/components/ui/html-content";

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

// Old hardcoded function for reference (to be removed)
const getBlogDataOld = (id: string) => {
    const blogs = {
        "future-of-web-development-2024": {
            id: "future-of-web-development-2024",
            title: "The Future of Web Development: Trends to Watch in 2024",
            description:
                "Explore the latest trends shaping web development, from AI integration to progressive web apps.",
            content: `
        <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications. As we move forward, developers need to stay ahead of these trends to remain competitive and deliver exceptional user experiences.</p>

        <h2>AI Integration in Web Development</h2>
        <p>Artificial Intelligence is no longer a futuristic concept—it's becoming an integral part of modern web development. From AI-powered chatbots to intelligent content generation, developers are finding innovative ways to incorporate AI into their applications.</p>

        <p>Key areas where AI is making an impact include:</p>
        <ul>
          <li>Automated code generation and optimization</li>
          <li>Intelligent user interface adaptations</li>
          <li>Personalized content delivery</li>
          <li>Advanced analytics and user behavior prediction</li>
        </ul>

        <h2>Progressive Web Apps (PWAs) Evolution</h2>
        <p>Progressive Web Apps continue to bridge the gap between web and native applications. With improved browser support and new capabilities, PWAs are becoming more powerful and user-friendly.</p>

        <p>Recent PWA developments include:</p>
        <ul>
          <li>Enhanced offline functionality</li>
          <li>Better integration with device features</li>
          <li>Improved performance and loading speeds</li>
          <li>Advanced caching strategies</li>
        </ul>

        <h2>The Rise of Edge Computing</h2>
        <p>Edge computing is revolutionizing how we think about web application architecture. By processing data closer to users, edge computing reduces latency and improves performance significantly.</p>

        <h2>Conclusion</h2>
        <p>The future of web development is bright and full of opportunities. By staying informed about these trends and continuously learning new technologies, developers can build better, faster, and more engaging web applications that meet the evolving needs of users and businesses.</p>
      `,
            publishedDate: "2024-01-15",
            image: "/placeholder.svg?height=400&width=800&text=Web+Development+Trends",
            category: "Technology",
            author: "Sarah Johnson",
            authorImage: "/placeholder.svg?height=60&width=60&text=Sarah",
            readTime: "5 min",
            tags: [
                "Web Development",
                "AI",
                "PWA",
                "Edge Computing",
                "Technology Trends",
            ],
        },
        "mastering-react-hooks-guide": {
            id: "mastering-react-hooks-guide",
            title: "Mastering React Hooks: A Complete Developer's Guide",
            description:
                "Deep dive into React Hooks and learn how to build more efficient and maintainable React applications.",
            content: `
        <p>React Hooks have revolutionized how we write React components, making functional components more powerful and eliminating the need for class components in most cases. This comprehensive guide will take you through everything you need to know about React Hooks.</p>

        <h2>Understanding useState Hook</h2>
        <p>The useState hook is the most fundamental hook in React. It allows you to add state to functional components, making them stateful without converting them to class components.</p>

        <pre><code>const [count, setCount] = useState(0);</code></pre>

        <h2>Mastering useEffect Hook</h2>
        <p>The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components.</p>

        <h2>Creating Custom Hooks</h2>
        <p>Custom hooks are a powerful feature that allows you to extract component logic into reusable functions. They enable you to share stateful logic between components without changing their hierarchy.</p>

        <h2>Advanced Hook Patterns</h2>
        <p>Once you've mastered the basics, you can explore advanced patterns like useReducer for complex state management, useContext for sharing data across components, and useMemo for performance optimization.</p>

        <h2>Best Practices</h2>
        <ul>
          <li>Always call hooks at the top level of your function</li>
          <li>Use the dependency array in useEffect correctly</li>
          <li>Create custom hooks for reusable logic</li>
          <li>Use useCallback and useMemo for performance optimization</li>
        </ul>
      `,
            publishedDate: "2024-01-12",
            image: "/placeholder.svg?height=400&width=800&text=React+Hooks+Guide",
            category: "Development",
            author: "Alex Thompson",
            authorImage: "/placeholder.svg?height=60&width=60&text=Alex",
            readTime: "8 min",
            tags: ["React", "Hooks", "JavaScript", "Frontend", "Development"],
        },
        // Add other blog posts here...
    };

    return blogs[id as keyof typeof blogs] || null;
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
                            <Badge variant="secondary">{blog.category || "Uncategorized"}</Badge>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {formatDate(blog.date)}
                                    </span>
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
                                        Published{" "}
                                        {formatDate(blog.date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <BookmarkPlus className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {blog.thumbnail && (
                        <div className="mb-8">
                            <Image
                                src={blog.thumbnail}
                                alt={blog.title}
                                width={800}
                                height={400}
                                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
                            />
                        </div>
                    )}

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
                                    Dedicated to providing quality educational content and helping students achieve their learning goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
