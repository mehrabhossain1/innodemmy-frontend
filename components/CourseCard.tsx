import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Clock } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    modules?: number;
    students?: number;
    duration?: string;
}

export default function CourseCard({
    id,
    title,
    description,
    thumbnail,
    modules = 14,
    students = 39,
    duration = "১ দিন বাকি",
}: CourseCardProps) {
    return (
        <div className="bg-card rounded-xl overflow-hidden group transition-all duration-300 ease-out shadow-sm border-2 border-border hover:border-primary">
            <div className="relative overflow-hidden h-48">
                <Image
                    src={
                        thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                    }
                    alt={title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                />
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-destructive text-white px-2 py-1 rounded text-xs font-semibold">
                    ব্যাচ ১৪
                </div>
            </div>

            <div className="p-4 space-y-3">
                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{modules} টি মডিউল</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{students} সিট বাকি</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{duration}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/courses/${id}`}>
                    <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Button */}
                <Link href={`/courses/${id}`}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start px-0 text-sm font-semibold text-foreground hover:text-primary hover:bg-transparent group-hover:gap-2 transition-all"
                    >
                        বিস্তারিত দেখি
                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
