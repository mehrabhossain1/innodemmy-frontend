"use client";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Star,
    Clock,
    Calendar,
    Video,
    Users,
    Award,
    CheckCircle2,
    ChevronDown,
    Play,
} from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import EnrollmentDialog from "@/components/EnrollmentDialog";
import { useAuth } from "@/lib/hooks/useAuth";

interface CoursePageProps {
    params: Promise<{ id: string }>;
}

interface FAQ {
    question: string;
    answer: string;
}

interface ClassModule {
    classNumber: number;
    moduleTitle: string;
    topics: string[];
    exercises: string[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    category?: string;
    batchName?: string;
    thumbnail?: string;
    price?: number;
    totalClasses?: number;
    totalWeeks?: number;
    totalModules?: number;
    totalProjects?: number;
    idealFor?: string[];
    faq?: FAQ[];
    modules?: ClassModule[];
    createdAt: string;
    updatedAt: string;
}

export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const { user } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
    const [hasEnrollment, setHasEnrollment] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(
        null
    );
    const [activeTab, setActiveTab] = useState<string>("curriculum");
    const [expandedModules, setExpandedModules] = useState<number[]>([]);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (!response.ok) {
                    throw new Error("Course not found");
                }
                const data = await response.json();
                setCourse(data.course);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load course"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    // Check enrollment status if user is logged in
    useEffect(() => {
        async function checkEnrollment() {
            if (!user) return;

            try {
                const response = await fetch("/api/enrollments");
                if (response.ok) {
                    const data = await response.json();
                    const enrollment = data.enrollments?.find(
                        (e: { courseId: string; status: string }) =>
                            e.courseId === id
                    );
                    if (enrollment) {
                        setHasEnrollment(true);
                        setEnrollmentStatus(enrollment.status);
                    }
                }
            } catch (error) {
                console.error("Failed to check enrollment:", error);
            }
        }
        checkEnrollment();
    }, [user, id]);

