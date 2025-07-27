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
import { Search, Filter, BookOpen, ArrowLeft } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";

const allCourses = [
    // Development Courses
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
        category: "Development",
        difficulty: "Intermediate",
        price: 299,
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
        category: "Data Science",
        difficulty: "Advanced",
        price: 399,
    },
    {
        id: "javascript-fundamentals",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 22",
        rating: 4.6,
        totalReviews: 156,
        title: "JavaScript Fundamentals: From Zero to Hero",
        isLive: false,
        totalJoined: 2100,
        totalLessons: 32,
        totalProjects: 6,
        instructor: "Alex Thompson",
        category: "Development",
        difficulty: "Beginner",
        price: 199,
    },
    {
        id: "devops-aws-docker",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 20",
        rating: 4.6,
        totalReviews: 298,
        title: "DevOps Engineering with AWS and Docker Containers",
        isLive: true,
        totalJoined: 1100,
        totalLessons: 48,
        totalProjects: 10,
        instructor: "James Wilson",
        category: "DevOps",
        difficulty: "Advanced",
        price: 449,
    },
    // Design Courses
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
        category: "Design",
        difficulty: "Intermediate",
        price: 249,
    },
    {
        id: "graphic-design-masterclass",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 5",
        rating: 4.5,
        totalReviews: 89,
        title: "Graphic Design Masterclass: Photoshop to Print",
        isLive: false,
        totalJoined: 450,
        totalLessons: 28,
        totalProjects: 5,
        instructor: "Maria Garcia",
        category: "Design",
        difficulty: "Beginner",
        price: 179,
    },
    // Business Courses
    {
        id: "digital-marketing-strategy",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 18",
        rating: 4.4,
        totalReviews: 203,
        title: "Digital Marketing Strategy and Social Media Management",
        isLive: true,
        totalJoined: 890,
        totalLessons: 35,
        totalProjects: 4,
        instructor: "David Kim",
        category: "Business",
        difficulty: "Intermediate",
        price: 229,
    },
    {
        id: "project-management-agile",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 11",
        rating: 4.3,
        totalReviews: 167,
        title: "Agile Project Management and Scrum Certification",
        isLive: false,
        totalJoined: 650,
        totalLessons: 25,
        totalProjects: 3,
        instructor: "Lisa Chen",
        category: "Business",
        difficulty: "Intermediate",
        price: 199,
    },
    // More Development
    {
        id: "flutter-mobile-development",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 7",
        rating: 4.7,
        totalReviews: 134,
        title: "Flutter Mobile App Development: iOS and Android",
        isLive: true,
        totalJoined: 720,
        totalLessons: 42,
        totalProjects: 7,
        instructor: "Raj Patel",
        category: "Development",
        difficulty: "Intermediate",
        price: 329,
    },
    {
        id: "blockchain-web3-development",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 3",
        rating: 4.8,
        totalReviews: 98,
        title: "Blockchain and Web3 Development with Solidity",
        isLive: false,
        totalJoined: 380,
        totalLessons: 38,
        totalProjects: 9,
        instructor: "Kevin Zhang",
        category: "Development",
        difficulty: "Advanced",
        price: 499,
    },
    // Data Science
    {
        id: "data-analysis-excel-sql",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 16",
        rating: 4.2,
        totalReviews: 245,
        title: "Data Analysis with Excel, SQL, and Power BI",
        isLive: false,
        totalJoined: 1450,
        totalLessons: 30,
        totalProjects: 5,
        instructor: "Anna Kowalski",
        category: "Data Science",
        difficulty: "Beginner",
        price: 149,
    },
    {
        id: "ai-machine-learning-tensorflow",
        image: "https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_1060129-201.jpg?w=1380",
        batchName: "Batch 9",
        rating: 4.9,
        totalReviews: 156,
        title: "AI and Machine Learning with TensorFlow and PyTorch",
        isLive: true,
        totalJoined: 560,
        totalLessons: 55,
        totalProjects: 15,
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
                    return b.rating - a.rating;
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "newest":
                    return b.totalReviews - a.totalReviews; // Using reviews as proxy for newness
                default: // popular
                    return b.totalJoined - a.totalJoined;
            }
        });

        return filtered;
    }, [
        searchTerm,
        selectedCategory,
        selectedDifficulty,
        selectedType,
        sortBy,
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                            <div className="h-6 w-px bg-gray-300" />
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    All Courses
                                </h1>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                            {filteredAndSortedCourses.length} courses found
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search courses or instructors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
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
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popular">
                                    Most Popular
                                </SelectItem>
                                <SelectItem value="rating">
                                    Highest Rated
                                </SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
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
                    <div className="flex flex-wrap gap-2 mt-4">
                        {selectedCategory !== "All" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory("All")}
                            >
                                {selectedCategory} ×
                            </Badge>
                        )}
                        {selectedDifficulty !== "All" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedDifficulty("All")}
                            >
                                {selectedDifficulty} ×
                            </Badge>
                        )}
                        {selectedType !== "All" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedType("All")}
                            >
                                {selectedType} ×
                            </Badge>
                        )}
                        {searchTerm && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSearchTerm("")}
                            >
                                "{searchTerm}" ×
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Course Grid */}
                {filteredAndSortedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                                instructor={course.instructor}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No courses found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search criteria or filters to
                                find more courses.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setSelectedDifficulty("All");
                                    setSelectedType("All");
                                }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Load More Button (for pagination) */}
                {filteredAndSortedCourses.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Courses
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
