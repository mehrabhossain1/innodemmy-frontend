"use client";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Video,
    Award,
    CheckCircle2,
    ChevronDown,
    Calendar,
    Users,
} from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import EnrollmentDialog from "@/components/EnrollmentDialog";
import { useAuth } from "@/lib/hooks/useAuth";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CourseHeroSection from "@/components/course/CourseHeroSection";

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
    projects?: string[];
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

    const scrollToSection = (sectionId: string) => {
        setActiveTab(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100; // Offset for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {error ||
                            "The course you are looking for does not exist."}
                    </p>
                    <Link href="/courses">
                        <Button className="bg-primary hover:bg-primary/90 text-white">
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
            <CourseHeroSection
                course={course}
                user={user}
                hasEnrollment={hasEnrollment}
                enrollmentStatus={enrollmentStatus}
            />

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Navigation Tabs */}
                <div className="mt-12 border-b sticky top-16 bg-white z-40 shadow-sm">
                    <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                        {[
                            { id: "curriculum", label: "কারিকুলাম" },
                            { id: "projects", label: "প্রজেক্টসমুহ" },
                            { id: "features", label: "কোর্সে আপনি পাচ্ছেন" },
                            { id: "idealFor", label: "কোর্সটি যাদের জন্য" },
                            { id: "faq", label: "FAQ" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`pb-4 px-2 font-semibold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? "text-primary border-b-2 border-primary"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Curriculum Section */}
                {course.modules && course.modules.length > 0 && (
                    <div id="curriculum" className="mt-12 scroll-mt-24">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                কারিকুলাম
                            </h2>
                            <div className="flex gap-6 text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    <span>{course.totalModules} মডিউল</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="w-5 h-5" />
                                    <span>
                                        {course.totalClasses} লাইভ ক্লাস রুম
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 items-start">
                                {course.modules.map((module, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg overflow-hidden h-fit"
                                    >
                                        <button
                                            onClick={() => toggleModule(index)}
                                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-1">
                                                    Class
                                                    <span className="text-lg">
                                                        {module.classNumber ||
                                                            index + 1}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-left flex-1">
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
                                            <div className="p-6 bg-gray-50 border-t">
                                                {/* Module & Topics Covered */}
                                                {module.topics &&
                                                    module.topics.length >
                                                        0 && (
                                                        <div className="mb-6">
                                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                                <Video className="w-5 h-5" />
                                                                Topics:
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {module.topics.map(
                                                                    (
                                                                        topic,
                                                                        topicIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                topicIndex
                                                                            }
                                                                            className="flex items-start gap-3 text-gray-700 bg-white p-3 rounded"
                                                                        >
                                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                            <span>
                                                                                {
                                                                                    topic
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {/* Exercises */}
                                                {module.exercises &&
                                                    module.exercises.length >
                                                        0 && (
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                                <Award className="w-5 h-5" />
                                                                Exercises:
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {module.exercises.map(
                                                                    (
                                                                        exercise,
                                                                        exerciseIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                exerciseIndex
                                                                            }
                                                                            className="flex items-start gap-3 text-gray-700 bg-white p-3 rounded"
                                                                        >
                                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                            <span>
                                                                                {
                                                                                    exercise
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Projects Section */}
                <div id="projects" className="mt-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        যেসকল রিয়েল লাইফ প্রোজেক্ট করানো হবে
                    </h2>
                    {course.projects && course.projects.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {course.projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">
                                            {project}
                                        </h3>
                                    </div>
                                    <Award className="w-6 h-6 text-primary flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg text-center">
                            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                            <p className="text-gray-700 text-lg">
                                {course.totalProjects} টি ইন্ডাস্ট্রি
                                স্ট্যান্ডার্ড প্রজেক্ট করবেন এই কোর্সে
                            </p>
                        </div>
                    )}
                </div>
                {/* Course Features */}
                <div id="features" className="mt-12 scroll-mt-24">
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
                                className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20"
                            >
                                <feature.icon className="w-12 h-12 text-primary mb-4" />
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
                {/* Ideal For Section */}
                {course.idealFor && course.idealFor.length > 0 && (
                    <div id="idealFor" className="mt-12 scroll-mt-24">
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
                {/* Certificate Section */}
                <div className="mt-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        সার্টিফিকেট দিয়ে আপনি কী করতে পারবেন
                    </h2>
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background rounded-2xl p-8 border border-primary/20">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Left side - Certificate info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            You can add it to your CV
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            Unlike any outdated certificate make
                                            your portfolio stand out
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            Directly add in LinkedIn
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            Make your profile stand out
                                            everywhere.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            Share on Social Media
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            Share it on Instagram & WhatsApp, or
                                            via Email.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Certificate preview */}
                            <div className="relative">
                                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full opacity-20"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-tr-full opacity-20"></div>

                                    <div className="p-8 text-center relative">
                                        <div className="mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                                                <Award className="w-10 h-10 text-white" />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                                CERTIFICATE
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                OF COMPLETION
                                            </p>
                                        </div>

                                        <div className="border-t-2 border-b-2 border-gray-300 py-4 mb-4">
                                            <p className="text-lg font-semibold text-gray-800 mb-1">
                                                Name Surname
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                has successfully completed
                                            </p>
                                            <p className="text-sm font-bold text-primary mt-2">
                                                {course.title}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <div>
                                                <p className="font-semibold">
                                                    Date
                                                </p>
                                                <p>
                                                    {new Date().toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                                <Award className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    Signature
                                                </p>
                                                <p className="italic">
                                                    Authorized
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* FAQ Section */}
                {course.faq && course.faq.length > 0 && (
                    <div id="faq" className="mt-12 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            প্রায়ই জিজ্ঞেস করা প্রশ্ন
                        </h2>
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {course.faq.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-gray-200 rounded-lg bg-white px-6"
                                >
                                    <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline">
                                        {index + 1}. {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}{" "}
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 ">
                <div className="max-w-7xl mx-auto px-4 py-3">
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
                                <Link href={`/checkout?course=${course._id}`}>
                                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-5 text-base whitespace-nowrap shadow-lg shadow-secondary/20">
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
                                <Link href={`/checkout?course=${course._id}`}>
                                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-5 text-base whitespace-nowrap shadow-lg shadow-secondary/20">
                                        ব্যাচে ভর্তি হোন →
                                    </Button>
                                </Link>
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