    const toggleModule = (index: number) => {
        setExpandedModules((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {error ||
                            "The course you are looking for does not exist."}
                    </p>
                    <Link href="/courses">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Back Button */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Course Info - 2 columns */}
                    <div className="lg:col-span-2">
                        {/* Live Course Badge */}
                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-semibold mb-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            লাইভ কোর্স
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {course.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center bg-yellow-400 px-3 py-1.5 rounded">
                                <Star className="w-4 h-4 fill-white text-white mr-1" />
                                <span className="font-bold text-white">
                                    4.8
                                </span>
                            </div>
                            <span className="text-gray-600">(313 Ratings)</span>
                        </div>

                        {/* Description */}
                        <div className="text-gray-700 text-base leading-relaxed mb-8 space-y-3">
                            <p>{course.description}</p>
                        </div>

                        {/* Course Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {course.totalClasses && (
                                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold mb-1">
                                        {course.totalClasses}+
                                    </div>
                                    <div className="text-sm">Live Class</div>
                                </div>
                            )}
                            {course.totalModules && (
                                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold mb-1">
                                        {course.totalModules}
                                    </div>
                                    <div className="text-sm">Modules</div>
                                </div>
                            )}
                            {course.totalProjects && (
                                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold mb-1">
                                        {course.totalProjects}+
                                    </div>
                                    <div className="text-sm">Projects</div>
                                </div>
                            )}
                        </div>

                        {/* Batch Info Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {course.batchName && (
                                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                    <div className="text-sm mb-1">
                                        Batch Start:
                                    </div>
                                    <div className="font-bold text-sm">
                                        {course.batchName}
                                    </div>
                                </div>
                            )}
                            <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                <div className="text-sm mb-1">Class Days</div>
                                <div className="font-bold text-sm">
                                    Friday / Saturday
                                </div>
                            </div>
                            <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                                <div className="text-sm mb-1">Class Time</div>
                                <div className="font-bold text-sm">
                                    8pm – 10 Pm
                                </div>
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
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-900/40 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-purple-900/50 transition">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform shadow-lg">
                                        <Play className="w-12 h-12 text-red-600 fill-red-600" />
                                    </div>
                                </div>
                                {/* Video Corner Label */}
                                <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    <span className="text-xs font-bold">
                                        ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Share & Book Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h3 className="font-bold text-gray-900 mb-3 text-center">
                                Share & Book
                            </h3>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition">
                                    <svg
                                        className="w-5 h-5 text-blue-600"
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
                                                    {Math.round(
                                                        course.price * 1.6
                                                    )}
                                                    TK
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition">
                                    📋 Coupon
                                </button>
                            </div>

                            {/* Enrollment Button */}
                            {!user ? (
                                <Link href="/login">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-base rounded-lg">
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
                                <Button
                                    onClick={() =>
                                        setEnrollmentDialogOpen(true)
                                    }
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-base rounded-lg"
                                >
                                    Enroll Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mt-12 border-b">
                    <div className="flex gap-8 overflow-x-auto">
                        {[
                            "curriculum",
                            "projects",
                            "features",
                            "idealFor",
                            "faq",
                        ].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-2 font-semibold whitespace-nowrap transition-colors ${
                                    activeTab === tab
                                        ? "text-indigo-600 border-b-2 border-indigo-600"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {tab === "curriculum" && "কারিকুলাম"}
                                {tab === "projects" && "প্রজেক্টসমুহ"}
                                {tab === "features" && "কোর্সে আপনি পাচ্ছেন"}
                                {tab === "idealFor" && "কোর্সটি যাদের জন্য"}
                                {tab === "faq" && "FAQ"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Curriculum Section */}
                {activeTab === "curriculum" &&
                    course.modules &&
                    course.modules.length > 0 && (
                        <div className="mt-12">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    কারিকুলাম
                                </h2>
                                <div className="flex gap-6 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        <span>{course.totalModules} মডিউল</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Video className="w-5 h-5" />
                                        <span>
                                            {course.totalClasses} লাইভ ক্লাস
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {course.modules.map((module, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleModule(index)}
                                            className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm font-semibold">
                                                    সপ্তাহ {module.classNumber}
                                                </span>
                                                <h3 className="font-bold text-gray-900 text-left">
                                                    {module.moduleTitle}
                                                </h3>
                                            </div>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-600 transition-transform ${
                                                    expandedModules.includes(
                                                        index
                                                    )
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        {expandedModules.includes(index) && (
                                            <div className="p-6 bg-white border-t">
                                                {module.topics &&
                                                    module.topics.length >
                                                        0 && (
                                                        <div className="mb-4">
                                                            <h4 className="font-semibold text-gray-900 mb-3">
                                                                Topics:
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {module.topics.map(
                                                                    (
                                                                        topic,
                                                                        topicIndex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                topicIndex
                                                                            }
                                                                            className="flex items-start gap-2 text-gray-700"
                                                                        >
                                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                            <span>
                                                                                {
                                                                                    topic
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}

                                                {module.exercises &&
                                                    module.exercises.length >
                                                        0 && (
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-3">
                                                                Exercises:
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {module.exercises.map(
                                                                    (
                                                                        exercise,
                                                                        exerciseIndex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                exerciseIndex
                                                                            }
                                                                            className="flex items-start gap-2 text-gray-700"
                                                                        >
                                                                            <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                                                                            <span className="font-medium">
                                                                                {
                                                                                    exercise
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/* Course Features */}
                {activeTab === "features" && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            কোর্সে আপনি পাচ্ছেন
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Calendar,
                                    title: `${course.totalWeeks} মাসের গাইডেড জার্নি`,
                                    desc: "একদম বিগিনার ফ্রেন্ডলি ওয়েতে আপডেটেড কারিকুলাম",
                                },
                                {
                                    icon: Video,
                                    title: `${course.totalClasses}টি লাইভ ক্লাস`,
                                    desc: "ইন্ডাস্ট্রি এক্সপার্টের কাছে শিখুন লাইভে",
                                },
                                {
                                    icon: Award,
                                    title: `${course.totalProjects} টি প্রজেক্ট`,
                                    desc: "ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্রজেক্ট এড করুন সিভিতে",
                                },
                                {
                                    icon: Users,
                                    title: "প্রতিদিন ২ বেলা সাপোর্ট ক্লাস",
                                    desc: "প্র্যাক্টিস করতে গিয়ে প্রবলেমে পড়লে লাইভ সাপোর্ট নিন",
                                },
                                {
                                    icon: Video,
                                    title: "লাইফটাইম এক্সেস",
                                    desc: "প্রিরেকর্ডেড ভিডিও, রিসোর্স এবং ক্লাস রেকর্ডিং এ থাকবে লাইফ টাইম এক্সেস",
                                },
                                {
                                    icon: Award,
                                    title: "সার্টিফিকেট",
                                    desc: "কোর্স শেষ করে পাবেন শেয়ারেবল কোর্স কমপ্লিশন সার্টিফিকেট",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg"
                                >
                                    <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                                    <h3 className="font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ideal For Section */}
                {activeTab === "idealFor" &&
                    course.idealFor &&
                    course.idealFor.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                কোর্সটি আপনারই জন্য
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {course.idealFor.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4"
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/* FAQ Section */}
                {activeTab === "faq" && course.faq && course.faq.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            প্রায়ই জিজ্ঞেস করা প্রশ্ন
                        </h2>
                        <div className="space-y-4">
                            {course.faq.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-6 bg-white"
                                >
                                    <h3 className="font-bold text-gray-900 mb-3">
                                        {index + 1}. {item.question}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Section */}
                {activeTab === "projects" && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            যেসকল রিয়েল লাইফ প্রোজেক্ট করানো হবে
                        </h2>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg text-center">
                            <Award className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                            <p className="text-gray-700 text-lg">
                                {course.totalProjects} টি ইন্ডাস্ট্রি
                                স্ট্যান্ডার্ড প্রজেক্ট করবেন এই কোর্সে
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Price Section */}
                        <div className="flex flex-col">
                            {course.price && (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ৳{course.price}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            ৳{Math.round(course.price * 1.6)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded inline-block w-fit mt-1">
                                        প্রোমো অ্যাপ্লাইড
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Enrollment Button */}
                        <div className="flex-shrink-0">
                            {!user ? (
                                <Link href="/login">
                                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-5 text-base whitespace-nowrap">
                                        ব্যাচে ভর্তি হোন →
                                    </Button>
                                </Link>
                            ) : hasEnrollment ? (
                                enrollmentStatus === "approved" ? (
                                    <Link href="/dashboard/courses">
                                        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-5 text-base">
                                            Go to Course
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        disabled
                                        className="bg-gray-400 text-white font-bold px-6 py-5 text-base"
                                    >
                                        {enrollmentStatus === "pending"
                                            ? "Pending"
                                            : "Rejected"}
                                    </Button>
                                )
                            ) : (
                                <Button
                                    onClick={() =>
                                        setEnrollmentDialogOpen(true)
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-5 text-base whitespace-nowrap"
                                >
                                    ব্যাচে ভর্তি হোন →
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrollment Dialog */}
            {course && (
                <EnrollmentDialog
                    open={enrollmentDialogOpen}
                    onOpenChange={setEnrollmentDialogOpen}
                    courseId={course._id}
                    courseTitle={course.title}
                    coursePrice={course.price}
                />
            )}
        </div>
    );
}
