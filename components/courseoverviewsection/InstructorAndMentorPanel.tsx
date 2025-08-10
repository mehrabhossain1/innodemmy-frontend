"use client";

import Image from "next/image";

export default function InstructorAndMentorPanel() {
    const instructors = [
        {
            title: "Senior Instructor",
            name: "John Doe",
            description:
                "John is a seasoned software engineer with over 10 years of experience in full-stack development, specializing in Python and machine learning applications.",
            companies: ["TechCorp", "InnoTech", "DataMind"],
            image: "https://cdn.ostad.app/user/avatar/2025-01-02T12-54-19.021Z-WhatsApp%20Image%202024-12-25%20at%2016.18.33_ffb16dec.jpg",
        },
        {
            title: "Lead Mentor",
            name: "Jane Smith",
            description:
                "Jane is an expert in data science with a focus on AI-driven solutions, bringing 8 years of industry experience to guide learners effectively.",
            companies: ["AI Solutions", "NextGen Analytics", "SmartData"],
            image: "https://cdn.ostad.app/user/avatar/2025-01-02T12-54-19.021Z-WhatsApp%20Image%202024-12-25%20at%2016.18.33_ffb16dec.jpg",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Instructors and Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {instructors.map((instructor, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 text-white rounded-xl border border-gray-700 overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                            <div className="w-full md:w-2/3">
                                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                    {instructor.title}
                                </h3>
                                <h4 className="text-2xl font-bold mb-4">
                                    {instructor.name}
                                </h4>
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {instructor.description}
                                </p>
                                <div className="text-gray-400">
                                    <strong>Companies Worked On:</strong>{" "}
                                    {instructor.companies.join(", ")}
                                </div>
                            </div>
                            <div className="w-full md:w-1/3">
                                <Image
                                    src={instructor.image}
                                    alt={instructor.name}
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover border-2 border-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
