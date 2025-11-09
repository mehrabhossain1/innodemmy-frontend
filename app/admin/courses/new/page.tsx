"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import CourseForm from "@/components/admin/CourseForm";

interface CourseData {
    title: string;
    description: string;
    category?: string;
    thumbnail?: string;
    price?: number;
    totalClasses?: number;
    totalWeeks?: number;
    totalModules?: number;
    totalProjects?: number;
    idealFor?: string[];
    faq?: Array<{ question: string; answer: string }>;
    modules?: Array<{
        classNumber: number;
        moduleTitle: string;
        topics: string[];
        exercises: string[];
    }>;
}

export default function NewCoursePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);

    // Check if user is admin
    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Access Denied
                    </h1>
                    <p className="text-gray-600">
                        You must be an admin to access this page.
                    </p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (courseData: CourseData) => {
        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                alert("Course created successfully!");
                router.push("/admin/courses");
            } else {
                const error = await response.json();
                setError(error.error || "Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
            setError("Error creating course");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add New Course
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Create a new course with all details
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <CourseForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
