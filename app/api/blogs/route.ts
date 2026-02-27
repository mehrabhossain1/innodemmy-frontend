import { NextRequest, NextResponse } from "next/server";
import { getPublishedBlogs, createBlog } from "@/lib/services/blogs";

/**
 * GET /api/blogs - Get all published blogs
 */
export async function GET(_request: NextRequest) {
    try {
        const blogs = await getPublishedBlogs();

        return NextResponse.json({
            success: true,
            blogs,
            count: blogs.length,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch blogs",
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/blogs - Create a new blog
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const blog = await createBlog(body);

        return NextResponse.json({
            success: true,
            blog,
            message: "Blog created successfully",
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create blog",
            },
            { status: 500 }
        );
    }
}
