"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, Play, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor: string;
    duration: string;
    level: string;
    category: string;
}

interface Enrollment {
    _id: string;
    courseId: string;
    status: "pending" | "approved" | "rejected";
    paymentAmount: number;
    course: Course;
    createdAt: string;
}

export default function MyCoursesPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
            return;
        }

        if (!isLoading && user) {
            fetchEnrollments();
        }
    }, [user, isLoading, router]);

    const fetchEnrollments = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/enrollments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setEnrollments(data.enrollments || []);
            }
        } catch (error) {
            console.error("Failed to fetch enrollments:", error);
        } finally {
            setLoading(false);
        }
    };

    const approvedEnrollments = enrollments.filter(
        (enrollment) => enrollment.status === "approved"
    );
    const pendingEnrollments = enrollments.filter(
        (enrollment) => enrollment.status === "pending"
    );

    if (isLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-lg">Loading your courses...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    return (
        <div className="space-y-6">
            {/* Active Courses */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">My Active Courses</h2>
                    <Badge variant="secondary">
                        {approvedEnrollments.length} Course
                        {approvedEnrollments.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                {approvedEnrollments.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No Active Courses
                            </h3>
                            <p className="text-gray-600 mb-4">
                                You don't have any approved courses yet. Enroll
                                in a course to get started!
                            </p>
                            <Link href="/dashboard">
                                <Button>Browse Courses</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {approvedEnrollments.map((enrollment) => (
                            <Card
                                key={enrollment._id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-start justify-between">
                                        <span className="line-clamp-2">
                                            {enrollment.course?.title ||
                                                "Course not found"}
                                        </span>
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {enrollment.course?.description ||
                                            "No description available"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Instructor:
                                            </span>
                                            <span className="font-medium">
                                                {enrollment.course?.instructor}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Duration:
                                            </span>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>
                                                    {
                                                        enrollment.course
                                                            ?.duration
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Level:
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="capitalize"
                                            >
                                                {enrollment.course?.level}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                Category:
                                            </span>
                                            <span className="font-medium">
                                                {enrollment.course?.category}
                                            </span>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <Link
                                                href={`/dashboard/courses/${enrollment.courseId}/watch`}
                                            >
                                                <Button className="w-full">
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Continue Learning
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Pending Enrollments */}
            {pendingEnrollments.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                            Pending Enrollments
                        </h2>
                        <Badge variant="secondary">
                            {pendingEnrollments.length} Pending
                        </Badge>
                    </div>

                    <div className="grid gap-4">
                        {pendingEnrollments.map((enrollment) => (
                            <Card key={enrollment._id}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1">
                                                {enrollment.course?.title ||
                                                    "Course not found"}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {enrollment.course
                                                    ?.description ||
                                                    "No description available"}
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>
                                                    Amount: $
                                                    {enrollment.paymentAmount}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    Requested:{" "}
                                                    {new Date(
                                                        enrollment.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-5 w-5 text-yellow-500" />
                                            <Badge variant="secondary">
                                                Pending Approval
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Course Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-blue-500" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold">
                                    {approvedEnrollments.length}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Active Courses
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-green-500" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-gray-600">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Star className="h-8 w-8 text-yellow-500" />
                            <div className="ml-4">
                                <p className="text-2xl font-bold">-</p>
                                <p className="text-sm text-gray-600">
                                    Avg. Rating
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
