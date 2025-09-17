import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    id: string;
    title: string;
    description: string;
    publishedDate: string;
    image: string;
    category: string;
    author: string;
    readTime: string;
}

export default function BlogCard({
    id,
    title,
    description,
    publishedDate,
    image,
    category,
    author,
    readTime,
}: BlogCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <article className="bg-white dark:bg-slate-800 rounded-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
            {/* Blog Image */}
            <div className="relative overflow-hidden">
                <Link href={`/blogs/${id}`}>
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <div className="absolute top-3 left-3">
                    <Badge
                        variant="secondary"
                        className="bg-white/95 dark:bg-slate-800/95 text-gray-700 dark:text-gray-300 border-0"
                    >
                        {category}
                    </Badge>
                </div>
            </div>

            {/* Blog Content */}
            <div className="p-6 space-y-4">
                {/* Published Date and Read Time */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(publishedDate)}</span>
                    </div>
                    <span>•</span>
                    <span>{readTime} read</span>
                </div>

                {/* Title */}
                <Link href={`/blogs/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Author and Read More */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">by {author}</span>
                    <Link
                        href={`/blogs/${id}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}


//this is emplty