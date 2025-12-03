"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "1 Month Deep-Dive, Industry-Grade Learning Journey",
            description:
                "Foundational থেকে advanced পর্যন্ত step-by-step structured syllabus—exactly how CROs build protocols.",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "7 Live Classes with Clinical Research Experts",
            description:
                "Trial design specialists ও academic researchers থেকে real-time learning.",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Support Sessions",
            description:
                "Your protocol drafts, study designs, and CRFs will be reviewed in live sessions.",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Community Access",
            description:
                "A research-driven ecosystem—collaboration, peer-review, networking, and knowledge exchange.",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career Guidance",
            description:
                "Clinical research, pharma trials, data management, academic pathways—সব কিছুর strategic roadmap।",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "ইন্টারন্যাশনালি accepted certificate—LinkedIn বা CV-তে showcase করার জন্য perfect।",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="What You'll Get in This Course" />

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
