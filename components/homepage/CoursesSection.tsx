import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "../CourseCard";

const liveCourses = [
    {
        id: "react-development-bootcamp",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 15",
        rating: 4.8,
        totalReviews: 234,
        title: "Complete React Development Bootcamp with Next.js 15",
        isLive: true,
        totalJoined: 1250,
        totalLessons: 45,
        totalProjects: 8,
        instructor: "Sarah Johnson",
    },
    {
        id: "python-data-science-ml",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 12",
        rating: 4.9,
        totalReviews: 189,
        title: "Python for Data Science and Machine Learning Masterclass",
        isLive: true,
        totalJoined: 980,
        totalLessons: 52,
        totalProjects: 12,
        instructor: "Dr. Michael Chen",
    },
    {
        id: "ui-ux-design-complete",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 8",
        rating: 4.7,
        totalReviews: 156,
        title: "UI/UX Design Complete Course - Figma to Prototype",
        isLive: false,
        totalJoined: 750,
        totalLessons: 38,
        totalProjects: 6,
        instructor: "Emma Rodriguez",
    },
];

export default function CoursesSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Courses
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join our interactive live sessions and learn directly
                        from industry experts. Get real-time feedback and
                        collaborate with fellow learners.
                    </p>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                            instructor={course.instructor}
                        />
                    ))}
                </div>

                {/* View All Courses Button */}
                <div className="text-center">
                    <Button size="lg" className="px-8 py-3 h-auto text-base">
                        View All Courses
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
