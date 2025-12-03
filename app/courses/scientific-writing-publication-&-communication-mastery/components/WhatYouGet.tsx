"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "1 Month Industry-Caliber Writing & Publication Journey",
            description:
                "High-performance writing drills, real manuscript examples, and guided practice.",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "8 Live Classes with Published Authors & Journal Experts",
            description: "Q1/Q2 journal contributors থেকে direct mentorship",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Support Sessions",
            description:
                "Your manuscript drafts, abstracts, literature reviews, live review ও correction",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Community Access",
            description:
                "Writers' circle + peer-review network + accountability ecosystem",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career Guidance",
            description:
                "Academic research track, publishing consultant roles, clinical communication careers, সব কিছুর roadmap",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "Internationally recognized certificate LinkedIn profile ও CV enhancement guaranteed",
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
