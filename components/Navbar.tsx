"use client";

import { useState, useEffect } from "react";
import type { FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Menu,
    X,
    LogOut,
    ChevronDown,
    Code,
    Cpu,
    FlaskConical,
    Layers,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthSidebar from "@/components/AuthSidebar";
import {
    COURSE_CATEGORIES,
    getAllCategories,
} from "@/lib/constants/categories";

import logo from "@/assets/Logo.png";

// Map category names to icons
const ClinicalIcon: FC<{ className?: string }> = ({ className }) => (
    <img
        src="/icons/clinical%20Research.png"
        alt="Clinical Research"
        className={className}
    />
);

const ResearchIcon: FC<{ className?: string }> = ({ className }) => (
    <img
        src="/icons/image5.png"
        alt="Research & Writing"
        className={className}
    />
);

const DataScienceIcon: FC<{ className?: string }> = ({ className }) => (
    <img
        src="/icons/Data%20Science%20%26%20AI.png"
        alt="Data Science & AI"
        className={className}
    />
);

const VLSIIcon: FC<{ className?: string }> = ({ className }) => (
    <img src="/icons/vlsi.png" alt="VLSI" className={className} />
);

// Adapter to normalize Lucide icons to a plain ComponentType
const wrapIcon = (Icon: React.ComponentType<{ className?: string }>): React.ComponentType<{ className?: string }> => {
    const WrappedIcon = ({ className }: { className?: string }) => <Icon className={className} />;
    WrappedIcon.displayName = `Wrapped${Icon.displayName || Icon.name || 'Icon'}`;
    return WrappedIcon;
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    [COURSE_CATEGORIES.CLINICAL_RESEARCH]: ClinicalIcon,
    [COURSE_CATEGORIES.PROGRAMMING]: wrapIcon(Code),
    [COURSE_CATEGORIES.DATA_SCIENCE_AI]: DataScienceIcon,
    [COURSE_CATEGORIES.VLSI]: VLSIIcon,
    [COURSE_CATEGORIES.RESEARCH_WRITING]: ResearchIcon,
};

// Map category names to colors
const categoryColors: Record<string, string> = {
    [COURSE_CATEGORIES.CLINICAL_RESEARCH]: "text-green-500",
    [COURSE_CATEGORIES.PROGRAMMING]: "text-blue-500",
    [COURSE_CATEGORIES.DATA_SCIENCE_AI]: "text-purple-500",
    [COURSE_CATEGORIES.VLSI]: "text-orange-500",
};

interface Course {
    _id: string;
    slug?: string;
    title: string;
    description: string;
    thumbnail?: string;
    category?: string;
}

interface Webinar {
    _id: string;
    slug?: string;
    title: string;
    description: string;
    thumbnail?: string;
}

export default function Navbar() {
    const searchParams = useSearchParams();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthSidebarOpen, setIsAuthSidebarOpen] = useState(false);
    const [authInitialView, setAuthInitialView] = useState<
        "login" | "register"
    >("login");
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMasterclassOpen, setIsMasterclassOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [coursesCloseTimeout, setCoursesCloseTimeout] =
        useState<NodeJS.Timeout | null>(null);
    const [moreCloseTimeout, setMoreCloseTimeout] =
        useState<NodeJS.Timeout | null>(null);
    const [masterclassCloseTimeout, setMasterclassCloseTimeout] =
        useState<NodeJS.Timeout | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{
        courses: Course[];
        webinars: Webinar[];
    }>({ courses: [], webinars: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const { user, logout } = useAuth();

    // Handle auth query parameter from enrollment success
    useEffect(() => {
        const authParam = searchParams.get("auth");
        if (authParam === "login" || authParam === "signup") {
            setAuthInitialView(authParam === "login" ? "login" : "register");
            setIsAuthSidebarOpen(true);
            // Clean up URL without reloading
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, [searchParams]);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses");
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    // Search functionality
    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsSearching(true);
                try {
                    // Search courses
                    const coursesResponse = await fetch(
                        `/api/courses?search=${encodeURIComponent(searchQuery)}`
                    );
                    const coursesData = coursesResponse.ok
                        ? await coursesResponse.json()
                        : { courses: [] };

                    // Search webinars
                    const webinarsResponse = await fetch(
                        `/api/webinar?search=${encodeURIComponent(searchQuery)}`
                    );
                    const webinarsData = webinarsResponse.ok
                        ? await webinarsResponse.json()
                        : { webinars: [] };

                    // Filter results locally if API doesn't support search
                    const filteredCourses = coursesData.courses.filter(
                        (course: Course) =>
                            course.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            course.description
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                    );

                    const filteredWebinars = Array.isArray(
                        webinarsData.webinars
                    )
                        ? webinarsData.webinars.filter(
                              (webinar: Webinar) =>
                                  webinar.title
                                      ?.toLowerCase()
                                      .includes(searchQuery.toLowerCase()) ||
                                  webinar.description
                                      ?.toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                          )
                        : [];

                    setSearchResults({
                        courses: filteredCourses.slice(0, 5),
                        webinars: filteredWebinars.slice(0, 3),
                    });
                    setShowSearchResults(true);
                } catch (error) {
                    console.error("Error searching:", error);
                    setSearchResults({ courses: [], webinars: [] });
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults({ courses: [], webinars: [] });
                setShowSearchResults(false);
            }
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    // Build dynamic categories with course counts
    const courseCategories = getAllCategories()
        .map((category) => {
            const categoryCoursesCount = courses.filter(
                (c) => c.category === category
            ).length;
            return {
                id: category,
                name: category,
                icon: categoryIcons[category] || wrapIcon(Code),
                count: `${categoryCoursesCount} ${
                    categoryCoursesCount === 1 ? "Course" : "Courses"
                }`,
                color: categoryColors[category] || "text-gray-500",
                courses: courses.filter((c) => c.category === category), // Show all courses, not limited to 3
            };
        })
        .filter((cat) => cat.courses.length > 0); // Only show categories with courses

    return (
        <nav className="bg-white dark:bg-background shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={logo}
                                alt="InnoDemmy Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {/* Courses Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (coursesCloseTimeout) {
                                    clearTimeout(coursesCloseTimeout);
                                    setCoursesCloseTimeout(null);
                                }
                                setIsCoursesOpen(true);
                            }}
                            onMouseLeave={() => {
                                const timeout = setTimeout(() => {
                                    setIsCoursesOpen(false);
                                }, 300);
                                setCoursesCloseTimeout(timeout);
                            }}
                        >
                            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20">
                                All Courses
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        isCoursesOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Mega Menu Dropdown */}
                            {isCoursesOpen && (
                                <div className="absolute left-0 top-full mt-1 w-[900px] bg-white dark:bg-card rounded-lg shadow-xl border border-gray-200 dark:border-border p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Left: Categories */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-4 px-2">
                                                Course Categories
                                            </h3>
                                            <div className="space-y-1">
                                                {courseCategories.map(
                                                    (category) => (
                                                        <div
                                                            key={category.id}
                                                            onMouseEnter={() =>
                                                                setHoveredCategory(
                                                                    category.id
                                                                )
                                                            }
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group cursor-pointer"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <div className="w-10 h-10 bg-gray-100 dark:bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                                    <category.icon
                                                                        className={`h-5 w-5 ${category.color}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-muted-foreground">
                                                                    {
                                                                        category.count
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Right: Courses from Hovered Category */}
                                        <div className="border-l border-gray-200 dark:border-border pl-6 flex flex-col">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-4">
                                                {hoveredCategory
                                                    ? `${hoveredCategory} Courses`
                                                    : "Courses"}
                                            </h3>
                                            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin">
                                                {(() => {
                                                    const category =
                                                        courseCategories.find(
                                                            (c) =>
                                                                c.id ===
                                                                hoveredCategory
                                                        );
                                                    const coursesToShow =
                                                        category?.courses ||
                                                        courseCategories[0]
                                                            ?.courses ||
                                                        [];

                                                    if (
                                                        coursesToShow.length ===
                                                        0
                                                    ) {
                                                        return (
                                                            <div className="text-center py-8 text-muted-foreground text-sm">
                                                                No courses
                                                                available
                                                            </div>
                                                        );
                                                    }

                                                    return coursesToShow.map(
                                                        (course) => {
                                                            // Use slug for URL if available, otherwise fall back to id
                                                            const courseUrl =
                                                                course.slug
                                                                    ? `/courses/${course.slug}`
                                                                    : `/courses/${course._id}`;
                                                            return (
                                                                <Link
                                                                    key={
                                                                        course._id
                                                                    }
                                                                    href={
                                                                        courseUrl
                                                                    }
                                                                    className="flex gap-3 p-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                                                                >
                                                                    {course.thumbnail && (
                                                                        <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-muted">
                                                                            <Image
                                                                                src={
                                                                                    course.thumbnail
                                                                                }
                                                                                alt={
                                                                                    course.title
                                                                                }
                                                                                width={
                                                                                    240
                                                                                }
                                                                                height={
                                                                                    160
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                                quality={
                                                                                    95
                                                                                }
                                                                                priority={
                                                                                    false
                                                                                }
                                                                                unoptimized
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex-1 min-w-0 flex items-center">
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                                            {
                                                                                course.title
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        }
                                                    );
                                                })()}
                                            </div>

                                            {/* View All Button */}
                                            <Link
                                                href="/courses"
                                                className="mt-4 block w-full"
                                            >
                                                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-sm">
                                                    View All Courses
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Masterclass Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (masterclassCloseTimeout) {
                                    clearTimeout(masterclassCloseTimeout);
                                    setMasterclassCloseTimeout(null);
                                }
                                setIsMasterclassOpen(true);
                            }}
                            onMouseLeave={() => {
                                const timeout = setTimeout(() => {
                                    setIsMasterclassOpen(false);
                                }, 300);
                                setMasterclassCloseTimeout(timeout);
                            }}
                        >
                            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20">
                                Free Masterclass
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        isMasterclassOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isMasterclassOpen && (
                                <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-card rounded-lg shadow-xl border border-gray-200 dark:border-border py-1">
                                    <Link
                                        href="/upcoming-webinar"
                                        className="flex items-center px-3 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
                                    >
                                        Upcoming Masterclass
                                    </Link>
                                    <Link
                                        href="/webinar"
                                        className="flex items-center px-3 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
                                    >
                                        Previous Masterclass
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* More Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (moreCloseTimeout) {
                                    clearTimeout(moreCloseTimeout);
                                    setMoreCloseTimeout(null);
                                }
                                setIsMoreOpen(true);
                            }}
                            onMouseLeave={() => {
                                const timeout = setTimeout(() => {
                                    setIsMoreOpen(false);
                                }, 300);
                                setMoreCloseTimeout(timeout);
                            }}
                        >
                            <button className="cursor-pointer flex items-center gap-1 px-4 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20">
                                More
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        isMoreOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isMoreOpen && (
                                <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-card rounded-lg shadow-xl border border-gray-200 dark:border-border py-1">
                                    <Link
                                        href="/blogs"
                                        className="flex items-center px-3 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
                                    >
                                        Blogs
                                    </Link>
                                    <Link
                                        href="/career"
                                        className="flex items-center px-3 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
                                    >
                                        Career
                                    </Link>
                                    <Link
                                        href="/aboutus"
                                        className="flex items-center px-3 py-2 text-base font-semibold text-gray-700 dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {/* Search Bar */}
                        <div className="relative w-64">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 pr-8 h-9 bg-gray-50 dark:bg-muted border-gray-200 dark:border-border focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() =>
                                    searchQuery.length >= 2 &&
                                    setShowSearchResults(true)
                                }
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowSearchResults(false),
                                        200
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setSearchQuery("");
                                        setShowSearchResults(false);
                                        e.currentTarget.blur();
                                    }
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setShowSearchResults(false);
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}

                            {/* Search Results Dropdown */}
                            {showSearchResults && searchQuery.length >= 2 && (
                                <div className="absolute top-full mt-2 w-[500px] bg-white dark:bg-card rounded-lg shadow-xl border border-gray-200 dark:border-border max-h-[500px] overflow-y-auto z-50">
                                    {isSearching ? (
                                        <div className="p-4 space-y-3">
                                            {/* Loading Skeleton */}
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="flex gap-3 p-2 animate-pulse"
                                                >
                                                    <div className="flex-shrink-0 w-16 h-12 rounded bg-gray-200 dark:bg-muted" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-200 dark:bg-muted rounded w-3/4" />
                                                        <div className="h-3 bg-gray-200 dark:bg-muted rounded w-1/2" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {/* Courses Results */}
                                            {searchResults.courses.length >
                                                0 && (
                                                <div className="p-3">
                                                    <div className="flex items-center justify-between mb-2 px-2">
                                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground">
                                                            Courses
                                                        </h3>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                searchResults
                                                                    .courses
                                                                    .length
                                                            }{" "}
                                                            {searchResults
                                                                .courses
                                                                .length === 1
                                                                ? "result"
                                                                : "results"}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {searchResults.courses.map(
                                                            (course) => (
                                                                <Link
                                                                    key={
                                                                        course._id
                                                                    }
                                                                    href={
                                                                        course.slug
                                                                            ? `/courses/${course.slug}`
                                                                            : `/courses/${course._id}`
                                                                    }
                                                                    className="flex gap-3 p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                                    onClick={() =>
                                                                        setSearchQuery(
                                                                            ""
                                                                        )
                                                                    }
                                                                >
                                                                    {course.thumbnail && (
                                                                        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden bg-gray-100 dark:bg-muted">
                                                                            <Image
                                                                                src={
                                                                                    course.thumbnail
                                                                                }
                                                                                alt={
                                                                                    course.title
                                                                                }
                                                                                width={
                                                                                    128
                                                                                }
                                                                                height={
                                                                                    96
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                                quality={
                                                                                    95
                                                                                }
                                                                                unoptimized
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-foreground line-clamp-1">
                                                                            {
                                                                                course.title
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Webinars Results */}
                                            {searchResults.webinars.length >
                                                0 && (
                                                <div className="p-3 border-t border-gray-200 dark:border-border">
                                                    <div className="flex items-center justify-between mb-2 px-2">
                                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground">
                                                            Webinars
                                                        </h3>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                searchResults
                                                                    .webinars
                                                                    .length
                                                            }{" "}
                                                            {searchResults
                                                                .webinars
                                                                .length === 1
                                                                ? "result"
                                                                : "results"}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {searchResults.webinars.map(
                                                            (webinar) => (
                                                                <Link
                                                                    key={
                                                                        webinar._id
                                                                    }
                                                                    href={`/webinar/${
                                                                        webinar.slug ||
                                                                        webinar._id
                                                                    }`}
                                                                    className="flex gap-3 p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                                    onClick={() =>
                                                                        setSearchQuery(
                                                                            ""
                                                                        )
                                                                    }
                                                                >
                                                                    {webinar.thumbnail && (
                                                                        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden bg-gray-100 dark:bg-muted">
                                                                            <Image
                                                                                src={
                                                                                    webinar.thumbnail
                                                                                }
                                                                                alt={
                                                                                    webinar.title
                                                                                }
                                                                                width={
                                                                                    128
                                                                                }
                                                                                height={
                                                                                    96
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                                quality={
                                                                                    95
                                                                                }
                                                                                unoptimized
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-foreground line-clamp-1">
                                                                            {
                                                                                webinar.title
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* No Results */}
                                            {searchResults.courses.length ===
                                                0 &&
                                                searchResults.webinars
                                                    .length === 0 && (
                                                    <div className="p-8 text-center">
                                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-muted mb-3">
                                                            <Search
                                                                className="text-gray-400"
                                                                size={24}
                                                            />
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-foreground mb-1">
                                                            No results found
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Try searching with
                                                            different keywords
                                                        </div>
                                                    </div>
                                                )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <ThemeToggle />

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-2 text-gray-700 dark:text-foreground hover:text-primary"
                                    >
                                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium">
                                            {user.name}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                        Role:{" "}
                                        <span className="font-medium text-foreground">
                                            {user.role}
                                        </span>
                                    </div>
                                    <DropdownMenuItem>
                                        <Link
                                            href={
                                                user.role === "admin"
                                                    ? "/admin/dashboard"
                                                    : "/dashboard"
                                            }
                                            className="w-full"
                                        >
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="text-red-600"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setAuthInitialView("login");
                                        setIsAuthSidebarOpen(true);
                                    }}
                                    className="text-base font-semibold text-gray-700 dark:text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => {
                                        setAuthInitialView("register");
                                        setIsAuthSidebarOpen(true);
                                    }}
                                    className="text-base font-semibold bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-background border-t border-gray-200 dark:border-border">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {/* Search */}
                        <div className="relative mb-3">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 pr-8 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Mobile Search Results */}
                        {searchQuery.length >= 2 && (
                            <div className="mb-3 max-h-[300px] overflow-y-auto">
                                {isSearching ? (
                                    <div className="space-y-2 px-2">
                                        {/* Loading Skeleton */}
                                        {[1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 p-2 animate-pulse"
                                            >
                                                <div className="flex-shrink-0 w-16 h-12 rounded bg-gray-200 dark:bg-muted" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 dark:bg-muted rounded w-3/4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {/* Courses Results */}
                                        {searchResults.courses.length > 0 && (
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between px-3 mb-2">
                                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase">
                                                        Courses
                                                    </h3>
                                                    <span className="text-xs text-muted-foreground">
                                                        {
                                                            searchResults
                                                                .courses.length
                                                        }
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    {searchResults.courses.map(
                                                        (course) => (
                                                            <Link
                                                                key={course._id}
                                                                href={
                                                                    course.slug
                                                                        ? `/courses/${course.slug}`
                                                                        : `/courses/${course._id}`
                                                                }
                                                                className="flex gap-3 p-2 mx-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                                onClick={() => {
                                                                    setSearchQuery(
                                                                        ""
                                                                    );
                                                                    setIsMobileMenuOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {course.thumbnail && (
                                                                    <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden bg-gray-100 dark:bg-muted">
                                                                        <Image
                                                                            src={
                                                                                course.thumbnail
                                                                            }
                                                                            alt={
                                                                                course.title
                                                                            }
                                                                            width={
                                                                                128
                                                                            }
                                                                            height={
                                                                                96
                                                                            }
                                                                            className="w-full h-full object-cover"
                                                                            quality={
                                                                                95
                                                                            }
                                                                            unoptimized
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground line-clamp-1">
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Webinars Results */}
                                        {searchResults.webinars.length > 0 && (
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between px-3 mb-2">
                                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase">
                                                        Webinars
                                                    </h3>
                                                    <span className="text-xs text-muted-foreground">
                                                        {
                                                            searchResults
                                                                .webinars.length
                                                        }
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    {searchResults.webinars.map(
                                                        (webinar) => (
                                                            <Link
                                                                key={
                                                                    webinar._id
                                                                }
                                                                href={`/webinar/${
                                                                    webinar.slug ||
                                                                    webinar._id
                                                                }`}
                                                                className="flex gap-3 p-2 mx-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                                                onClick={() => {
                                                                    setSearchQuery(
                                                                        ""
                                                                    );
                                                                    setIsMobileMenuOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {webinar.thumbnail && (
                                                                    <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden bg-gray-100 dark:bg-muted">
                                                                        <Image
                                                                            src={
                                                                                webinar.thumbnail
                                                                            }
                                                                            alt={
                                                                                webinar.title
                                                                            }
                                                                            width={
                                                                                128
                                                                            }
                                                                            height={
                                                                                96
                                                                            }
                                                                            className="w-full h-full object-cover"
                                                                            quality={
                                                                                95
                                                                            }
                                                                            unoptimized
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground line-clamp-1">
                                                                        {
                                                                            webinar.title
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* No Results */}
                                        {searchResults.courses.length === 0 &&
                                            searchResults.webinars.length ===
                                                0 && (
                                                <div className="p-6 text-center">
                                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-muted mb-2">
                                                        <Search
                                                            className="text-gray-400"
                                                            size={20}
                                                        />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground mb-1">
                                                        No results found
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Try different keywords
                                                    </div>
                                                </div>
                                            )}
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-3 px-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Theme
                            </span>
                            <ThemeToggle />
                        </div>

                        <Link
                            href="/courses"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-semibold transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            All Courses
                        </Link>
                        <Link
                            href="/webinar"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-semibold transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Free Webinar
                        </Link>

                        {/* More section in mobile */}
                        <div className="border-t border-gray-200 dark:border-border pt-2 mt-2">
                            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">
                                More
                            </div>
                            <Link
                                href="/blogs"
                                className="block text-foreground hover:text-primary px-3 py-2 text-base font-semibold transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blogs
                            </Link>
                            <Link
                                href="/career"
                                className="block text-foreground hover:text-primary px-3 py-2 text-base font-semibold transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Career
                            </Link>
                            <Link
                                href="/aboutus"
                                className="block text-foreground hover:text-primary px-3 py-2 text-base font-semibold transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                        </div>

                        {user ? (
                            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3 space-y-2">
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    Logged in as:{" "}
                                    <span className="font-semibold text-foreground">
                                        {user.name}
                                    </span>
                                </div>
                                <div className="px-3 py-1 text-xs text-muted-foreground uppercase">
                                    Role: {user.role}
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Link
                                        href={
                                            user.role === "admin"
                                                ? "/admin/dashboard"
                                                : "/dashboard"
                                        }
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full text-red-600"
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full font-semibold"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setAuthInitialView("login");
                                        setIsAuthSidebarOpen(true);
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="w-full font-semibold bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setAuthInitialView("register");
                                        setIsAuthSidebarOpen(true);
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Auth Sidebar */}
            <AuthSidebar
                isOpen={isAuthSidebarOpen}
                onClose={() => setIsAuthSidebarOpen(false)}
                initialView={authInitialView}
            />
        </nav>
    );
}
