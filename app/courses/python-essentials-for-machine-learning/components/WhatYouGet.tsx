"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "1 Month Intensive Learning Journey",
            description:
                "Step-by-step structured curriculum designed for beginners but packed with advanced, real-world concepts.",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "12 Live Classes with Industry Experts",
            description:
                "Learn directly from professionals and get your questions answered in real-time.",
        },
        {
            image: "https://img.icons8.com/color/96/project.png",
            title: "10 Hands-on Projects",
            description:
                "Apply what you learn on practical problems, strengthen your programming skills, and build confidence.",
        },
        {
            image: "https://img.icons8.com/color/96/leaderboard.png",
            title: "Progress Tracking & Leaderboard",
            description:
                "Keep track of your learning journey and see where you stand compared to peers.",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Unlimited Support Sessions",
            description:
                "Stuck while practicing? Get instant help during live support sessions.",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Exclusive Learner Community",
            description:
                "Network, collaborate, and get continuous guidance from a supportive community of learners and experts.",
        },
        {
            image: "https://img.icons8.com/color/96/infinity.png",
            title: "Lifetime Access",
            description:
                "Revisit pre-recorded videos, resources, and class recordings anytime—forever.",
        },
        {
            image: "https://img.icons8.com/color/96/career.png",
            title: "Mock Interview & Career Guidance",
            description:
                "Prepare for interviews with real-world tips, resume & LinkedIn optimization, and guidance for internships/jobs.",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Shareable Certificate",
            description:
                "Receive an officially verified certificate upon completion that you can proudly display on LinkedIn or your CV.",
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
