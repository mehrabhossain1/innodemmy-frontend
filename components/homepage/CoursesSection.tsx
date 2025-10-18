import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "../CourseCard";
import Link from "next/link";

const liveCourses = [
    {
        id: "react-development-bootcamp",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 15",
        rating: 4.8,
        totalReviews: 234,
        title: "Complete React Development Bootcamp with Next.js 15",
        isLive: true,
        totalJoined: 1250,
        totalLessons: 45,
        totalProjects: 8,
        totalAssignments: 10,
        instructor: "Sarah Johnson",
    },
    {
        id: "react-development-bootcamp",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 12",
        rating: 4.9,
        totalReviews: 189,
        title: "Python for Data Science and Machine Learning Masterclass",
        isLive: true,
        totalJoined: 980,
        totalLessons: 52,
        totalProjects: 12,
        totalAssignments: 14,
        instructor: "Dr. Michael Chen",
    },
    {
        id: "ui-ux-design-complete",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 8",
        rating: 4.7,
        totalReviews: 156,
        title: "UI/UX Design Complete Course - Figma to Prototype",
        isLive: false,
        totalJoined: 750,
        totalLessons: 38,
        totalProjects: 6,
        totalAssignments: 6,
        instructor: "Emma Rodriguez",
    },
];

export default function CoursesSection() {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {liveCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            id={course.id}
                            image={course.image}
                            batchName={course.batchName}
                            rating={course.rating}
                            totalReviews={course.totalReviews}
                            title={course.title}
                            isLive={course.isLive}
                            totalJoined={course.totalJoined}
                            totalLessons={course.totalLessons}
                            totalProjects={course.totalProjects}
                            totalAssignments={course.totalAssignments}
                            instructor={course.instructor}
                        />
                    ))}
                </div>

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
