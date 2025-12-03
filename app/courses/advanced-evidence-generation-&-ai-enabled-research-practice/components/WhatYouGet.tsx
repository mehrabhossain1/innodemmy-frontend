"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "1 Month High-Tech, High-Depth Learning Journey",
            description:
                "Traditional + AI-powered research workflow in a unified applied curriculum",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "8 Live Classes",
            description:
                "Meta-analysis specialists, RWE analysts, এবং AI scientists থেকে hands-on mentorship",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Support Sessions",
            description:
                "Your SR/MA drafts, AI workflows, search strategies—live optimization ও expert guidance",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Community Access",
            description:
                "An elite circle of evidence scientists, AI-focused researchers, and global collaborators",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career Guidance",
            description:
                "CRO evidence teams, RWE analysts, HEOR pathways, pharmacoepidemiology—সব কিছুর tailored roadmap",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "Industry-recognized certificate—AI-enabled evidence skills showcase করার জন্য perfect",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="What You will Get in This Course" />

            {/* Grid Layout - More Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-5 text-center hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gray-700"
                        >
                            {/* Image */}
                            <div className="flex justify-center mb-3">
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 leading-tight">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
