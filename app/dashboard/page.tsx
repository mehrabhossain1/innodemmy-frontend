"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/dashboard/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import CourseCard from "@/components/CourseCard";
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
    thumbnail?: string;
    batchName: string;
    rating: number;
    totalReviews: number;
    isLive: boolean;
    totalJoined: number;
    totalLessons: number;
    totalProjects: number;
}

interface Enrollment {
    _id: string;
    courseId: string;
    status: "pending" | "approved" | "rejected";
    paymentAmount: number;
    course: Course;
    createdAt: string;
}

export default function DashboardPage() {
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

    // Filter approved enrollments (active courses)
    const approvedEnrollments = enrollments.filter(
        (enrollment) => enrollment.status === "approved"
    );

    if (isLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }
    return (
        <div className="min-h-screen">
            {/* Dashboard Header - Full Width */}
            <DashboardHeader />

            {/* Page Header - Full Width, aligned with Dashboard Header */}
            <PageHeader />

            {/* Main Content Layout */}
            <div className="flex container mx-auto mt-6 space-x-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1">
                    {approvedEnrollments.length > 0 ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {approvedEnrollments.map((enrollment) => (
                                    <CourseCard
                                        key={enrollment._id}
                                        id={enrollment.course._id}
                                        image={
                                            enrollment.course.thumbnail ||
                                            "/placeholder.svg"
                                        }
                                        batchName={
                                            enrollment.course.batchName ||
                                            enrollment.course.category
                                        }
                                        rating={enrollment.course.rating || 4.5}
                                        totalReviews={
                                            enrollment.course.totalReviews || 0
                                        }
                                        title={enrollment.course.title}
                                        isLive={
                                            enrollment.course.isLive || false
                                        }
                                        totalJoined={
                                            enrollment.course.totalJoined || 0
                                        }
                                        totalLessons={
                                            enrollment.course.totalLessons || 0
                                        }
                                        totalProjects={
                                            enrollment.course.totalProjects || 0
                                        }
                                        instructor={
                                            enrollment.course.instructor
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </div>
    );
}
