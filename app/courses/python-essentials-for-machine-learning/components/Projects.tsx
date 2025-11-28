"use client";
import SectionTitle from "@/components/course/SectionTitle";
import Image from "next/image";

export default function Projects() {
    const projects = [
        {
            number: 1,
            title: "Password Generator",
            image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
        },
        {
            number: 2,
            title: "Number Guessing Game",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
        },
        {
            number: 3,
            title: "Recursive File Search",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        },
        {
            number: 4,
            title: "CSV Data Cleaner & Summarizer",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        },
        {
            number: 5,
            title: "JSON User Profile Builder",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        },
        {
            number: 6,
            title: "File Reader with Missing File Handler",
            image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&q=80",
        },
        {
            number: 7,
            title: "Bank Account System (OOP)",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
        },
        {
            number: 8,
            title: "Tic-Tac-Toe with OOP",
            image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80",
        },
        {
            number: 9,
            title: "Generator for Large File Line Processing",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        },
        {
            number: 10,
            title: "News Headline Scraper",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <SectionTitle title="Projects" />

                {/* Grid Layout - 2 columns on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {projects.map((project, index) => {
                        return (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-950 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 flex items-center p-4"
                            >
                                {/* Content - Left Side (50%) */}
                                <div className="flex-1 w-1/2 pr-4">
                                    {/* Project Number Badge */}
                                    <div className="inline-flex items-center bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm font-bold shadow-lg mb-3">
                                        Project {project.number}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-400 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Image Container - Right Side (50%) */}
                                <div className="relative w-1/2 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/20 z-10"></div>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={280}
                                        height={160}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Decorative gradient border on hover */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 rounded-xl border-2 border-orange-500/50"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
