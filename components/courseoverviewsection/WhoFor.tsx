"use client";

import { Users, Book, Brain, ChartBar, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhoFor() {
    const audience = [
        {
            title: "Students & Professionals",
            description:
                "Interested in building careers in Data Science and Machine Learning.",
            icon: Users,
        },
        {
            title: "Academics",
            description:
                "Aiming to strengthen research and publishing skills in Deep Learning.",
            icon: Book,
        },
        {
            title: "Research Enthusiasts",
            description:
                "Targeting high-quality research and top grades in Thesis.",
            icon: Brain,
        },
        {
            title: "Scholarship Seekers",
            description:
                "Focused on building profiles through publications for scholarships or funding.",
            icon: GraduationCap,
        },
        {
            title: "Data-Driven Decision Makers",
            description:
                "Wanting to extract meaningful insights and make data-driven decisions.",
            icon: ChartBar,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Who This Course Is For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {audience.map((item, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardHeader className="flex flex-row items-center space-x-4 p-4 bg-blue-50">
                            <item.icon className="h-8 w-8 text-blue-600" />
                            <CardTitle className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
