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
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Course Info */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {course.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                                <span className="font-semibold">4.8</span>
                            </div>
                            <span className="text-gray-600">(313 Ratings)</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {course.description}
                        </p>

                        {/* Course Image */}
                        {course.thumbnail && (
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 group cursor-pointer">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                                    <div className="bg-white rounded-full p-4">
                                        <Play className="w-8 h-8 text-indigo-600" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 sticky top-4">
                            {course.price && (
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-4xl font-bold text-gray-900">
                                            ৳{course.price}
                                        </span>
                                        <span className="text-xl text-gray-400 line-through">
                                            ৳{Math.round(course.price * 1.6)}
                                        </span>
                                    </div>
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded inline-block text-sm font-semibold">
                                        প্রোমো অ্যাপ্লাইড
                                    </div>
                                </div>
                            )}

                            {/* Course Highlights */}
                            <div className="space-y-4 mb-6">
                                {course.totalClasses && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Video className="w-5 h-5 text-indigo-600" />
                                        <span>
                                            {course.totalClasses} টি লাইভ ক্লাস
                                        </span>
                                    </div>
                                )}
                                {course.totalProjects && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Award className="w-5 h-5 text-indigo-600" />
                                        <span>
                                            {course.totalProjects} টি
                                            প্রজেক্টসমূহ
                                        </span>
                                    </div>
                                )}
                                {course.totalWeeks && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Clock className="w-5 h-5 text-indigo-600" />
                                        <span>{course.totalWeeks} সপ্তাহ</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Users className="w-5 h-5 text-indigo-600" />
                                    <span>জব প্লেসমেন্ট সাপোর্ট</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Video className="w-5 h-5 text-indigo-600" />
                                    <span>
                                        ক্লাস রেকর্ডিং এ লাইফটাইম এক্সেস
                                    </span>
                                </div>
                            </div>

                            {/* Enrollment Button */}
                            {!user ? (
                                <Link href="/login">
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg">
                                        ব্যাচে ভর্তি হোন
                                    </Button>
                                </Link>
                            ) : hasEnrollment ? (
                                <div className="text-center">
                                    {enrollmentStatus === "pending" && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p className="text-yellow-800 font-semibold">
                                                Enrollment Pending
                                            </p>
                                        </div>
                                    )}
                                    {enrollmentStatus === "approved" && (
                                        <Link href="/dashboard/courses">
                                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                                Go to My Courses
                                            </Button>
                                        </Link>
                                    )}
                                    {enrollmentStatus === "rejected" && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-red-800 font-semibold">
                                                Enrollment Rejected
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    onClick={() =>
                                        setEnrollmentDialogOpen(true)
                                    }
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
                                >
                                    ব্যাচে ভর্তি হোন
                                </Button>
                            )}

                            {/* Batch Info */}
                            {course.batchName && (
                                <div className="mt-6 pt-6 border-t">
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-gray-600 mb-1">
                                                ব্যাচ শুরু
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {course.batchName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">
                                                লাইভ ক্লাস
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                রাত ৯:০০- ১০:৩০ (বৃহ,রবি)
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
