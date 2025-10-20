"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2, ArrowLeft, Play, Edit } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import { CourseModuleEditor } from "@/components/CourseModuleEditor";
import { ProjectsEditor } from "@/components/ProjectsEditor";

// Define the type for params
interface CoursePageProps {
    params: Promise<{ id: string }>;
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
    price: number;
    instructor: string;
    duration: string;
    level: string;
    category: string;
    thumbnail?: string;
    modules: CourseModule[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CourseModuleData {
    class: string;
    title: string;
    topics: string[];
    exercises: string[];
}

const defaultCourseModules: CourseModuleData[] = [
    {
        class: "Class 1",
        title: "Module 1: Getting Started with Python",
        topics: [
            "What is Python and why use it?",
            "Installing Python (Anaconda, VS Code, Jupyter)",
            "Python syntax, indentation, comments",
            "Variables and naming rules",
            "Built-in data types: int, float, str, bool",
            "Type casting and type()",
            "Operators: arithmetic, comparison, logical",
        ],
        exercises: [
            "Personal info script",
            "Simple calculator",
            "Even/Odd number checker",
        ],
    },
    {
        class: "Class 2",
        title: "Module 2: Strings, Input/Output & Control Flow",
        topics: [
            "String indexing, slicing, methods (split(), join(), replace(), strip())",
            "f-strings and .format()",
            "input() and console interactions",
            "if, elif, else statements",
            "for, while loops",
            "break, continue, pass",
            "Nested loops and logic patterns",
        ],
        exercises: ["Password generator", "Word/character counter"],
    },
    {
        class: "Class 3",
        title: "Module 3: Data Structures & List Comprehensions",
        topics: [
            "Lists, Tuples, Sets, Dictionaries",
            "CRUD operations on collections",
            "get(), .update(), .items()",
            "Nested structures",
            "zip(), enumerate(), sorted()",
            "List comprehensions and dictionary/set comprehensions",
        ],
        exercises: ["Student record manager", "Word frequency counter"],
    },
    {
        class: "Class 4",
        title: "Module 4: Functions, Recursion & Modules",
        topics: [
            "Defining and calling functions",
            "Parameters, return values, scope",
            "Default, keyword, variable-length arguments",
            "Recursion: factorial, Fibonacci, directory scan",
            "Anonymous functions: lambda",
            "map(), filter(), reduce()",
            "Built-in functions: map(), filter(), reduce()",
            "Writing your own modules and imports",
        ],
        exercises: [
            "Recursive file search",
            "Word filter with lambda and filter()",
        ],
    },
    {
        class: "Class 5",
        title: "Module 5: File Handling, CSV & JSON",
        topics: [
            "Working with text files",
            "CSV files using csv module",
            "JSON: parsing, serialization",
            "with statement, open(), read(), write()",
            "File loops and data cleaning",
            "File system navigation: os, pathlib",
        ],
        exercises: [
            "CSV data cleaner & summarizer",
            "JSON user profile builder",
        ],
    },
    {
        class: "Class 6",
        title: "Module 6: Error Handling & Debugging",
        topics: [
            "Error types: syntax, runtime, logic",
            "Try-Except blocks, else, finally",
            "Custom exceptions with raise",
            "Basic debugger: pdb",
            "Logging intro (optional)",
        ],
        exercises: ["File reader with missing file handler"],
    },
    {
        class: "Class 7",
        title: "Module 7: Object-Oriented Programming (OOP)",
        topics: [
            "Classes, objects, __init__, attributes",
            "Class methods and self",
            "Inheritance and method overriding",
            "Encapsulation and __str__",
            "Composition (optional)",
        ],
        exercises: ["Bank account system", "Tic-Tac-Toe with OOP"],
    },
    {
        class: "Class 8",
        title: "Module 8: Advanced Python (Generators, Decorators, Virtualenv)",
        topics: [
            "Generators: yield, lazy evaluation",
            "Decorators: writing and applying",
            "Closures and first-class functions",
            "Introduction to virtualenv & pip",
            "Installing external libraries",
        ],
        exercises: ["Generator for large file line processing"],
    },
    {
        class: "Class 9",
        title: "Module 9: Web Scraping & APIs",
        topics: [
            "Web scraping with requests, BeautifulSoup",
            "Parsing HTML: tags, classes, attributes",
            "Error handling for HTTP requests",
            "Working with APIs (e.g., OpenWeatherMap)",
            "Exporting data to CSV/JSON",
        ],
        exercises: [
            "News headline scraper",
            "Weather report fetcher",
            "Job listings to CSV from web",
        ],
    },
    {
        class: "Class 10",
        title: "Project Support 1",
        topics: ["Dedicated time for project guidance and troubleshooting"],
        exercises: [],
    },
    {
        class: "Class 11",
        title: "Project Support 2",
        topics: ["Continued project development and mentoring"],
        exercises: [],
    },
    {
        class: "Class 12",
        title: "Project Support 3",
        topics: ["Final project review and completion"],
        exercises: [],
    },
];

const defaultProjects: string[] = [
    "Password generator",
    "Number guessing game",
    "Recursive file search",
    "CSV data cleaner & summarizer",
    "JSON user profile builder",
    "File reader with missing file handler",
    "Bank account system (OOP)",
    "Tic-Tac-Toe with OOP",
    "Generator for large file line processing",
    "News headline scraper",
];

export default function CoursePage({ params }: CoursePageProps) {
    const { id } = use(params);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [isEditingModules, setIsEditingModules] = useState(false);
    const [isEditingProjects, setIsEditingProjects] = useState(false);

    const [courseModules, setCourseModules] = useState<CourseModuleData[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(`courseModules-${id}`);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse saved modules:", e);
                }
            }
        }
        return defaultCourseModules;
    });

    const [projects, setProjects] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(`courseProjects-${id}`);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse saved projects:", e);
                }
            }
        }
        return defaultProjects;
    });

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

    const handleSaveModules = (updatedModules: CourseModuleData[]) => {
        setCourseModules(updatedModules);
        localStorage.setItem(`courseModules-${id}`, JSON.stringify(updatedModules));
        setIsEditingModules(false);
    };

    const handleSaveProjects = (updatedProjects: string[]) => {
        setProjects(updatedProjects);
        localStorage.setItem(`courseProjects-${id}`, JSON.stringify(updatedProjects));
        setIsEditingProjects(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Course Not Found
                    </h1>
                    <Link href="/courses">
                        <Button>Back to Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Sample data - these would come from the API
    const totalLessons =
        course.modules?.reduce(
            (total, module) => total + module.lessons.length,
            0
        ) || 48;
    const rating = 4.8;
    const reviews = 238;
    const students = 1256;
    const originalPrice = 499;

    const instructors = [
        {
            name: course.instructor || "John Doe",
            role: "Lead Instructor",
            bio: "Expert Python developer with 8+ years of experience in teaching and building real-world applications.",
            rating: 4.9,
            students: 15000,
            courses: 12,
        },
        {
            name: "Jane Smith",
            role: "Mentor & Support",
            bio: "Passionate educator specializing in making complex programming concepts easy to understand.",
            rating: 4.8,
            students: 8500,
            courses: 8,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Back to Courses Link */}
            <div className="bg-[#FFF9E6] py-3">
                <div className="container mx-auto px-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center text-[#226481] hover:text-[#1a4f63] font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Content - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Badges and Rating */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-[#e9ae30] text-white px-4 py-1 text-sm font-semibold hover:bg-[#d19d28]">
                                Best Sell
                            </Badge>
                            <Badge
                                variant="destructive"
                                className="px-4 py-1 text-sm font-semibold"
                            >
                                Hot
                            </Badge>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star
                                            key={star}
                                            className="w-5 h-5 fill-[#e9ae30] text-[#e9ae30]"
                                        />
                                    ))}
                                    <Star className="w-5 h-5 fill-[#e9ae30] text-[#e9ae30]" />
                                </div>
                                <span className="font-semibold text-lg">
                                    {rating}
                                </span>
                                <span className="text-muted-foreground">
                                    ({reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Course Title */}
                        <h1 className="text-4xl font-bold text-foreground leading-tight">
                            {course.title}
                        </h1>

                        {/* Course Description */}
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            এই কোর্সটি তৈরি করা হয়েছে মেশিন লার্নিং ও ডেটা
                            সায়েন্স শেখার পূর্বশর্ত হিসেবে একটি মজবুত পাইথন
                            প্রোগ্রামিং ভিত্তি গড়ে তোলার জন্য। এখানে মূল লক্ষ্য
                            হলো মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং
                            প্রোগ্রামিংয়ের মূল ধারণাগুলো দক্ষতার সাথে আয়ত্ত
                            করা।
                            <br />
                            <br />
                            কোর্সের মাধ্যমে আপনি পাইথনের বেসিক থেকে অ্যাডভান্সড
                            টপিক ধাপে ধাপে হাতে-কলমে শিখবেন। এর মধ্যে থাকছে—
                            ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং,
                            অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন
                            হ্যান্ডলিং, ফাইল হ্যান্ডলিং । এছাড়াও, কোর্সে
                            অন্তর্ভুক্ত থাকবে ১০টি বাস্তবমুখী প্রজেক্ট, যেখানে
                            শেখা কনসেপ্টগুলো ব্যবহার করে আপনি বাস্তব সমস্যার
                            সমাধান করবেন। এর ফলে আপনার প্রোগ্রামিং দক্ষতা শুধু
                            শক্তিশালী হবে না, বরং আত্মবিশ্বাসের সাথে মেশিন
                            লার্নিং শেখার জন্য প্রস্তুতি নিতে পারবেন।
                        </p>

                        {/* Course Thumbnail/Video */}
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-green-500 to-blue-500">
                            {course.thumbnail ? (
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                            src="/placeholder-instructor.jpg"
                                            alt="Study Hacks"
                                            width={400}
                                            height={300}
                                            className="object-contain"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />
                                    </div>
                                    <div className="absolute top-8 left-8 z-10">
                                        <h2 className="text-6xl font-black text-white mb-2">
                                            STUDY
                                            <br />
                                            <span className="text-[#e9ae30]">
                                                HACKS
                                            </span>
                                        </h2>
                                        <p className="text-white text-xl font-semibold">
                                            FOR STUDENTS
                                        </p>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center group"
                                    >
                                        <Play className="w-8 h-8 text-[#226481] ml-1 group-hover:scale-110 transition-transform" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Course Modules */}
                        <div className="bg-card border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Course Curriculum
                                    </h2>
                                </div>
                                {user && user.role === "admin" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditingModules(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit Modules
                                    </Button>
                                )}
                            </div>
                            <p className="text-muted-foreground mb-4">
                                12 Live Classes Plan, 4 Weeks, 10 Modules
                            </p>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {courseModules.map((module, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                    >
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-start gap-4 text-left">
                                                <div className="min-w-[80px] bg-[#226481] text-white px-3 py-1 rounded text-sm font-semibold">
                                                    {module.class}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-base">
                                                        {module.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-24 pr-4">
                                            <div className="space-y-4">
                                                {/* Topics */}
                                                {module.topics.length > 0 && (
                                                    <div>
                                                        <h4 className="font-semibold text-sm mb-2 text-foreground">
                                                            Topics Covered:
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
                                                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
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

                                                {/* Exercises */}
                                                {module.exercises.length >
                                                    0 && (
                                                    <div>
                                                        <h4 className="font-semibold text-sm mb-2 text-foreground">
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
                                                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                                                    >
                                                                        <span className="text-[#e9ae30] font-bold">
                                                                            →
                                                                        </span>
                                                                        <span>
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
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* What You'll Get in This Course */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                What You&apos;ll Get in This Course
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Benefit 1 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            1 Month Intensive Learning Journey
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Step-by-step structured curriculum
                                            designed for beginners but packed
                                            with advanced, real-world concepts.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            12 Live Classes with Industry
                                            Experts
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Learn directly from professionals
                                            and get your questions answered in
                                            real-time.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            10 Hands-on Projects
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Apply what you learn on practical
                                            problems, strengthen your
                                            programming skills, and build
                                            confidence.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 4 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Progress Tracking & Leaderboard
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Keep track of your learning journey
                                            and see where you stand compared to
                                            peers.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 5 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Unlimited Support Sessions
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Stuck while practicing? Get instant
                                            help during live support sessions.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 6 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Exclusive Learner Community
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Network, collaborate, and get
                                            continuous guidance from a
                                            supportive community of learners and
                                            experts.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 7 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Lifetime Access
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Revisit pre-recorded videos,
                                            resources, and class recordings
                                            anytime—forever.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 8 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Mock Interview & Career Guidance
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Prepare for interviews with
                                            real-world tips, resume & LinkedIn
                                            optimization, and guidance for
                                            internships/jobs.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 9 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Shareable Certificate
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Receive an officially verified
                                            certificate upon completion that you
                                            can proudly display on LinkedIn or
                                            your CV.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tools & Technologies */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                Tools & Technologies You will Learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Technology 1 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Advanced Python
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Core programming language for data
                                            science, machine learning, and
                                            real-world projects.
                                        </p>
                                    </div>
                                </div>

                                {/* Technology 2 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Object-Oriented Programming (OOP)
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Master OOP concepts to write modular
                                            and maintainable code.
                                        </p>
                                    </div>
                                </div>

                                {/* Technology 3 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            GitHub
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Version control and collaborative
                                            coding platform to manage your
                                            projects.
                                        </p>
                                    </div>
                                </div>

                                {/* Technology 4 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Jupyter Notebook
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Interactive environment for coding,
                                            visualization, and experimentation.
                                        </p>
                                    </div>
                                </div>

                                {/* Technology 5 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            VS Code
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Powerful code editor for efficient
                                            development and debugging.
                                        </p>
                                    </div>
                                </div>

                                {/* Technology 6 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            APIs
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Learn to work with external services
                                            and integrate data programmatically.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="bg-card border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Projects
                                    </h2>
                                </div>
                                {user && user.role === "admin" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditingProjects(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit Projects
                                    </Button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-foreground font-medium">
                                                {project}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What You'll Need to Get Started */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                What You&apos;ll Need to Get Started
                            </h2>
                            <div className="space-y-4">
                                {/* Requirement 1 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Laptop or Desktop
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            At least 8GB RAM to code smoothly
                                            and run projects.
                                        </p>
                                    </div>
                                </div>

                                {/* Requirement 2 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Stable Internet Connection
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            For live classes, accessing
                                            resources, and online practice.
                                        </p>
                                    </div>
                                </div>

                                {/* Requirement 3 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Curiosity & Commitment
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            A growth mindset, consistent
                                            practice, and the determination to
                                            solve challenges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Who This Course is For */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                Who This Course is For
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Audience 1 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Absolute Beginners
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Students or professionals from a
                                            non-technical background with no
                                            prior coding experience.
                                        </p>
                                    </div>
                                </div>

                                {/* Audience 2 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Career-Oriented Learners
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Those aiming for a career in
                                            freelancing, data science, or web
                                            development.
                                        </p>
                                    </div>
                                </div>

                                {/* Audience 3 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Python Newbies
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Anyone who feels intimidated or
                                            hesitant to start programming.
                                        </p>
                                    </div>
                                </div>

                                {/* Audience 4 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Hands-on Learners
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            People who prefer learning by doing
                                            through practical exercises and
                                            real-world examples.
                                        </p>
                                    </div>
                                </div>

                                {/* Audience 5 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Skill Builders
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Learners who want to strengthen
                                            problem-solving, programming, and
                                            analytical skills.
                                        </p>
                                    </div>
                                </div>

                                {/* Audience 6 */}
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Self-Motivated Individuals
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Those ready to commit, practice
                                            consistently, and grow their coding
                                            confidence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructors and Mentors */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                Instructors and Mentors
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {instructors.map((instructor, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg p-5 hover:shadow-lg transition-shadow"
                                    >
                                        {/* Instructor Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#226481] to-[#e9ae30] flex items-center justify-center text-white font-bold text-2xl shrink-0">
                                                {instructor.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-foreground">
                                                    {instructor.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {instructor.role}
                                                </p>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-[#e9ae30] text-[#e9ae30]" />
                                                    <span className="text-sm font-semibold">
                                                        {instructor.rating}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        Instructor Rating
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Instructor Bio */}
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {instructor.bio}
                                        </p>

                                        {/* Instructor Stats */}
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    Students
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    {instructor.students.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    Courses
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    {instructor.courses}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Frequently Asked Questions (FAQ) */}
                        <div className="bg-card border rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                Frequently Asked Questions (FAQ)
                            </h2>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {/* FAQ 1 */}
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger className="text-left">
                                        Can I download the videos?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            No, the videos are available for
                                            online streaming only, but you can
                                            access them anytime through lifetime
                                            access.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 2 */}
                                <AccordionItem value="faq-2">
                                    <AccordionTrigger className="text-left">
                                        Can I join the course via mobile?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            Yes! You can join the course from
                                            any device—mobile, laptop, or
                                            desktop.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 3 */}
                                <AccordionItem value="faq-3">
                                    <AccordionTrigger className="text-left">
                                        Will I have lifetime access to the
                                        videos?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            Yes, all pre-recorded videos,
                                            resources, and class recordings are
                                            available with lifetime access.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 4 */}
                                <AccordionItem value="faq-4">
                                    <AccordionTrigger className="text-left">
                                        Where will the live classes take place?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            Live classes will be conducted
                                            online, accessible from anywhere
                                            with a stable internet connection.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 5 */}
                                <AccordionItem value="faq-5">
                                    <AccordionTrigger className="text-left">
                                        How will assessments be conducted?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            Assessments will include quizzes,
                                            practice projects, and practical
                                            exercises to evaluate your learning.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 6 */}
                                <AccordionItem value="faq-6">
                                    <AccordionTrigger className="text-left">
                                        Will live classes be recorded?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            Yes, all live classes will be
                                            recorded and made available for
                                            later viewing.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* FAQ 7 */}
                                <AccordionItem value="faq-7">
                                    <AccordionTrigger className="text-left">
                                        Where can I get support if I face issues
                                        while practicing?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">
                                            You can get help through live
                                            support sessions and our exclusive
                                            learner community.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    {/* Right Sidebar - 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border rounded-lg p-6 sticky top-24 space-y-6">
                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-[#226481]">
                                        ${course.price}
                                    </span>
                                    <span className="text-2xl text-muted-foreground line-through">
                                        ${originalPrice}
                                    </span>
                                </div>
                                <Badge className="bg-red-500 text-white hover:bg-red-600">
                                    Save 60%
                                </Badge>
                            </div>

                            {/* Enroll Now Button */}
                            <Button
                                size="lg"
                                className="w-full bg-[#226481] hover:bg-[#1a4f63] text-white font-semibold text-lg py-6"
                            >
                                Enroll Now
                            </Button>

                            {/* Course Stats */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">
                                        Duration
                                    </span>
                                    <span className="font-semibold">
                                        {course.duration || "16 weeks"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">
                                        Students
                                    </span>
                                    <span className="font-semibold">
                                        {students.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">
                                        Lessons
                                    </span>
                                    <span className="font-semibold">
                                        {totalLessons}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">
                                        Projects
                                    </span>
                                    <span className="font-semibold">6</span>
                                </div>
                            </div>

                            {/* Instructor Info */}
                            <div className="pt-4 border-t">
                                <h3 className="font-semibold mb-3">
                                    Your Instructor
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#226481] to-[#e9ae30] flex items-center justify-center text-white font-bold text-xl">
                                        {course.instructor
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {course.instructor}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Senior Developer
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <Star className="w-4 h-4 fill-[#e9ae30] text-[#e9ae30]" />
                                    <span className="text-sm font-semibold">
                                        4.9
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        instructor rating
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Module Editor Modal */}
            {isEditingModules && (
                <CourseModuleEditor
                    modules={courseModules}
                    onSave={handleSaveModules}
                    onCancel={() => setIsEditingModules(false)}
                    isOpen={isEditingModules}
                />
            )}

            {/* Projects Editor Modal */}
            {isEditingProjects && (
                <ProjectsEditor
                    projects={projects}
                    onSave={handleSaveProjects}
                    onCancel={() => setIsEditingProjects(false)}
                    isOpen={isEditingProjects}
                />
            )}
        </div>
    );
}
