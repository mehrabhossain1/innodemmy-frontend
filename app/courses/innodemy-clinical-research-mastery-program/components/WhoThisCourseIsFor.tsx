"use client";
import {
    GraduationCap,
    FlaskConical,
    Stethoscope,
    BookOpenCheck,
} from "lucide-react";

export default function WhoThisCourseIsFor() {
    const audiences = [
        {
            icon: GraduationCap,
            title: "Professionals in the medical and healthcare sectors who plan to pursue higher studies abroad, including PhD opportunities.",
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: FlaskConical,
            title: "Researchers working in pharmaceutical, biotechnology, or life science fields seeking to strengthen their research foundation.",
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
        },
        {
            icon: Stethoscope,
            title: "MBBS/BDS students or graduates interested in developing strong research skills for academic or clinical careers.",
            color: "bg-green-500",
            bgColor: "bg-green-50",
        },
        {
            icon: BookOpenCheck,
            title: "Anyone who wants to build solid expertise in research methodology, scientific literacy, and academic writing.",
            color: "bg-amber-500",
            bgColor: "bg-amber-50",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Who This Course is For
                </h2>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {audiences.map((audience, index) => {
                    const Icon = audience.icon;
                    return (
                        <div
                            key={index}
                            className={`${audience.bgColor} rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`${audience.color} text-white rounded-xl p-3 flex-shrink-0`}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 text-base leading-relaxed font-medium">
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
