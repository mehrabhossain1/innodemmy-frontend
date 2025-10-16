"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Play,
    CheckCircle,
    Lock,
    Clock,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import VideoPlayer from "@/components/VideoPlayer";

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
    isCompleted?: boolean;
    isLocked?: boolean;
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    modules: Module[];
}

// Sample course data with YouTube video links for testing
const sampleCourse: Course = {
    id: "react-bootcamp",
    title: "Complete React Development Bootcamp",
    description: "Master React from basics to advanced concepts",
    instructor: "Sarah Johnson",
    modules: [
        {
            id: "module-1",
            title: "Getting Started with React",
            description: "Introduction to React fundamentals",
            lessons: [
                {
                    id: "lesson-1",
                    title: "Introduction to React",
                    description: "Learn what React is and why it's popular",
                    duration: "15 min",
                    videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM",
                    isCompleted: false,
                    isLocked: false,
                },
                {
                    id: "lesson-2",
                    title: "Setting Up Development Environment",
                    description: "Install Node.js, npm, and create-react-app",
                    duration: "20 min",
                    videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
                    isCompleted: false,
                    isLocked: false,
                },
                {
                    id: "lesson-3",
                    title: "Your First React Component",
                    description: "Create and understand React components",
                    duration: "25 min",
                    videoUrl: "https://www.youtube.com/embed/9bXhf_TELP4",
                    isCompleted: false,
                    isLocked: false,
                },
            ],
        },
        {
            id: "module-2",
            title: "React Hooks and State Management",
            description: "Learn about React hooks and managing state",
            lessons: [
                {
                    id: "lesson-4",
                    title: "Understanding useState Hook",
                    description:
                        "Master the useState hook for state management",
                    duration: "30 min",
                    videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
                    isCompleted: false,
                    isLocked: false,
                },
                {
                    id: "lesson-5",
                    title: "useEffect Hook Deep Dive",
                    description:
                        "Learn about side effects and the useEffect hook",
                    duration: "35 min",
                    videoUrl: "https://www.youtube.com/embed/0ZJgIjIuY7U",
                    isCompleted: false,
                    isLocked: false,
                },
            ],
        },
        {
            id: "module-3",
            title: "Advanced React Concepts",
            description: "Dive into advanced React patterns and concepts",
            lessons: [
                {
                    id: "lesson-6",
                    title: "Context API and useContext",
                    description: "Learn about React Context for global state",
                    duration: "40 min",
                    videoUrl: "https://www.youtube.com/embed/35lXWvCuM8o",
                    isCompleted: false,
                    isLocked: false,
                },
            ],
        },
    ],
};

// Sample course data with YouTube video links for testing

export default function CourseWatchPage() {
    const [course] = useState<Course>(sampleCourse);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [currentModule, setCurrentModule] = useState<Module | null>(null);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
            return;
        }

        // Set initial lesson (first lesson of first module)
        if (!isLoading && user && course.modules.length > 0) {
            const firstModule = course.modules[0];
            const firstLesson = firstModule.lessons[0];
            setCurrentModule(firstModule);
            setCurrentLesson(firstLesson);
        }
    }, [user, isLoading, router, course]);

    const handleLessonSelect = (lesson: Lesson, module: Module) => {
        if (lesson.isLocked) return;
        setCurrentLesson(lesson);
        setCurrentModule(module);
    };

    const getNextLesson = () => {
        if (!currentModule || !currentLesson) return null;

        const currentModuleIndex = course.modules.findIndex(
            (m) => m.id === currentModule.id
        );
        const currentLessonIndex = currentModule.lessons.findIndex(
            (l) => l.id === currentLesson.id
        );

        // Check if there's a next lesson in current module
        if (currentLessonIndex < currentModule.lessons.length - 1) {
            return {
                lesson: currentModule.lessons[currentLessonIndex + 1],
                module: currentModule,
            };
        }

        // Check if there's a next module
        if (currentModuleIndex < course.modules.length - 1) {
            const nextModule = course.modules[currentModuleIndex + 1];
            return {
                lesson: nextModule.lessons[0],
                module: nextModule,
            };
        }

        return null;
    };

    const handleNextLesson = () => {
        const next = getNextLesson();
        if (next) {
            setCurrentLesson(next.lesson);
            setCurrentModule(next.module);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading course...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    {course.title}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    by {course.instructor}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                                {course.modules.reduce(
                                    (acc, module) =>
                                        acc + module.lessons.length,
                                    0
                                )}{" "}
                                Lessons
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Player */}
                    <div className="lg:col-span-2">
                        {currentLesson && (
                            <VideoPlayer
                                videoUrl={currentLesson.videoUrl}
                                title={currentLesson.title}
                                description={currentLesson.description}
                                duration={currentLesson.duration}
                                isCompleted={currentLesson.isCompleted}
                                onComplete={() => {
                                    // Mark lesson as completed
                                    if (currentLesson) {
                                        currentLesson.isCompleted = true;
                                    }
                                }}
                            />
                        )}

                        {/* Navigation Buttons */}
                        <Card className="mt-4">
                            <CardContent className="p-4">
                                <div className="flex justify-between">
                                    <Button variant="outline" disabled>
                                        Previous Lesson
                                    </Button>
                                    {getNextLesson() && (
                                        <Button onClick={handleNextLesson}>
                                            Next Lesson
                                            <Play className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Course Modules Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Course Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="max-h-[600px] overflow-y-auto">
                                    {course.modules.map(
                                        (module, moduleIndex) => (
                                            <div
                                                key={module.id}
                                                className="border-b"
                                            >
                                                <div className="p-4 bg-gray-50">
                                                    <h3 className="font-semibold text-sm">
                                                        Module {moduleIndex + 1}
                                                        : {module.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {module.lessons.length}{" "}
                                                        lessons
                                                    </p>
                                                </div>
                                                <div className="divide-y">
                                                    {module.lessons.map(
                                                        (
                                                            lesson,
                                                            lessonIndex
                                                        ) => (
                                                            <button
                                                                key={lesson.id}
                                                                onClick={() =>
                                                                    handleLessonSelect(
                                                                        lesson,
                                                                        module
                                                                    )
                                                                }
                                                                disabled={
                                                                    lesson.isLocked
                                                                }
                                                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                                                                    currentLesson?.id ===
                                                                    lesson.id
                                                                        ? "bg-blue-50 border-r-2 border-blue-500"
                                                                        : ""
                                                                } ${
                                                                    lesson.isLocked
                                                                        ? "opacity-50 cursor-not-allowed"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <div className="flex items-start space-x-3">
                                                                    <div className="flex-shrink-0 mt-1">
                                                                        {lesson.isLocked ? (
                                                                            <Lock className="w-4 h-4 text-gray-400" />
                                                                        ) : lesson.isCompleted ? (
                                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                                        ) : (
                                                                            <Play className="w-4 h-4 text-gray-400" />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium line-clamp-2">
                                                                            {lessonIndex +
                                                                                1}
                                                                            .{" "}
                                                                            {
                                                                                lesson.title
                                                                            }
                                                                        </p>
                                                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                                                            <Clock className="w-3 h-3 mr-1" />
                                                                            {
                                                                                lesson.duration
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
