"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    BookOpen,
    ArrowLeft,
    X,
    TrendingUp,
    Star,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";

interface Course {
    id: string;
    image: string;
    batchName?: string;
    rating?: number;
    totalReviews?: number;
    title: string;
    isLive?: boolean;
    totalJoined?: number;
    totalLessons: number;
    totalProjects?: number;
    totalAssignments?: number;
    instructor: string;
    category: string;
    difficulty: string;
    price: number;
}

const fallbackCourses: Course[] = [
    // Development Courses
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
        category: "Development",
        difficulty: "Intermediate",
        price: 299,
    },
    {
        id: "python-data-science-ml",
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
        category: "Data Science",
        difficulty: "Advanced",
        price: 399,
    },
    {
        id: "javascript-fundamentals",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 22",
        rating: 4.6,
        totalReviews: 156,
        title: "JavaScript Fundamentals: From Zero to Hero",
        isLive: false,
        totalJoined: 2100,
        totalLessons: 32,
        totalProjects: 6,
        totalAssignments: 8,
        instructor: "Alex Thompson",
        category: "Development",
        difficulty: "Beginner",
        price: 199,
    },
    {
        id: "devops-aws-docker",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 20",
        rating: 4.6,
        totalReviews: 298,
        title: "DevOps Engineering with AWS and Docker Containers",
        isLive: true,
        totalJoined: 1100,
        totalLessons: 48,
        totalProjects: 10,
        totalAssignments: 12,
        instructor: "James Wilson",
        category: "DevOps",
        difficulty: "Advanced",
        price: 449,
    },
    // Design Courses
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
        category: "Design",
        difficulty: "Intermediate",
        price: 249,
    },
    {
        id: "graphic-design-masterclass",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 5",
        rating: 4.5,
        totalReviews: 89,
        title: "Graphic Design Masterclass: Photoshop to Print",
        isLive: false,
        totalJoined: 450,
        totalLessons: 28,
        totalProjects: 5,
        totalAssignments: 5,
        instructor: "Maria Garcia",
        category: "Design",
        difficulty: "Beginner",
        price: 179,
    },
    // Business Courses
    {
        id: "digital-marketing-strategy",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 18",
        rating: 4.4,
        totalReviews: 203,
        title: "Digital Marketing Strategy and Social Media Management",
        isLive: true,
        totalJoined: 890,
        totalLessons: 35,
        totalProjects: 4,
        totalAssignments: 7,
        instructor: "David Kim",
        category: "Business",
        difficulty: "Intermediate",
        price: 229,
    },
    {
        id: "project-management-agile",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 11",
        rating: 4.3,
        totalReviews: 167,
        title: "Agile Project Management and Scrum Certification",
        isLive: false,
        totalJoined: 650,
        totalLessons: 25,
        totalProjects: 3,
        totalAssignments: 5,
        instructor: "Lisa Chen",
        category: "Business",
        difficulty: "Intermediate",
        price: 199,
    },
    // More Development
    {
        id: "flutter-mobile-development",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 7",
        rating: 4.7,
        totalReviews: 134,
        title: "Flutter Mobile App Development: iOS and Android",
        isLive: true,
        totalJoined: 720,
        totalLessons: 42,
        totalProjects: 7,
        totalAssignments: 9,
        instructor: "Raj Patel",
        category: "Development",
        difficulty: "Intermediate",
        price: 329,
    },
    {
        id: "blockchain-web3-development",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 3",
        rating: 4.8,
        totalReviews: 98,
        title: "Blockchain and Web3 Development with Solidity",
        isLive: false,
        totalJoined: 380,
        totalLessons: 38,
        totalProjects: 9,
        totalAssignments: 11,
        instructor: "Kevin Zhang",
        category: "Development",
        difficulty: "Advanced",
        price: 499,
    },
    // Data Science
    {
        id: "data-analysis-excel-sql",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 16",
        rating: 4.2,
        totalReviews: 245,
        title: "Data Analysis with Excel, SQL, and Power BI",
        isLive: false,
        totalJoined: 1450,
        totalLessons: 30,
        totalProjects: 5,
        totalAssignments: 6,
        instructor: "Anna Kowalski",
        category: "Data Science",
        difficulty: "Beginner",
        price: 149,
    },
    {
        id: "ai-machine-learning-tensorflow",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        batchName: "Batch 9",
        rating: 4.9,
        totalReviews: 156,
        title: "AI and Machine Learning with TensorFlow and PyTorch",
        isLive: true,
        totalJoined: 560,
        totalLessons: 55,
        totalProjects: 15,
        totalAssignments: 18,
        instructor: "Dr. Robert Kim",
        category: "Data Science",
        difficulty: "Advanced",
        price: 549,
    },
];

