import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/data/courses";

export async function GET() {
    try {
        // Get all courses from hardcoded data
        const courses = getAllCourses();

        return NextResponse.json({ courses });
    } catch (error) {
        console.error("Get courses error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(_request: Request) {
    try {
        // POST endpoint disabled for hardcoded data
        // To add courses, update lib/data/courses.ts directly
        return NextResponse.json(
            { error: "Course creation is currently disabled. Courses are managed via hardcoded data." },
            { status: 501 }
        );
    } catch (error) {
        console.error("Create course error:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
