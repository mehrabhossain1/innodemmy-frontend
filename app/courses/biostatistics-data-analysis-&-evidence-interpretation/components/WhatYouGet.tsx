"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "1 Month Intensive Applied Learning Journey",
            description:
                "Real datasets, real clinical scenarios, real interpretation — no theoretical fluff.",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "8 Live Classes with Data & Biostatistics Experts",
            description: "Hands-on walkthroughs with step-by-step execution.",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Support Sessions",
            description:
                "Your datasets, tests, graphs, and analysis decisions reviewed in real time",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Community Access",
            description:
                "Join a data-driven learning circle loaded with collaboration and peer-learning.",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career Guidance",
            description:
                "Clinical research analyst, data manager, biostatistics career track, pharma RWE roles—সব কিছুর জন্য strategic direction",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "Globally accepted certification—LinkedIn/CV credibility booster।",
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
