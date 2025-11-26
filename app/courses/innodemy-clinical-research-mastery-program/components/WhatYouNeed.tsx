"use client";
import { Laptop, BookOpen, Target } from "lucide-react";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouNeed() {
    const requirements = [
        {
            icon: Laptop,
            title: "Basic computer skills and reliable internet access.",
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: BookOpen,
            title: "Foundational knowledge of health, medical, subjects.",
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
        },
        {
            icon: Target,
            title: "Commitment to learning and applying the concepts through projects.",
            color: "bg-green-500",
            bgColor: "bg-green-50",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <SectionTitle title="What You'll Need to Get Started" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {requirements.map((requirement, index) => {
                    const Icon = requirement.icon;
                    return (
                        <div
                            key={index}
                            className={`${requirement.bgColor} rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`${requirement.color} text-white rounded-xl p-3 flex-shrink-0`}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 text-base leading-relaxed font-medium">
                                        {requirement.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
