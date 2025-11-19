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
        <section className="relative py-12 md:py-16 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    color: 'hsl(var(--primary) / 0.1)'
                }}></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-8">
                    <div className="inline-block mb-3 lg:mb-3">
                        <span className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20">
                            ⭐ Popular Picks
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-3">
                        <span className="text-foreground">
                            Featured
                        </span>{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Courses
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-base text-muted-foreground max-w-2xl mx-auto">
                        Explore our hand-picked courses designed to help you master in-demand skills
                    </p>
                </div>

                {/* Category Tabs - Light Design */}
                <div className="relative mb-8 md:mb-10 lg:mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 lg:pb-3 scrollbar-hide">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 hidden md:flex h-9 w-9 lg:h-8 lg:w-8 bg-card hover:bg-muted text-foreground border border-border"
                        >
                            <ChevronLeft className="h-4 w-4 lg:h-4 lg:w-4" />
                        </Button>

                        <div className="flex gap-2 lg:gap-2.5 flex-1 overflow-x-auto scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`shrink-0 flex items-center gap-1.5 lg:gap-2 px-3 lg:px-3.5 py-2 lg:py-2.5 rounded-lg lg:rounded-xl border-2 transition-all duration-300 ${
                                        activeCategory === category.id
                                            ? "bg-gradient-to-r from-primary to-primary/80 border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-card/50 border-border hover:border-primary/30 text-foreground hover:bg-muted backdrop-blur-sm"
                                    }`}
                                >
                                    <category.icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                                    <div className="text-left">
                                        <div className="text-xs lg:text-sm font-semibold whitespace-nowrap">
                                            {category.label}
                                        </div>
                                        {category.count && (
                                            <div className={`text-[10px] lg:text-xs ${activeCategory === category.id ? 'text-white/80' : 'text-muted-foreground'}`}>
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
                            className="shrink-0 hidden md:flex h-9 w-9 lg:h-8 lg:w-8 bg-card hover:bg-muted text-foreground border border-border"
                        >
                            <ChevronRight className="h-4 w-4 lg:h-4 lg:w-4" />
                        </Button>
                    </div>
                </div>

                {/* Course Cards Grid */}
                {loading ? (
                    <div className="text-center py-12 lg:py-12">
                        <div className="animate-spin rounded-full h-12 w-12 lg:h-14 lg:w-14 border-b-2 border-primary mx-auto mb-3"></div>
                        <p className="text-muted-foreground text-base lg:text-base">
                            Loading featured courses...
                        </p>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8 md:mb-10 lg:mb-8">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <CourseCard
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    thumbnail={course.image}
                                    modules={course.modules}
                                    students={course.students}
                                    duration={course.duration}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 lg:py-12">
                        <div className="inline-flex items-center justify-center w-14 h-14 lg:w-14 lg:h-14 rounded-full bg-muted border border-border mb-3">
                            <Code className="w-7 h-7 lg:w-7 lg:h-7 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-base lg:text-base">
                            No courses available at the moment.
                        </p>
                    </div>
                )}

                {/* View All Courses Button - Enhanced */}
                <div className="text-center">
                    <Link href="/courses">
                        <Button
                            size="default"
                            className="px-6 lg:px-7 py-5 lg:py-5 h-auto text-sm lg:text-base font-semibold bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white shadow-lg shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 rounded-lg lg:rounded-xl border-2 border-secondary/20 hover:border-secondary/40 group"
                        >
                            View All Courses
                            <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </div>
            </Container>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
