"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/calendar--v1.png",
            title: "3-Month Guided Study Plan",
            description:
                "A structured, beginner-friendly learning path with no prior experience required",
        },
        {
            image: "https://img.icons8.com/color/96/document.png",
            title: "Research Paper Writing Guidance",
            description:
                "Learn to write a research paper from topic selection to submission",
        },
        {
            image: "https://img.icons8.com/color/96/youtube-live.png",
            title: "36+ Live Classes",
            description:
                "Hands-on learning in real-time from experienced professionals",
        },
        {
            image: "https://img.icons8.com/color/96/project.png",
            title: "5 Real-World Projects",
            description:
                "Build practical projects to showcase your skills and portfolio",
        },
        {
            image: "https://img.icons8.com/color/96/graduation-cap.png",
            title: "Higher Study Guidelines",
            description:
                "Expert guidance on studying abroad, from program selection and applications to exams, and scholarships",
        },
        {
            image: "https://img.icons8.com/color/96/approve-and-update.png",
            title: "Publication Strategy & Peer Review",
            description:
                "Master journal selection, submission process, and get constructive feedback",
        },
        {
            image: "https://img.icons8.com/color/96/user-group-man-man.png",
            title: "Active Research Community",
            description:
                "Collaborate, discuss, and grow alongside fellow learners",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Unlimited Live Support",
            description: "Get instant help and guidance whenever you need it",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Completion Certificate",
            description:
                "Earn a verified certificate to enhance your resume and LinkedIn profile",
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
