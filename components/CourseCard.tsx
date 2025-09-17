import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    BadgeIcon as Certificate,
    Users,
    BookOpen,
    FolderOpen,
    Play,
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
    instructor,
}: CourseCardProps) {
    return (
        <div 
            className="bg-white rounded-2xl overflow-hidden group transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-lg shadow-sm border border-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
            {/* Course Image */}
            <div className="relative overflow-hidden aspect-video">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
                />
                {isLive && (
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 px-3 py-1 text-sm font-medium">
                            <Play className="w-3 h-3 mr-1" />
                            LIVE
                        </Badge>
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-3 py-1 text-sm font-medium"
                    >
                        {batchName}
                    </Badge>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < Math.floor(rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                        {rating}
                    </span>
                    <span className="text-sm text-gray-500">
                        ({totalReviews} reviews)
                    </span>
                </div>

                {/* Title */}
                <Link href={`/courses/${id}`} aria-describedby={`course-${id}-description`}>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                        {title}
                    </h3>
                </Link>

                {/* Instructor and Certificate */}
                {instructor && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">by {instructor}</p>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent text-xs px-3 py-1 h-auto"
                        >
                            <Certificate className="w-3 h-3 mr-1" />
                            Certificate
                        </Button>
                    </div>
                )}

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-t border-indigo-100">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-gray-600">
                            {totalJoined.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-600">
                            {totalLessons}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FolderOpen className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-gray-600">
                            {totalProjects}
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link href={`/courses/${id}`} id={`course-${id}-description`}>
                    <Button className="w-full sm:w-auto sm:ml-auto sm:block transition-all duration-200 ease-out bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        View Details →
                    </Button>
                </Link>
            </div>
        </div>
    );
}
