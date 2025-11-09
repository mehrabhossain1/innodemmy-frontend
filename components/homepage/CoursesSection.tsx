"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "../CourseCard";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    batchName?: string;
    instructor?: string;
}

interface ApiCourse {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    thumbnail?: string;
    batchName?: string;
    instructor?: string;
}

export default function CoursesSection() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses");
                if (response.ok) {
                    const data = await response.json();
                    // Map API response to Course interface
                    const mappedCourses: Course[] = data.courses.map(
                        (course: ApiCourse) => ({
                            id: course._id || course.id || "",
                            title: course.title,
                            description: course.description || "",
                            image:
                                course.thumbnail ||
                                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                            batchName: course.batchName,
                            instructor: course.instructor,
                        })
                    );
                    // Show only first 3 courses for homepage
                    setCourses(mappedCourses.slice(0, 3));
                } else {
                    console.error("Failed to fetch courses");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                        Featured Courses
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join our interactive live sessions and learn directly
                        from industry experts. Get real-time feedback and
                        collaborate with fellow learners.
                    </p>
                </div>

                {/* Course Cards Grid */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">
                            Loading courses...
                        </p>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                thumbnail={course.image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">
                            No courses available at the moment.
                        </p>
                    </div>
                )}

                {/* View All Courses Button */}
                <div className="text-center">
                    <Link href="/courses">
                        <Button
                            size="lg"
                            className="px-8 py-3 h-auto text-base shadow-lg hover:shadow-xl transition-all duration-200 ease-out"
                        >
                            View All Courses
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
