"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "3-Month Guided Study Plan",
            description:
                "Structured, beginner-friendly learning journey — no prior experience needed",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "40+ Live Classes",
            description: "Learn hands-on from industry experts in real time",
        },
        {
            image: "https://img.icons8.com/color/96/project.png",
            title: "4 Real-World Projects",
            description:
                "Build industry-grade projects to showcase on your CV and portfolio",
        },
        {
            image: "https://img.icons8.com/color/96/leaderboard.png",
            title: "Progress Tracking + Leaderboard",
            description:
                "Monitor your growth and see where you stand among peers",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Unlimited Live Support",
            description:
                "Get live support to solve problems, clarify doubts, and reinforce your understanding",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Active Learning Community",
            description:
                "Collaborate and grow with like-minded learners. ask questions, share ideas, and grow together.",
        },
        {
            image: "https://img.icons8.com/color/96/infinity.png",
            title: "Lifetime Access",
            description:
                "Revisit recorded classes, materials, and resources anytime",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Job Market Preparation",
            description: "Get career guidance directly from professionals",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Completion Certificate",
            description:
                "Earn a verifiable certificate to boost your resume and LinkedIn profile",
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
