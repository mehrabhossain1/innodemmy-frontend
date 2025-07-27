import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    BadgeIcon as Certificate,
    Users,
    BookOpen,
    FolderOpen,
    Play,
    ArrowRight,
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
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Course Image */}
            <div className="relative overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isLive && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
                            <Play className="w-3 h-3 mr-1" />
                            LIVE
                        </Badge>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant="secondary"
                        className="bg-white/90 text-gray-700 border-0"
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
                    <span className="text-sm font-medium text-gray-700">
                        {rating}
                    </span>
                    <span className="text-sm text-gray-500">
                        ({totalReviews})
                    </span>
                </div>

                {/* Title */}
                <Link href={`/courses/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
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
                            className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 bg-transparent text-xs px-3 py-1 h-auto"
                        >
                            <Certificate className="w-3 h-3 mr-1" />
                            Certificate
                        </Button>
                    </div>
                )}

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {totalJoined.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {totalLessons} lessons
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FolderOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {totalProjects} projects
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link href={`/courses/${id}`}>
                    <Button className="w-full">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
