import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
}

export default function CourseCard({
    id,
    title,
    description,
    thumbnail,
}: CourseCardProps) {
    return (
        <div className="bg-card rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl shadow-md border border-border">
            <div className="relative overflow-hidden h-48">
                <Image
                    src={
                        thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                    }
                    alt={title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
            </div>

            <div className="p-5 space-y-4 min-h-[200px] flex flex-col">
                <Link
                    href={`/courses/${id}`}
                    aria-describedby={`course-${id}-description`}
                >
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                        {title}
                    </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                    {description}
                </p>

                <Link href={`/courses/${id}`} id={`course-${id}-description`}>
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm h-10 rounded-md transition-all duration-200 ease-out mt-auto">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
