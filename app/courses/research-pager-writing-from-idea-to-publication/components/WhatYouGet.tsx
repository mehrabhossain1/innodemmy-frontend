"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/book.png",
            title: "Step-by-Step Guidance",
            description:
                "Learn every stage of writing a research paper, from topic selection to submission.",
        },
        {
            image: "https://img.icons8.com/color/96/template.png",
            title: "Practical Templates & Real Examples",
            description: "Use ready-made formats for abstracts, literature reviews, methodology, results, and discussion.",
        },
        {
            image: "https://img.icons8.com/color/96/edit.png",
            title: "Hands-On Writing Exercises",
            description:
                "Develop each section of a paper through guided practice.",
        },
        {
            image: "https://img.icons8.com/color/96/strategy.png",
            title: "Publication Strategy",
            description:
                "Discover how to select journals, understand impact factors, and submit successfully.",
        },
        {
            image: "https://img.icons8.com/color/96/feedback.png",
            title: "Peer Review & Feedback",
            description:
                "Receive constructive feedback to improve clarity and quality.",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Professional Certificate",
            description:
                "Get a verified certificate to showcase your achievement.",
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
