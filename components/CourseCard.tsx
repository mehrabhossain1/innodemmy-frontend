import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Video, FolderOpen, Star } from "lucide-react";

interface CourseCardProps {
    id: string;
    slug?: string;
    title: string;
    description: string;
    thumbnail?: string;
    modules?: number;
    students?: number;
    duration?: string;
    batchName?: string;
    rating?: number;
    totalRatings?: number;
}

export default function CourseCard({
    id,
    slug,
    title,
    description,
    thumbnail,
    modules = 60,
    students = 5,
    duration,
    batchName = "Batch-2",
    rating = 4.6,
    totalRatings = 8,
}: CourseCardProps) {
    // Use slug for URL if available, otherwise fall back to id
    const courseUrl = slug ? `/courses/${slug}` : `/courses/${id}`;
    return (
        <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

            <div className="relative bg-card backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 ease-out shadow-md hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative overflow-hidden h-44 flex-shrink-0">
                    <Image
                        src={
                            thumbnail ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                        }
                        alt={title}
                        width={400}
                        height={176}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark Overlay */}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    {/* Batch Badge and Rating */}
                    <div className="flex items-center justify-between">
                        <div className="bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                            {batchName}
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                            i < Math.floor(rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-300 text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-foreground ml-1">
                                {rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                ({totalRatings})
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <Link href={courseUrl}>
                        <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-snug min-h-[2.5rem]">
                            {title}
                        </h3>
                    </Link>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-2 py-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <Video className="h-3.5 w-3.5 text-pink-500" />
                            </div>
                            <span>Live class</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <Award className="h-3.5 w-3.5 text-purple-500" />
                            </div>
                            <span>Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <BookOpen className="h-3.5 w-3.5 text-orange-500" />
                            </div>
                            <span>{modules}+ Lessons</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <FolderOpen className="h-3.5 w-3.5 text-blue-500" />
                            </div>
                            <span>{students}+ Projects</span>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-auto pt-2">
                        <Link href={courseUrl}>
                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
