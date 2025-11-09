"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import EnrollmentDialog from "@/components/EnrollmentDialog";
import { useAuth } from "@/lib/hooks/useAuth";

interface CoursePageProps {
    params: Promise<{ id: string }>;
}

interface FAQ {
    question: string;
    answer: string;
}

interface ClassModule {
    classNumber: number;
    moduleTitle: string;
    topics: string[];
    exercises: string[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    category?: string;
    batchName?: string;
    thumbnail?: string;
    price?: number;
    totalClasses?: number;
    totalWeeks?: number;
    totalModules?: number;
    totalProjects?: number;
    idealFor?: string[];
    faq?: FAQ[];
    modules?: ClassModule[];
    createdAt: string;
    updatedAt: string;
}

export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const { user } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
    const [hasEnrollment, setHasEnrollment] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(
        null
    );

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (!response.ok) {
                    throw new Error("Course not found");
                }
                const data = await response.json();
                setCourse(data.course);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load course"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    // Check enrollment status if user is logged in
    useEffect(() => {
        async function checkEnrollment() {
            if (!user) return;

            try {
                const response = await fetch("/api/enrollments");
                if (response.ok) {
                    const data = await response.json();
                    const enrollment = data.enrollments?.find(
                        (e: { courseId: string; status: string }) =>
                            e.courseId === id
                    );
                    if (enrollment) {
                        setHasEnrollment(true);
                        setEnrollmentStatus(enrollment.status);
                    }
                }
            } catch (error) {
                console.error("Failed to check enrollment:", error);
            }
        }
        checkEnrollment();
    }, [user, id]);

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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {error ||
                            "The course you are looking for does not exist."}
                    </p>
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            About This Course
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {course.description}
                        </p>
                    </div>

                    {/* Course Meta */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Course Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                            {course.category && (
                                <div>
                                    <span className="font-medium">
                                        Category:
                                    </span>{" "}
                                    {course.category}
                                </div>
                            )}
                            {course.batchName && (
                                <div>
                                    <span className="font-medium">Batch:</span>{" "}
                                    {course.batchName}
                                </div>
                            )}
                            {course.price && (
                                <div>
                                    <span className="font-medium">Price:</span>{" "}
                                    {course.price} BDT
                                </div>
                            )}
                            {course.totalWeeks && (
                                <div>
                                    <span className="font-medium">
                                        Duration:
                                    </span>{" "}
                                    {course.totalWeeks} Weeks
                                </div>
                            )}
                            {course.totalClasses && (
                                <div>
                                    <span className="font-medium">
                                        Total Classes:
                                    </span>{" "}
                                    {course.totalClasses}
                                </div>
                            )}
                            {course.totalModules && (
                                <div>
                                    <span className="font-medium">
                                        Modules:
                                    </span>{" "}
                                    {course.totalModules}
                                </div>
                            )}
                            {course.totalProjects && (
                                <div>
                                    <span className="font-medium">
                                        Projects:
                                    </span>{" "}
                                    {course.totalProjects}
                                </div>
                            )}
                            <div>
                                <span className="font-medium">Created:</span>{" "}
                                {new Date(
                                    course.createdAt
                                ).toLocaleDateString()}
                            </div>
                            <div>
                                <span className="font-medium">
                                    Last Updated:
                                </span>{" "}
                                {new Date(
                                    course.updatedAt
                                ).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* This Course is Ideal For */}
                    {course.idealFor && course.idealFor.length > 0 && (
                        <div className="bg-white rounded-lg p-8 shadow-md mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                This Course is Ideal For:
                            </h2>
                            <ul className="space-y-4">
                                {course.idealFor.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start text-gray-700"
                                    >
                                        <span className="text-indigo-600 font-bold mr-3 mt-1">
                                            {index + 1}.
                                        </span>
                                        <span className="text-lg leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Course Modules */}
                    {course.modules && course.modules.length > 0 && (
                        <div className="bg-white rounded-lg p-8 shadow-md mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Modules & Topics Covered
                            </h2>
                            <div className="space-y-8">
                                {course.modules.map((module, index) => (
                                    <div
                                        key={index}
                                        className="border-l-4 border-l-indigo-500 pl-6 pb-6 border-b border-b-gray-200 last:border-b-0"
                                    >
                                        <div className="mb-4">
                                            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                                                Class {module.classNumber}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mt-2">
                                                {module.moduleTitle}
                                            </h3>
                                        </div>

                                        {module.topics &&
                                            module.topics.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="text-md font-semibold text-gray-800 mb-3">
                                                        Topics:
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {module.topics.map(
                                                            (
                                                                topic,
                                                                topicIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        topicIndex
                                                                    }
                                                                    className="flex items-start text-gray-700"
                                                                >
                                                                    <span className="text-indigo-500 mr-2 mt-1">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        {topic}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                        {module.exercises &&
                                            module.exercises.length > 0 && (
                                                <div>
                                                    <h4 className="text-md font-semibold text-gray-800 mb-3">
                                                        Exercises:
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {module.exercises.map(
                                                            (
                                                                exercise,
                                                                exerciseIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        exerciseIndex
                                                                    }
                                                                    className="flex items-start text-gray-700"
                                                                >
                                                                    <span className="text-green-500 mr-2 mt-1">
                                                                        ✓
                                                                    </span>
                                                                    <span className="font-medium">
                                                                        {
                                                                            exercise
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Frequently Asked Questions */}
                    {course.faq && course.faq.length > 0 && (
                        <div className="bg-white rounded-lg p-8 shadow-md mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Frequently Asked Questions (FAQ)
                            </h2>
                            <div className="space-y-6">
                                {course.faq.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            Q{index + 1}: {item.question}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Enrollment Button/Status */}
                    <div className="mt-8 flex justify-center">
                        {!user ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Please log in to enroll in this course
                                </p>
                                <Link href="/login">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-12 py-6 text-lg"
                                    >
                                        Login to Enroll
                                    </Button>
                                </Link>
                            </div>
                        ) : hasEnrollment ? (
                            <div className="text-center w-full max-w-md">
                                {enrollmentStatus === "pending" && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                                            Enrollment Pending
                                        </h4>
                                        <p className="text-yellow-700">
                                            Your enrollment request is being
                                            reviewed by our admin team. You'll
                                            be notified within 24 hours.
                                        </p>
                                    </div>
                                )}
                                {enrollmentStatus === "approved" && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-green-800 mb-2">
                                            Enrolled Successfully!
                                        </h4>
                                        <p className="text-green-700 mb-4">
                                            You have access to this course.
                                        </p>
                                        <Link href="/dashboard/courses">
                                            <Button className="bg-green-600 hover:bg-green-700">
                                                Go to My Courses
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                                {enrollmentStatus === "rejected" && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                        <h4 className="text-lg font-semibold text-red-800 mb-2">
                                            Enrollment Rejected
                                        </h4>
                                        <p className="text-red-700">
                                            Your enrollment request was
                                            rejected. Please contact support for
                                            more information.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button
                                size="lg"
                                onClick={() => setEnrollmentDialogOpen(true)}
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-12 py-6 text-lg"
                            >
                                Enroll Now
                            </Button>
                        )}
                    </div>

                    {/* Enrollment Dialog */}
                    {course && (
                        <EnrollmentDialog
                            open={enrollmentDialogOpen}
                            onOpenChange={setEnrollmentDialogOpen}
                            courseId={course._id}
                            courseTitle={course.title}
                            coursePrice={course.price}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
