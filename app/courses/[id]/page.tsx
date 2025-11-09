"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import Image from "next/image";

interface CoursePageProps {
    params: Promise<{ id: string }>;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (!response.ok) {
                    throw new Error('Course not found');
                }
                const data = await response.json();
                setCourse(data.course);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load course');
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The course you are looking for does not exist.'}</p>
                    <Link href="/courses">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            {/* Course Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Course Image */}
                    {course.thumbnail && (
                        <div className="relative overflow-hidden rounded-lg mb-8 h-96">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Course Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        {course.title}
                    </h1>

                    {/* Course Description */}
                    <div className="bg-white rounded-lg p-8 shadow-md mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Course</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {course.description}
                        </p>
                    </div>

                    {/* Course Meta */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                            <div>
                                <span className="font-medium">Created:</span>{" "}
                                {new Date(course.createdAt).toLocaleDateString()}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated:</span>{" "}
                                {new Date(course.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Enroll Button */}
                    <div className="mt-8 flex justify-center">
                        <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-12 py-6 text-lg">
                            Enroll Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
