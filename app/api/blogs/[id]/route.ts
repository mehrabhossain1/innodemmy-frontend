import { NextRequest, NextResponse } from "next/server";
import { getBlogById, updateBlog, deleteBlog } from "@/lib/services/blogs";

/**
 * GET /api/blogs/:id - Get blog by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const blog = await getBlogById(id);

        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Blog not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            blog,
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch blog",
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/blogs/:id - Update blog by ID
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const blog = await updateBlog(id, body);

        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Blog not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            blog,
            message: "Blog updated successfully",
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to update blog",
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/blogs/:id - Delete blog by ID
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await deleteBlog(id);

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Blog not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete blog",
            },
            { status: 500 }
        );
    }
}
