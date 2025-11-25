"use client";

import Container from "@/components/Container";
import CourseCard from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    BookOpen,
    Filter,
    Search,
    TrendingUp,
    X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Course {
    _id: string;
    slug?: string;
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
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
            <div className="bg-gradient-to-r from-white to-primary/5 border-b border-primary/20 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-8 w-px bg-gray-300" />
                            <div className="flex items-center space-x-3">
                                <BookOpen className="h-8 w-8 text-primary" />
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    All Courses
                                </h1>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-sm px-4 py-2">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {filteredCourses.length} courses found
                        </Badge>
                    </div>
                </div>
            </div>

            <Container className="py-10">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-6"></div>
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
                                        slug={course.slug}
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
            </Container>
        </div>
    );
}
