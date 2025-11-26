"use client";

import { Button } from "@/components/ui/button";
import {
    Calendar,
    Video,
    Users,
    Award,
    CheckCircle2,
    Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HtmlContent } from "@/components/ui/html-content";

interface Course {
    _id: string;
    title: string;
    description: string;
    batchName?: string;
    thumbnail?: string;
    price?: number;
    totalClasses?: number;
    totalProjects?: number;
}

interface User {
    _id?: string;
    email: string;
    name: string;
    role: "student" | "admin";
}

interface CourseHeroSectionProps {
    course: Course;
    user: User | null;
    hasEnrollment: boolean;
    enrollmentStatus: string | null;
}

export default function CourseHeroSection({
    course,
    user,
    hasEnrollment,
    enrollmentStatus,
}: CourseHeroSectionProps) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Course Info - 2 columns */}
                <div className="lg:col-span-2">
                    {/* Live Course Badge */}
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-semibold mb-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        লাইভ কোর্স
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {course.title}
                    </h1>

                    {/* Description */}
                    <div className="mb-6 w-full">
                        <HtmlContent
                            html={course.description}
                            className="text-gray-700 text-base leading-relaxed whitespace-pre-line text-justify"
                        />
                    </div>

                    {/* Course Stats Section */}
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-4 mb-6">
                        {/* Header */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-gray-900">
                                ব্যাচ হাইলাইট
                            </h3>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Live Class */}
                            {course.totalClasses && (
                                <div className="bg-white rounded-lg p-3 border border-primary/10 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-2">
                                        <div className="bg-primary/10 p-1.5 rounded-lg">
                                            <Video className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-primary text-xs font-semibold mb-0.5">
                                                📚 লাইভ ক্লাস
                                            </p>
                                            <p className="text-gray-900 font-bold text-sm">
                                                রাত ৮.০০- ১০.০০{" "}
                                                <span className="text-primary">
                                                    ({course.totalClasses}টি)
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Support Class */}
                            <div className="bg-white rounded-lg p-3 border border-primary/10 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-2">
                                    <div className="bg-secondary/10 p-1.5 rounded-lg">
                                        <Users className="w-4 h-4 text-secondary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-secondary text-xs font-semibold mb-0.5">
                                            📋 সাপোর্ট ক্লাস
                                        </p>
                                        <p className="text-gray-900 font-bold text-sm">
                                            প্রতিদিন ২টি (দুপুর ও রাত ৯ টায়)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Weeks/Batch Info */}
                            <div className="bg-white rounded-lg p-3 border border-primary/10 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-2">
                                    <div className="bg-primary/10 p-1.5 rounded-lg">
                                        <Calendar className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-primary text-xs font-semibold mb-0.5">
                                            📅 শুরু হবে
                                        </p>
                                        <p className="text-gray-900 font-bold text-sm">
                                            {course.batchName || "আসন্ন ব্যাচ"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Class Recording */}
                            <div className="bg-white rounded-lg p-3 border border-primary/10 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-2">
                                    <div className="bg-secondary/10 p-1.5 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-secondary text-xs font-semibold mb-0.5">
                                            💻 লাইফটাইম এক্সেস
                                        </p>
                                        <p className="text-gray-900 font-bold text-sm">
                                            পাবেন
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Projects Count */}
                            {course.totalProjects && (
                                <div className="bg-white rounded-lg p-3 border border-primary/10 hover:shadow-md transition-shadow col-span-2">
                                    <div className="flex items-start gap-2">
                                        <div className="bg-primary/10 p-1.5 rounded-lg">
                                            <Award className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-primary text-xs font-semibold mb-0.5">
                                                🎯 লাইভ ক্লাসে
                                            </p>
                                            <p className="text-gray-900 font-bold text-sm">
                                                {course.totalProjects} টি প্রজেক্ট
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Video & Enrollment - 1 column */}
                <div className="lg:col-span-1">
                    {/* Video Thumbnail */}
                    {course.thumbnail && (
                        <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-xl mb-4">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/50 transition">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <Play className="w-12 h-12 text-secondary fill-secondary" />
                                </div>
                            </div>
                            {/* Video Corner Label */}
                            <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                <span className="text-xs font-bold">
                                    ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Share & Book Section */}
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 mb-4">
                        <h3 className="font-bold text-gray-900 mb-3 text-center">
                            Share & Book
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition">
                                <svg
                                    className="w-5 h-5 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    Share Course
                                </span>
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg py-2.5 hover:bg-green-600 transition">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="text-sm font-medium">
                                    Book Session
                                </span>
                            </button>
                        </div>

                        {/* Coupon Badge */}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 flex items-center justify-between">
                            <div>
                                {course.price && (
                                    <>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-gray-900">
                                                {course.price} TK
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                {Math.round(course.price * 1.6)}
                                                TK
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button className="bg-secondary text-white px-3 py-1 rounded text-xs font-semibold hover:bg-secondary/90 transition">
                                📋 Coupon
                            </button>
                        </div>

                        {/* Enrollment Button */}
                        {!user ? (
                            <Link href={`/checkout?course=${course._id}`}>
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 text-base rounded-lg">
                                    Enroll Now
                                </Button>
                            </Link>
                        ) : hasEnrollment ? (
                            enrollmentStatus === "approved" ? (
                                <Link href="/dashboard/courses">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-base rounded-lg">
                                        Go to My Courses
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    disabled
                                    className="w-full bg-gray-400 text-white font-bold py-4 text-base rounded-lg"
                                >
                                    {enrollmentStatus === "pending"
                                        ? "Enrollment Pending"
                                        : "Enrollment Rejected"}
                                </Button>
                            )
                        ) : (
                            <Link href={`/checkout?course=${course._id}`}>
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 text-base rounded-lg">
                                    Enroll Now
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
