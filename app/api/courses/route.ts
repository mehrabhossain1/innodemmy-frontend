import { NextResponse } from "next/server";
import { listAllCourses, createNewCourse } from "@/lib/services/courses";

export async function GET() {
    try {
        // Get all courses
        const courses = await listAllCourses();

        return NextResponse.json({ courses });
    } catch (error) {
        console.error("Get courses error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Create course with only the simplified model fields
        const course = await createNewCourse({
            title: body.title,
            description: body.description,
            category: body.category,
            thumbnail: body.thumbnail,
            price: body.price,
            totalClasses: body.totalClasses,
            totalWeeks: body.totalWeeks,
            totalModules: body.totalModules,
            totalProjects: body.totalProjects,
            idealFor: body.idealFor,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ course }, { status: 201 });
    } catch (error) {
        console.error("Create course error:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
