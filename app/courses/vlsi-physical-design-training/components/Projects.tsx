"use client";
import SectionTitle from "@/components/course/SectionTitle";
import Image from "next/image";

export default function Projects() {
    const projects = [
        {
            number: 1,
            title: "RTL to GDSII SoC Project – Take a Verilog RTL, synthesize, floorplan, place, route, and generate GDSII.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        },
        {
            number: 2,
            title: "Open-Source Tapeout Simulation – Use OpenLANE & SkyWater PDK to generate a complete tapeout-ready GDSII.",
            image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&q=80",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <SectionTitle title="Projects You Will Build" />

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
