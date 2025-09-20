"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, ClipboardList, FolderOpen } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import PageHeader from "@/components/dashboard/PageHeader";
import Sidebar from "@/components/dashboard/Sidebar";

// Define the type for params
interface CoursePageProps {
    params: Promise<{ id: string }>;
}

interface Lesson {
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    content?: string;
}

interface CourseModule {
    title: string;
    description: string;
    duration: string;
    lessons: Lesson[];
}

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
    modules: CourseModule[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data.course);
                } else {
                    setCourse(null);
                }
            } catch (error) {
                console.error("Failed to fetch course:", error);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h1>
                    <Link href="/dashboard">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
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
                    {/* Course Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-6">
                            {course.title}
                        </h1>
                        
                        {/* Course Stats */}
                        <div className="flex items-center justify-center space-x-8 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-lg">
                                    {course.modules?.reduce((total, module) => total + module.lessons.length, 0) || 0} Lessons
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5" />
                                <span className="text-lg">0 quizzes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ClipboardList className="w-5 h-5" />
                                <span className="text-lg">0 Assignments</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FolderOpen className="w-5 h-5" />
                                <span className="text-lg">0 Projects</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Course Progress Card */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-black">Course Progress</h3>
                                <span className="text-lg font-semibold text-blue-600">0%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '0%'}}></div>
                            </div>
                        </div>

                        {/* Quiz Card */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-black">Quiz</h3>
                                <span className="text-lg font-semibold text-green-600">0/0</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '0%'}}></div>
                            </div>
                        </div>

                        {/* Assignment Card */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-black">Assignment</h3>
                                <span className="text-lg font-semibold text-green-600">0/0</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '0%'}}></div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Button */}
                    <div className="text-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded">
                            Certificate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
// export default function CourseDetailsPage() {
//     return <div>CourseDetailsPage</div>;
// }
