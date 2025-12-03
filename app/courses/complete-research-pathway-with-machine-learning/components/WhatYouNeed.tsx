"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouNeed() {
    const requirements = [
        {
            image: "https://img.icons8.com/color/96/laptop.png",
            title: "Laptop/Desktop with at least 8 GB RAM, Core i3 processor (minimum), and 256 GB SSD (recommended)",
            gradient: "from-blue-500 to-blue-600",
        },
        {
            image: "https://img.icons8.com/color/96/wifi.png",
            title: "Stable and fast internet connection for live classes, downloads, and research",
            gradient: "from-purple-500 to-purple-600",
        },
        {
            image: "https://img.icons8.com/color/96/book.png",
            title: "Basic computer skills, including familiarity with Word processors (Microsoft Word, Google Docs) and web browsing",
            gradient: "from-green-500 to-green-600",
        },
        {
            image: "https://img.icons8.com/color/96/code.png",
            title: "Basic programming knowledge is preferred but not mandatory",
            gradient: "from-orange-500 to-orange-600",
        },
        {
            image: "https://img.icons8.com/color/96/goal.png",
            title: "Growth mindset and commitment to practice consistently and complete the full research process",
            gradient: "from-pink-500 to-pink-600",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="What You will Need to Get Started" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {requirements.map((requirement, index) => {
                    return (
                        <div key={index} className="relative group">
                            {/* Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 min-h-[240px] flex flex-col justify-center">
                                {/* Number Badge */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">
                                        {index + 1}
                                    </span>
                                </div>

                                {/* Image */}
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <img
                                            src={requirement.image}
                                            alt={requirement.title}
                                            className="w-20 h-20 object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium">
                                    {requirement.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
