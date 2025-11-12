"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, TrendingUp, Cpu, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "../CourseCard";
import Link from "next/link";
import Container from "../Container";

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    batchName?: string;
    instructor?: string;
    category?: string;
    modules?: number;
    students?: number;
    duration?: string;
}

interface ApiCourse {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    thumbnail?: string;
    batchName?: string;
    instructor?: string;
    category?: string;
}

const categories = [
    { id: "all", label: "সকল কোর্স", icon: Code },
    { id: "web", label: "Web & App Development", icon: Code, count: "১৬ কোর্স" },
    { id: "product", label: "Product Management & Design", icon: Palette, count: "৪ কোর্স • ১ ওয়ার্কশপ" },
    { id: "business", label: "Business & Marketing", icon: TrendingUp, count: "৩ কোর্স" },
    { id: "data", label: "Data Engineering", icon: Cpu, count: "২ কোর্স • ১ ওয়ার্কশপ" },
    { id: "creative", label: "Creatives", icon: Briefcase, count: "৩ কোর্স • ১ ওর্কশপ" },
];

export default function CoursesSection() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses");
                if (response.ok) {
                    const data = await response.json();
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
                            category: course.category || "web",
                            modules: Math.floor(Math.random() * 20) + 10,
                            students: Math.floor(Math.random() * 50) + 10,
                            duration: `${Math.floor(Math.random() * 10) + 8} দিন বাকি`,
                        })
                    );
                    setCourses(mappedCourses.slice(0, 8));
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
        <section className="py-16 bg-muted/30">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        <span className="text-destructive">(↔)</span> আপকামিং লাইভ কোর্স
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="relative mb-12">
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 hidden md:flex"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                        activeCategory === category.id
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-card border-border hover:border-primary/50 text-foreground"
                                    }`}
                                >
                                    <category.icon className="h-4 w-4" />
                                    <div className="text-left">
                                        <div className="text-sm font-semibold whitespace-nowrap">
                                            {category.label}
                                        </div>
                                        {category.count && (
                                            <div className="text-xs text-muted-foreground">
                                                {category.count}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 hidden md:flex"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                thumbnail={course.image}
                                modules={course.modules}
                                students={course.students}
                                duration={course.duration}
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
                            বিস্তারিত দেখি
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
