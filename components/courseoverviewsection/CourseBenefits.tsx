"use client";

import {
    BadgeCheck,
    Video,
    Users,
    Award,
    BookOpen,
    Clock,
    FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CourseBenefits() {
    const benefits = [
        {
            title: "5-Month Study Plan",
            description:
                "A beginner-friendly, updated curriculum designed for easy learning.",
            icon: BookOpen,
            bgColor: "bg-blue-50",
        },
        {
            title: "40 Live Classes",
            description:
                "Learn live from industry experts with interactive sessions.",
            icon: Video,
            bgColor: "bg-green-50",
        },
        {
            title: "4 Real-Life Projects",
            description:
                "Add industry-standard projects to your CV and stay ahead of the competition.",
            icon: BadgeCheck,
            bgColor: "bg-yellow-50",
        },
        {
            title: "Progress Tracking",
            description:
                "Check your position on the leaderboard with progress updates.",
            icon: Clock,
            bgColor: "bg-purple-50",
        },
        {
            title: "Weekly 3-Day Support Classes",
            description: "Get live support while practicing your skills.",
            icon: Users,
            bgColor: "bg-red-50",
        },
        {
            title: "Community Support",
            description: "Stay connected with a progressive community always.",
            icon: Users,
            bgColor: "bg-indigo-50",
        },
        {
            title: "Lifetime Access",
            description:
                "Get lifetime access to prerecorded videos, resources, and class recordings.",
            icon: Video,
            bgColor: "bg-teal-50",
        },
        {
            title: "Job Market Guidelines",
            description:
                "Receive comprehensive guidance from industry experts to enter the job market.",
            icon: FileText,
            bgColor: "bg-pink-50",
        },
        {
            title: "Interview Handbook",
            description:
                "A handbook with over 100 regularly asked interview questions.",
            icon: FileText,
            bgColor: "bg-gray-50",
        },
        {
            title: "Certificate",
            description:
                "Earn a shareable course completion and assessment certificate upon finishing.",
            icon: Award,
            bgColor: "bg-orange-50",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What You Are Getting From the Course
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                    <Card
                        key={index}
                        className={`${benefit.bgColor} hover:shadow-lg transition-shadow duration-300`}
                    >
                        <CardHeader className="flex flex-row items-center space-x-4 p-4">
                            <benefit.icon className="h-8 w-8 text-gray-700" />
                            <CardTitle className="text-lg font-semibold text-gray-800">
                                {benefit.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
