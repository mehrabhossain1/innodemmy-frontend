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
        <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

            <div className="relative bg-card/50 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border-2 border-border hover:border-primary/30 transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 h-full">
                {/* Image Section */}
                <div className="relative overflow-hidden h-48">
                    <Image
                        src={
                            thumbnail ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                        }
                        alt={title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-secondary to-secondary/80 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm">
                        ব্যাচ ১৪
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-md text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold border border-border">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {duration}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-3 lg:space-y-3">
                    {/* Title */}
                    <Link href={`/courses/${id}`}>
                        <h3 className="text-base lg:text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                            {title}
                        </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs pt-2 border-t border-border">
                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                                <BookOpen className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="text-foreground">{modules} মডিউল</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-secondary/10 rounded-md">
                                <Users className="h-3.5 w-3.5 text-secondary" />
                            </div>
                            <span className="text-foreground">{students} সিট</span>
                        </div>
                    </div>

                    {/* Button */}
                    <Link href={`/courses/${id}`}>
                        <Button
                            className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground border-2 border-border hover:border-primary/40 font-semibold rounded-lg transition-all duration-300 group/btn"
                        >
                            View Details
                            <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