const categories = [
    "All",
    "Development",
    "Design",
    "Business",
    "Data Science",
    "DevOps",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const courseTypes = ["All", "Live", "Recorded"];

export default function AllCoursesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [sortBy, setSortBy] = useState("popular");
    const [allCourses] = useState<Course[]>(fallbackCourses);
    const [loading] = useState(false);

    const filteredAndSortedCourses = useMemo(() => {
        const filtered = allCourses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                course.category === selectedCategory;
            const matchesDifficulty =
                selectedDifficulty === "All" ||
                course.difficulty === selectedDifficulty;
            const matchesType =
                selectedType === "All" ||
                (selectedType === "Live" && course.isLive) ||
                (selectedType === "Recorded" && !course.isLive);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDifficulty &&
                matchesType
            );
        });

        // Sort courses
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return (b.rating || 0) - (a.rating || 0);
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "newest":
                    return (b.totalReviews || 0) - (a.totalReviews || 0); // Using reviews as proxy for newness
                default: // popular
                    return (b.totalJoined || 0) - (a.totalJoined || 0);
            }
        });

        return filtered;
    }, [
        allCourses,
        searchTerm,
        selectedCategory,
        selectedDifficulty,
        selectedType,
        sortBy,
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-8 w-px bg-gray-300" />
                            <div className="flex items-center space-x-3">
                                <BookOpen className="h-8 w-8 text-indigo-600" />
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    All Courses
                                </h1>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 text-sm px-4 py-2">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {filteredAndSortedCourses.length} courses found
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-indigo-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-gradient-to-r from-white to-indigo-50 rounded-2xl shadow-sm border border-indigo-100 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {/* Search */}
                            <div className="lg:col-span-2 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                                <Input
                                    placeholder="Search courses or instructors..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-12 h-12 text-base placeholder:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
                                    aria-label="Search courses"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors duration-200"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger
                                    className="h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
                                    aria-label="Filter by category"
                                >
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Difficulty Filter */}
                            <Select
                                value={selectedDifficulty}
                                onValueChange={setSelectedDifficulty}
                            >
                                <SelectTrigger
                                    className="h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
                                    aria-label="Filter by difficulty"
                                >
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {difficulties.map((difficulty) => (
                                        <SelectItem
                                            key={difficulty}
                                            value={difficulty}
                                        >
                                            {difficulty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Course Type Filter */}
                            <Select
                                value={selectedType}
                                onValueChange={setSelectedType}
                            >
                                <SelectTrigger
                                    className="h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
                                    aria-label="Filter by course type"
                                >
                                    <SelectValue placeholder="Course Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courseTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort By */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger
                                    className="h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200"
                                    aria-label="Sort courses"
                                >
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">
                                        <div className="flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            Most Popular
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="rating">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 mr-2" />
                                            Highest Rated
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="newest">
                                        Newest
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Price: Low to High
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Price: High to Low
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Active Filters */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {selectedCategory !== "All" && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    {selectedCategory} ×
                                </Badge>
                            )}
                            {selectedDifficulty !== "All" && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
                                    onClick={() => setSelectedDifficulty("All")}
                                >
                                    {selectedDifficulty} ×
                                </Badge>
                            )}
                            {selectedType !== "All" && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
                                    onClick={() => setSelectedType("All")}
                                >
                                    {selectedType} ×
                                </Badge>
                            )}
                            {searchTerm && (
                                <Badge
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
                                    onClick={() => setSearchTerm("")}
                                >
                                    "{searchTerm}" ×
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Loading courses...
                            </h3>
                            <p className="text-gray-600">
                                Please wait while we fetch the latest courses
                                for you.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Course Grid */}
                        {filteredAndSortedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredAndSortedCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
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
                                        totalAssignments={
                                            course.totalAssignments
                                        }
                                        instructor={course.instructor}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <Filter className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                        No courses found
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Try adjusting your search criteria or
                                        filters to find more courses.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedCategory("All");
                                            setSelectedDifficulty("All");
                                            setSelectedType("All");
                                        }}
                                        className="px-8 py-3"
                                    >
                                        Clear All Filters
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Load More Button (for pagination) */}
                        {filteredAndSortedCourses.length > 0 && (
                            <div className="text-center mt-16">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-3"
                                >
                                    Load More Courses
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-indigo-100 to-purple-100 border-t border-indigo-200 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <BookOpen className="h-6 w-6 text-indigo-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Innodemy
                            </span>
                        </div>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Empowering learners with world-class technology
                            education. Join thousands of students who have
                            transformed their careers with our courses.
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                            <span>© 2024 Innodemy. All rights reserved.</span>
                            <span>•</span>
                            <span>Trusted by 10,000+ students</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
