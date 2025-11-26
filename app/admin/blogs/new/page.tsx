"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function NewBlogPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        minRead: 5,
        author: "Innodemy Team",
        thumbnail: "",
        category: "",
        tags: "",
        published: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags
                        ? formData.tags.split(",").map((tag) => tag.trim())
                        : [],
                    date: new Date(),
                }),
            });

            if (response.ok) {
                router.push("/admin/blogs");
            } else {
                const error = await response.json();
                alert(error.error || "Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            alert("Failed to create blog");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/blogs"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blogs
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                    Create New Blog
                </h1>
                <p className="text-gray-600 mt-2">
                    Write and publish a new blog post
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Blog Information
                    </h2>

                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                                placeholder="Enter blog title"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <Label htmlFor="content">Content *</Label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(value) =>
                                    setFormData({ ...formData, content: value })
                                }
                                placeholder="Write your blog content here..."
                            />
                        </div>

                        {/* Category and Reading Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., Web Development"
                                />
                            </div>

                            <div>
                                <Label htmlFor="minRead">
                                    Reading Time (minutes) *
                                </Label>
                                <Input
                                    id="minRead"
                                    type="number"
                                    min="1"
                                    value={formData.minRead}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            minRead: Number(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Author and Thumbnail */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            author: e.target.value,
                                        })
                                    }
                                    placeholder="Author name"
                                />
                            </div>

                            <div>
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <Input
                                    id="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            thumbnail: e.target.value,
                                        })
                                    }
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <Label htmlFor="tags">
                                Tags (comma-separated)
                            </Label>
                            <Input
                                id="tags"
                                value={formData.tags}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tags: e.target.value,
                                    })
                                }
                                placeholder="e.g., Web Development, JavaScript, React"
                            />
                        </div>

                        {/* Published Status */}
                        <div>
                            <Label htmlFor="published">Status</Label>
                            <Select
                                value={formData.published.toString()}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        published: value === "true",
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">
                                        Published
                                    </SelectItem>
                                    <SelectItem value="false">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 bg-white rounded-lg shadow-md p-6">
                    <Link href="/admin/blogs">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Create Blog
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
