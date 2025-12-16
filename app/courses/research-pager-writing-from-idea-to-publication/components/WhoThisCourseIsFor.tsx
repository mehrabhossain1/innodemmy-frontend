"use client";
import SectionTitle from "@/components/course/SectionTitle";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            image: "https://img.icons8.com/color/96/student-center.png",
            title: "Students & Academics – Those aiming to write and publish research papers",
        },
        {
            image: "https://img.icons8.com/color/96/business.png",
            title: "Career-Oriented Professionals – Strengthen your academic or research profile",
        },
        {
            image: "https://img.icons8.com/color/96/book.png",
            title: "Beginners in Research Writing – No prior experience needed",
        },
        {
            image: "https://img.icons8.com/color/96/dumbbell.png",
            title: "Hands-On Learners – Prefer practical exercises over theory-only learning",
        },
        {
            image: "https://img.icons8.com/color/96/graph.png",
            title: "Skill Builders – Develop analytical, research, and writing skills",
        },
        {
            image: "https://img.icons8.com/color/96/goal.png",
            title: "Self-Motivated Individuals – Committed to consistent learning and completing a paper from scratch",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Who This Course is For" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {audiences.map((audience, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-4">
                                {/* Image Icon */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={audience.image}
                                        alt={audience.title}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <div className="flex-1">
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium">
                                        {audience.title}
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
