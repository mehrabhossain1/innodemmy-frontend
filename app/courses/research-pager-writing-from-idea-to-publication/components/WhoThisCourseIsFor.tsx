"use client";
import SectionTitle from "@/components/course/SectionTitle";
import { GraduationCap, Briefcase, BookOpen, Dumbbell, TrendingUp, Target } from "lucide-react";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            icon: GraduationCap,
            title: "Students & Academics",
            description: "Those aiming to write and publish research papers.",
        },
        {
            icon: Briefcase,
            title: "Career-Oriented Professionals",
            description: "Strengthen your academic or research profile.",
        },
        {
            icon: BookOpen,
            title: "Beginners in Research Writing",
            description: "No prior experience needed.",
        },
        {
            icon: Dumbbell,
            title: "Hands-On Learners",
            description: "Prefer practical exercises over theory-only learning.",
        },
        {
            icon: TrendingUp,
            title: "Skill Builders",
            description: "Develop analytical, research, and writing skills.",
        },
        {
            icon: Target,
            title: "Self-Motivated Individuals",
            description: "Committed to consistent learning and completing a paper from scratch.",
        },
    ];

    const whyTakeCourse = [
        "Build confidence in research writing from scratch.",
        "Learn to publish in reputable journals.",
        "Gain practical, real-world skills applicable in academia and industry.",
        "Access a supportive community and expert guidance throughout.",
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Who This Course is For" />

            {/* Audience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {audiences.map((audience, index) => {
                    const Icon = audience.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full p-4">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>

                                {/* Title */}
                                <div className="flex-1">
                                    <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-2">
                                        {audience.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {audience.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Why Take This Course Section */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Why Take This Course?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {whyTakeCourse.map((reason, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                                {reason}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
