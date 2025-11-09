import { ObjectId } from "mongodb";
import { getDatabase } from "./connection";
import { Blog } from "../models";

type BlogDocument = Omit<Blog, '_id'> & { _id?: ObjectId };

/**
 * Get the blogs collection with indexes
 */
async function getBlogsCollection() {
    const db = await getDatabase();
    const collection = db.collection<BlogDocument>('blogs');

    // Create indexes
    try {
        await collection.createIndex({ published: 1, date: -1 });
        await collection.createIndex({ category: 1 });
        await collection.createIndex({ tags: 1 });
    } catch {
        // Indexes may already exist
    }

    return collection;
}

/**
 * Get all published blogs
 */
export async function getAllBlogs(): Promise<Blog[]> {
    const collection = await getBlogsCollection();
    const blogs = await collection
        .find({ published: true })
        .sort({ date: -1 })
        .toArray();

    return blogs.map((blog) => ({
        ...blog,
        _id: blog._id!.toString(),
        date: blog.date,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    })) as Blog[];
}

/**
 * Get all blogs (including drafts) - Admin only
 */
export async function getAllBlogsAdmin(): Promise<Blog[]> {
    const collection = await getBlogsCollection();
    const blogs = await collection
        .find({})
        .sort({ date: -1 })
        .toArray();

    return blogs.map((blog) => ({
        ...blog,
        _id: blog._id!.toString(),
        date: blog.date,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    })) as Blog[];
}

/**
 * Get blog by ID
 */
export async function getBlogById(id: string): Promise<Blog | null> {
    const collection = await getBlogsCollection();
    const blog = await collection.findOne({ _id: new ObjectId(id) });

    if (!blog) return null;

    return {
        ...blog,
        _id: blog._id!.toString(),
        date: blog.date,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    } as Blog;
}

/**
 * Create a new blog
 */
export async function createBlog(blogData: Omit<Blog, "_id" | "createdAt" | "updatedAt">): Promise<Blog> {
    const collection = await getBlogsCollection();
    const now = new Date();

    const result = await collection.insertOne({
        ...blogData,
        createdAt: now,
        updatedAt: now,
    });

    const blog = await collection.findOne({ _id: result.insertedId });

    return {
        ...blog,
        _id: blog!._id!.toString(),
        date: blog!.date,
        createdAt: blog!.createdAt,
        updatedAt: blog!.updatedAt,
    } as Blog;
}

/**
 * Update a blog
 */
export async function updateBlog(id: string, blogData: Partial<Blog>): Promise<Blog | null> {
    const collection = await getBlogsCollection();
    const now = new Date();

    // Remove _id from blogData if it exists (can't update _id)
    const { _id, ...updateData } = blogData as any;

    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: now } },
        { returnDocument: "after" }
    );

    if (!result) return null;

    return {
        ...result,
        _id: result._id!.toString(),
        date: result.date,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    } as Blog;
}

/**
 * Delete a blog
 */
export async function deleteBlog(id: string): Promise<boolean> {
    const collection = await getBlogsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
}

/**
 * Get blogs by category
 */
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
    const collection = await getBlogsCollection();
    const blogs = await collection
        .find({ category, published: true })
        .sort({ date: -1 })
        .toArray();

    return blogs.map((blog) => ({
        ...blog,
        _id: blog._id!.toString(),
        date: blog.date,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    })) as Blog[];
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string): Promise<Blog[]> {
    const collection = await getBlogsCollection();
    const blogs = await collection
        .find({ tags: tag, published: true })
        .sort({ date: -1 })
        .toArray();

    return blogs.map((blog) => ({
        ...blog,
        _id: blog._id!.toString(),
        date: blog.date,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    })) as Blog[];
}
