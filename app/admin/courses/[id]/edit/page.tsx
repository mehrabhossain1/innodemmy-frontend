"use client";

import { useState, useEffect, use } from "react";
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

interface EditCoursePageProps {
    params: Promise<{ id: string }>;
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { user } = useAuth();
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data.course);
                } else {
                    setError("Course not found");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                setError("Failed to load course");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (courseData: CourseData) => {
        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                alert("Course updated successfully!");
                router.push("/admin/courses");
            } else {
                const err = await response.json();
                setError(err.error || "Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            setError("Error updating course");
        }
    };

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error && !course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Error
                    </h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Course
                    </h1>
                    <p className="text-gray-600 mt-1">Update course details</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {course && (
                    <CourseForm initialData={course} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
}
