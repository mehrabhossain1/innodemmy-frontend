"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    ClipboardList,
    FolderOpen,
    Star,
    Users,
    Clock,
    Award,
    Check,
    ChevronDown,
    ChevronUp,
    User
} from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import Image from "next/image";

interface CoursePageProps {
    params: Promise<{ id: string }>;
}

interface Tool {
    name: string;
    description: string;
    icon?: string;
}

interface Project {
    title: string;
    description?: string;
}

interface Instructor {
    name: string;
    title?: string;
    bio?: string;
    image?: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface Lesson {
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    content?: string;
}

interface CourseModule {
    title: string;
    description: string;
    duration: string;
    lessons: Lesson[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    instructor: string;
    duration: string;
    level: string;
    category: string;
    thumbnail?: string;
    batchName?: string;
    rating?: number;
    totalReviews?: number;
    isLive?: boolean;
    totalJoined?: number;
    totalProjects?: number;
    totalAssignments?: number;
    modules: CourseModule[];
    benefits?: string[];
    tools?: Tool[];
    projects?: Project[];
    targetAudience?: string[];
    requirements?: string[];
    instructors?: Instructor[];
    faqs?: FAQ[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/courses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data.course);
                } else {
                    setCourse(null);
                }
            } catch (error) {
                console.error("Failed to fetch course:", error);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-700">Loading course details...</div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Course Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
                    <Link href="/courses">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">Browse All Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const totalLessons = course.modules?.reduce((total, module) => total + module.lessons.length, 0) || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Course Info */}
                        <div>
                            {course.batchName && (
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 mb-4 text-white border-0">
                                    {course.batchName}
                                </Badge>
                            )}
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-indigo-100 mb-6 leading-relaxed">
                                {course.shortDescription}
                            </p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-6 mb-6">
                                {course.rating && (
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{course.rating}</span>
                                        <span className="text-indigo-200">({course.totalReviews || 0} reviews)</span>
                                    </div>
                                )}
                                {course.totalJoined !== undefined && (
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5" />
                                        <span>{course.totalJoined} students enrolled</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8">
                                    Enroll Now - ৳{course.price}
                                </Button>
                                {course.isLive && (
                                    <Badge className="bg-pink-500 text-white border-0 px-4 py-2 animate-pulse">
                                        🔴 Live Classes
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Right: Course Image */}
                        <div className="relative">
                            {course.thumbnail && (
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Course Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                        <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900 mb-1">{totalLessons}</div>
                        <div className="text-gray-600">Lessons</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                        <FolderOpen className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900 mb-1">{course.totalProjects || 0}</div>
                        <div className="text-gray-600">Projects</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                        <ClipboardList className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900 mb-1">{course.totalAssignments || 0}</div>
                        <div className="text-gray-600">Assignments</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                        <Award className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900 mb-1">✓</div>
                        <div className="text-gray-600">Certificate</div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Course Description */}
                        <div className="bg-white rounded-xl p-8 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Short Description</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
                        </div>

                        {/* What You'll Get */}
                        {course.benefits && course.benefits.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get in This Course</h2>
                                <div className="space-y-3">
                                    {course.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Course Modules */}
                        {course.modules && course.modules.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Module</h2>
                                <div className="space-y-4">
                                    {course.modules.map((module, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                                                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                                                        <p className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration}</p>
                                                    </div>
                                                </div>
                                                {expandedModule === index ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-600" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                                )}
                                            </button>
                                            {expandedModule === index && (
                                                <div className="px-6 py-4 bg-white">
                                                    <p className="text-gray-700 mb-4">{module.description}</p>
                                                    <div className="space-y-2">
                                                        {module.lessons.map((lesson, lessonIndex) => (
                                                            <div key={lessonIndex} className="flex items-start space-x-3 py-2">
                                                                <BookOpen className="w-4 h-4 text-indigo-600 mt-1" />
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="font-medium text-gray-900">{lesson.title}</span>
                                                                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {course.projects && course.projects.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.projects.map((project, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-400 transition-colors">
                                            <div className="flex items-start space-x-3">
                                                <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                                                    {project.description && (
                                                        <p className="text-sm text-gray-600">{project.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tools & Technologies */}
                        {course.tools && course.tools.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Technologies You will Learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.tools.map((tool, index) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                                {tool.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                                                <p className="text-sm text-gray-600">{tool.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* What You'll Need to Get Started */}
                        {course.requirements && course.requirements.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Need to Get Started</h2>
                                <div className="space-y-3">
                                    {course.requirements.map((requirement, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <Check className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{requirement}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ */}
                        {course.faqs && course.faqs.length > 0 && (
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-3">
                                    {course.faqs.map((faq, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
                                            >
                                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                                {expandedFAQ === index ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                                )}
                                            </button>
                                            {expandedFAQ === index && (
                                                <div className="px-6 py-4 bg-white">
                                                    <p className="text-gray-700">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Enrollment Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
                            <div className="text-center mb-6">
                                <div className="text-4xl font-bold text-indigo-600 mb-2">৳{course.price}</div>
                                <div className="text-gray-600">One-time payment</div>
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 text-lg mb-4">
                                Enroll Now
                            </Button>
                            <div className="text-sm text-gray-600 text-center">
                                <Award className="w-4 h-4 inline mr-1" />
                                Lifetime access • Certificate included
                            </div>
                        </div>

                        {/* Who This Course Is For */}
                        {course.targetAudience && course.targetAudience.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Who This Course Is For</h3>
                                <div className="space-y-3">
                                    {course.targetAudience.map((audience, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <User className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{audience}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructors */}
                        {course.instructors && course.instructors.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Instructors and Mentors</h3>
                                <div className="space-y-4">
                                    {course.instructors.map((instructor, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                                {instructor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{instructor.name}</div>
                                                {instructor.title && (
                                                    <div className="text-sm text-indigo-600 mb-1">{instructor.title}</div>
                                                )}
                                                {instructor.bio && (
                                                    <div className="text-sm text-gray-600">{instructor.bio}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Course Info */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Course Information</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Level</span>
                                    <Badge variant="outline">{course.level}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category</span>
                                    <Badge variant="outline">{course.category}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-semibold text-gray-900">{course.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Language</span>
                                    <span className="font-semibold text-gray-900">Bengali</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
