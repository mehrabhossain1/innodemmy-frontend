"use client";
import { Clock, Video, Users, Award, Briefcase, GraduationCap } from "lucide-react";

export default function WhatYouGet() {
    const benefits = [
        {
            icon: Clock,
            title: "3 Month Intensive Learning Journey",
            description: "Step-by-step structured curriculum designed for beginners but packed with advanced, real-world concepts.",
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: Video,
            title: "24 Live Classes with Industry Experts",
            description: "Learn directly from professionals and get your questions answered in real-time.",
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
        },
        {
            icon: Users,
            title: "Support Sessions",
            description: "Stuck while practicing? Get instant help during live support sessions.",
            color: "bg-green-500",
            bgColor: "bg-green-50",
        },
        {
            icon: Award,
            title: "Exclusive Learner Community",
            description: "Network, collaborate, and get continuous guidance from a supportive community of learners and experts.",
            color: "bg-amber-500",
            bgColor: "bg-amber-50",
        },
        {
            icon: Briefcase,
            title: "Career Guidance",
            description: "Personalized career guidance, including advice on career pathways in clinical research and strategies to advance in healthcare, pharmaceutical sectors.",
            color: "bg-red-500",
            bgColor: "bg-red-50",
        },
        {
            icon: GraduationCap,
            title: "Shareable Certificate",
            description: "Receive an officially verified certificate upon completion that you can proudly display on LinkedIn or your CV.",
            color: "bg-teal-500",
            bgColor: "bg-teal-50",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    What You'll Get in This Course:
                </h2>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <div
                            key={index}
                            className={`${benefit.bgColor} rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`${benefit.color} text-white rounded-xl p-3 flex-shrink-0`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                        {benefit.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
