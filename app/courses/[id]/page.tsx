import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Play, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// This would typically come from your database or API
const getCourseData = (id: string) => {
    const courses = {
        "react-development-bootcamp": {
            id: "react-development-bootcamp",
            title: "Complete React Development Bootcamp with Next.js 15",
            image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
            batchName: "Batch 15",
            rating: 4.8,
            totalReviews: 234,
            isLive: true,
            instructor: "Sarah Johnson",
            instructorImage:
                "https://cdn-icons-png.flaticon.com/512/219/219988.png",
            price: 299,
            originalPrice: 499,
            totalJoined: 1250,
            totalLessons: 45,
            totalProjects: 8,
            duration: "12 weeks",
            description:
                "Master React development from basics to advanced concepts including Next.js 15, TypeScript, and modern development practices.",
            whatYouWillLearn: [
                "Build modern React applications with hooks and context",
                "Master Next.js 15 with App Router and Server Components",
                "Implement TypeScript for type-safe development",
                "Create responsive designs with Tailwind CSS",
                "Deploy applications to production",
                "Work with APIs and database integration",
            ],
        },
        // Add other courses here...
    };

    return courses[id as keyof typeof courses] || null;
};

export default function CoursePage({ params }: { params: { id: string } }) {
    const course = getCourseData(params.id);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h1>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Header */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">
                                        {course.batchName}
                                    </Badge>
                                    {course.isLive && (
                                        <Badge className="bg-red-500 hover:bg-red-600 text-white">
                                            <Play className="w-3 h-3 mr-1" />
                                            LIVE
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i <
                                                    Math.floor(course.rating)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {course.rating}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ({course.totalReviews} reviews)
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {course.title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                {course.description}
                            </p>

                            {/* Course Image */}
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    src={course.image || "/placeholder.svg"}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>

                        {/* What You'll Learn */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                What you'll learn
                            </h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                {course.whatYouWillLearn.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Enrollment Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${course.price}
                                    </span>
                                    <span className="text-lg text-gray-500 line-through">
                                        ${course.originalPrice}
                                    </span>
                                </div>
                                <p className="text-sm text-green-600 font-medium">
                                    Save ${course.originalPrice - course.price}
                                </p>
                            </div>

                            <Button className="w-full mb-4" size="lg">
                                Enroll Now
                            </Button>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Duration
                                    </span>
                                    <span className="font-medium">
                                        {course.duration}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Students
                                    </span>
                                    <span className="font-medium">
                                        {course.totalJoined.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Lessons
                                    </span>
                                    <span className="font-medium">
                                        {course.totalLessons}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Projects
                                    </span>
                                    <span className="font-medium">
                                        {course.totalProjects}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Your Instructor
                            </h3>
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={
                                        course.instructorImage ||
                                        "/placeholder.svg"
                                    }
                                    alt={course.instructor}
                                    width={60}
                                    height={60}
                                    className="w-15 h-15 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {course.instructor}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Senior React Developer
                                    </p>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">
                                            {course.rating}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            instructor rating
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
