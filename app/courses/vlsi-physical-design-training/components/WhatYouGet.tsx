"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhatYouGet() {
    const benefits = [
        {
            image: "https://img.icons8.com/color/96/processor.png",
            title: "Complete Understanding of ASIC Design Flow",
            description:
                "Learn the entire process from RTL to GDSII with practical insights.",
        },
        {
            image: "https://img.icons8.com/color/96/blueprint.png",
            title: "Solid Foundation in Physical Design (PD)",
            description:
                "Master every PD stage: Floorplanning, Placement, CTS, Routing, and Sign-off.",
        },
        {
            image: "https://img.icons8.com/color/96/software.png",
            title: "Hands-on Practice with EDA Tools",
            description:
                "Get real-world experience using OpenROAD and other open-source design tools.",
        },
        {
            image: "https://img.icons8.com/color/96/speed.png",
            title: "Expertise in Timing, Power, and Area Optimization",
            description:
                "Learn how to achieve efficient chip performance through key optimization techniques.",
        },
        {
            image: "https://img.icons8.com/color/96/module.png",
            title: "Experience with Open-Source PDKs",
            description:
                "Work with SkyWater 130nm and similar open-source fabrication technologies.",
        },
        {
            image: "https://img.icons8.com/color/96/video-conference.png",
            title: "Unlimited Live Support",
            description:
                "Get instant help and guidance whenever you need it throughout the course.",
        },
        {
            image: "https://img.icons8.com/color/96/certificate.png",
            title: "Completion Certificate",
            description:
                "Earn a verified certificate to enhance your resume and LinkedIn profile.",
        },
        {
            image: "https://img.icons8.com/color/96/interview.png",
            title: "Guidance for Interviews & Career Growth",
            description:
                "Receive expert tips and mock interview support for semiconductor job preparation.",
        },
        {
            image: "https://img.icons8.com/color/96/briefcase.png",
            title: "Confidence to Work on Real ASIC Design Teams",
            description:
                "Be fully equipped to contribute to industry or research-level chip design projects.",
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
