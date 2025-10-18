import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    Users,
    BookOpen,
    FolderOpen,
    FileText,
    Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
    id: string;
    image: string;
    batchName: string;
    rating: number;
    totalReviews: number;
    title: string;
    isLive: boolean;
    totalJoined: number;
    totalLessons: number;
    totalProjects: number;
    totalAssignments: number;
    instructor?: string;
}

export default function CourseCard({
    id,
    image,
    batchName,
    rating,
    totalReviews,
    title,
    isLive,
    totalJoined,
    totalLessons,
    totalProjects,
    totalAssignments,
    instructor,
}: CourseCardProps) {
    return (
        <div
            className="bg-card rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl shadow-md border border-border"
        >
            {/* Course Image - Reduced height */}
            <div className="relative overflow-hidden h-44">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={176}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                {/* Batch Badge - Top Left */}
                <div className="absolute top-3 left-3">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3 py-1 text-xs font-semibold rounded-md">
                        {batchName}
                    </Badge>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-4 space-y-3 min-h-[280px] flex flex-col">
                {/* Rating - Top Right aligned */}
                <div className="flex items-center justify-between">
                    <div></div>
                    <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                        i < Math.floor(rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300 fill-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-foreground ml-1">
                            {rating} ({totalReviews})
                        </span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/courses/${id}`} aria-describedby={`course-${id}-description`}>
                    <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                        {title}
                    </h3>
                </Link>

                {/* Live Class Indicator */}
                {isLive && (
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                        <span className="text-sm text-foreground">Live class</span>
                    </div>
                )}

                {/* Certificate Badge */}
                {instructor && (
                    <div className="flex items-center justify-between py-1">
                        <p className="text-xs text-muted-foreground">by {instructor}</p>
                        <div className="flex items-center space-x-1 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md text-xs font-medium">
                            <Award className="w-3 h-3" />
                            <span>Certificate</span>
                        </div>
                    </div>
                )}

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 flex-grow">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground font-medium">
                            {totalJoined} Joined
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground font-medium">
                            {totalLessons}+ Lessons
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FolderOpen className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground font-medium">
                            {totalProjects}+ Projects
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground font-medium">
                            {totalAssignments}+ Assignments
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link href={`/courses/${id}`} id={`course-${id}-description`}>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm h-10 rounded-md transition-all duration-200 ease-out mt-2">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
