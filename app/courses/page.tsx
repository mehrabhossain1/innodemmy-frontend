"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    BookOpen,
    ArrowLeft,
    X,
    TrendingUp,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";

interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch("/api/courses");
                const data = await response.json();
                setAllCourses(data.courses || []);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const filteredCourses = useMemo(() => {
        return allCourses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [allCourses, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-8 w-px bg-gray-300" />
                            <div className="flex items-center space-x-3">
                                <BookOpen className="h-8 w-8 text-indigo-600" />
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    All Courses
                                </h1>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 text-sm px-4 py-2">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {filteredCourses.length} courses found
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border-b border-indigo-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-10 h-12 border-indigo-200 focus:border-indigo-400"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-6"></div>
                        <p className="text-gray-600 text-lg">
                            Loading courses...
                        </p>
                    </div>
                ) : (
                    <>
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard
                                        key={course._id}
                                        id={course._id}
                                        title={course.title}
                                        description={course.description}
                                        thumbnail={course.thumbnail}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <Filter className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                        No courses found
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Try adjusting your search criteria to
                                        find more courses.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setSearchTerm("")}
                                        className="px-8 py-3"
                                    >
                                        Clear Search
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <footer className="bg-gradient-to-r from-indigo-100 to-purple-100 border-t border-indigo-200 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <BookOpen className="h-6 w-6 text-indigo-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Innodemy
                            </span>
                        </div>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Empowering learners with world-class technology
                            education. Join thousands of students who have
                            transformed their careers with our courses.
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                            <span>© 2024 Innodemy. All rights reserved.</span>
                            <span>•</span>
                            <span>Trusted by 10,000+ students</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
