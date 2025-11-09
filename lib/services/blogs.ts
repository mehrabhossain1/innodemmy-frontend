import { Blog } from "../models";
import * as blogDb from "../db/blogs";

/**
 * Get all published blogs
 */
export async function getPublishedBlogs(): Promise<Blog[]> {
    return await blogDb.getAllBlogs();
}

/**
 * Get all blogs (admin only)
 */
export async function getAllBlogs(): Promise<Blog[]> {
    return await blogDb.getAllBlogsAdmin();
}

/**
 * Get blog by ID
 */
export async function getBlogById(id: string): Promise<Blog | null> {
    return await blogDb.getBlogById(id);
}

/**
 * Create a new blog
 */
export async function createBlog(blogData: {
    title: string;
    content: string;
    date?: Date;
    minRead: number;
    author?: string;
    thumbnail?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
}): Promise<Blog> {
    // Validate required fields
    if (!blogData.title || !blogData.content) {
        throw new Error("Title and content are required");
    }

    if (!blogData.minRead || blogData.minRead < 1) {
        throw new Error("Valid reading time is required");
    }

    // Create blog with defaults
    const blog = await blogDb.createBlog({
        title: blogData.title,
        content: blogData.content,
        date: blogData.date || new Date(),
        minRead: blogData.minRead,
        author: blogData.author,
        thumbnail: blogData.thumbnail,
        category: blogData.category,
        tags: blogData.tags,
        published: blogData.published ?? true,
    } as Omit<Blog, "_id" | "createdAt" | "updatedAt">);

    return blog;
}

/**
 * Update a blog
 */
export async function updateBlog(
    id: string,
    blogData: Partial<Blog>
): Promise<Blog | null> {
    return await blogDb.updateBlog(id, blogData);
}

/**
 * Delete a blog
 */
export async function deleteBlog(id: string): Promise<boolean> {
    return await blogDb.deleteBlog(id);
}

/**
 * Get blogs by category
 */
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
    return await blogDb.getBlogsByCategory(category);
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string): Promise<Blog[]> {
    return await blogDb.getBlogsByTag(tag);
}
