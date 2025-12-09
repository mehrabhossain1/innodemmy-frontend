"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    Calendar,
    Clock,
    Eye,
    User,
    ArrowLeft,
    Play,
    X,
    Code,
    Cpu,
    FlaskConical,
    Layers,
} from "lucide-react";
import { getAllWebinars } from "@/lib/data/webinars";
import { Webinar } from "@/lib/models";
import Container from "@/components/Container";
import {
    COURSE_CATEGORIES,
    getAllCategories,
} from "@/lib/constants/categories";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

// Map category names to icons
const categoryIcons: Record<string, typeof Code> = {
    [COURSE_CATEGORIES.CLINICAL_RESEARCH]: FlaskConical,
    [COURSE_CATEGORIES.PROGRAMMING]: Code,
    [COURSE_CATEGORIES.DATA_SCIENCE_AI]: Cpu,
    [COURSE_CATEGORIES.VLSI]: Layers,
};

const ITEMS_PER_PAGE = 9;

export default function WebinarPage() {
    const topRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const allWebinars = getAllWebinars();

    // Build dynamic categories with counts
    const categories = useMemo(() => {
        const allCategories = getAllCategories();
        const categoryCounts: Record<string, number> = {};

        // Count webinars per category
        allWebinars.forEach((webinar) => {
            if (webinar.category) {
                categoryCounts[webinar.category] =
                    (categoryCounts[webinar.category] || 0) + 1;
            }
        });

        // Build category tabs
        const tabs = [
            {
                id: "all",
                label: "All Webinars",
                icon: Code,
                count: `${allWebinars.length} Webinars`,
            },
        ];

        // Add each category from constants
        allCategories.forEach((category) => {
            const count = categoryCounts[category] || 0;
            if (count > 0) {
                // Only show categories with webinars
                tabs.push({
                    id: category,
                    label: category,
                    icon: categoryIcons[category] || Code,
                    count: `${count} ${count === 1 ? "Webinar" : "Webinars"}`,
                });
            }
        });

        return tabs;
    }, [allWebinars]);

    const filteredWebinars = useMemo(() => {
        return allWebinars.filter((webinar) => {
            const matchesSearch =
                webinar.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                webinar.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                webinar.topics.some((topic) =>
                    topic.toLowerCase().includes(searchTerm.toLowerCase())
                );
            const matchesCategory =
                activeCategory === "all" || webinar.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allWebinars, searchTerm, activeCategory]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredWebinars.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedWebinars = filteredWebinars.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    // Scroll to top when page changes
    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [currentPage]);

    return (
        <div ref={topRef} className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="hover:bg-primary/10"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Home
                                </Button>
                            </Link>
                            <div className="h-8 w-px bg-border" />
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Free Webinars
                                </h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Learn from industry experts - completely
                                    free
                                </p>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-sm px-4 py-2">
                            {filteredWebinars.length} Available
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <Container className="py-12">
                <div className="relative mb-8">
                    <div className="flex justify-center items-center overflow-x-auto pb-3 scrollbar-hide">
                        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                                        activeCategory === category.id
                                            ? "bg-primary border-primary text-white shadow-md"
                                            : "bg-white dark:bg-card border-gray-200 dark:border-border hover:border-primary text-foreground hover:bg-gray-50 dark:hover:bg-accent"
                                    }`}
                                >
                                    <category.icon className="h-4 w-4" />
                                    <div className="text-left">
                                        <div className="text-sm font-semibold whitespace-nowrap">
                                            {category.label}
                                        </div>
                                        {category.count && (
                                            <div
                                                className={`text-xs ${
                                                    activeCategory ===
                                                    category.id
                                                        ? "text-white/80"
                                                        : "text-muted-foreground"
                                                }`}
                                            >
                                                {category.count}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Webinars Grid */}
                {filteredWebinars.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedWebinars.map((webinar) => (
                                <WebinarCard
                                    key={webinar.id}
                                    webinar={webinar}
                                />
                            ))}
                        </div>
                        <div className="mt-8">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(1, prev - 1)
                                                )
                                            }
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                onClick={() =>
                                                    setCurrentPage(i + 1)
                                                }
                                                isActive={currentPage === i + 1}
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        totalPages,
                                                        prev + 1
                                                    )
                                                )
                                            }
                                            className={
                                                currentPage === totalPages
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-foreground mb-4">
                                No webinars found
                            </h3>
                            <p className="text-gray-600 dark:text-muted-foreground mb-6 leading-relaxed">
                                Try adjusting your search criteria to find more
                                webinars.
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("all");
                                }}
                                className="px-8 py-3"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                )}
            </Container>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Want to Learn More?
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                            Explore our full courses and take your skills to the
                            next level with comprehensive learning programs.
                        </p>
                        <Link href="/courses">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                            >
                                Browse All Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
    return (
        <Link href={`/webinar/${webinar.id}`}>
            <Card className="group relative bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full">
                <div className="relative">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <Image
                            src={webinar.image}
                            alt={webinar.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                            FREE
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {webinar.duration}
                        </div>
                    </div>
                </div>

                <CardContent className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                        {webinar.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                        {webinar.instructorImage && (
                            <Image
                                src={webinar.instructorImage}
                                alt={webinar.instructor}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                                {webinar.instructor}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Instructor
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{webinar.views.toLocaleString()} views</span>
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                        {webinar.topics.slice(0, 3).map((topic, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
                            >
                                {topic}
                            </span>
                        ))}
                        {webinar.topics.length > 3 && (
                            <span className="text-xs bg-gray-100 dark:bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                                +{webinar.topics.length - 3} more
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
