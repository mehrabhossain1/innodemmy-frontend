"use client";
import { ChevronDown, Video, FileText } from "lucide-react";
import { useState } from "react";

interface Topic {
    id: number;
    title: string;
}

interface Module {
    id: number;
    number: number;
    title: string;
    liveClasses: number;
    projects?: number;
    color: string;
    bgColor: string;
    lightBgColor: string;
    topics: Topic[];
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Overview of Data Analytics",
        liveClasses: 1,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            { id: 1, title: "What is Data Analytics?" },
            { id: 2, title: "Component of Data Analyst" },
            { id: 3, title: "Tools needed to be a Data Analyst" },
            { id: 4, title: "Why Data Analytics?" },
            { id: 5, title: "Scope of a Data Analyst" },
            { id: 6, title: "Salary of a Data Analyst" },
            { id: 7, title: "Freelancing with Data Analytics" },
            { id: 8, title: "CHAT GPT and Data Analytics" },
            { id: 9, title: "Use of CHAT GPT in Data Analytics" },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Excel for Data Analysis",
        liveClasses: 5,
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [],
    },
    {
        id: 3,
        number: 3,
        title: "Excel – Practical Applications on Projects",
        liveClasses: 5,
        projects: 4,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [],
    },
    {
        id: 4,
        number: 4,
        title: "AI for Data Analytics",
        liveClasses: 3,
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [],
    },
    {
        id: 5,
        number: 5,
        title: "Power BI Fundamentals",
        liveClasses: 6,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [],
    },
    {
        id: 6,
        number: 6,
        title: "Power BI Hands-on Projects",
        liveClasses: 5,
        projects: 2,
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [],
    },
];

export default function CourseModule() {
    const [expandedModule, setExpandedModule] = useState<number | null>(1);

    const toggleModule = (moduleId: number) => {
        setExpandedModule(expandedModule === moduleId ? null : moduleId);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Course Module
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className={`rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                            expandedModule === module.id
                                ? "shadow-lg"
                                : "shadow-md hover:shadow-lg"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className={`${module.bgColor} p-4 cursor-pointer`}
                            onClick={() => toggleModule(module.id)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Module Number Badge */}
                                <div
                                    className={`${module.color} text-white rounded-xl px-4 py-3 flex-shrink-0 shadow-md`}
                                >
                                    <div className="text-xs font-semibold">
                                        Module
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {module.number}
                                    </div>
                                </div>

                                {/* Module Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="flex items-center gap-1">
                                            <Video className="w-4 h-4" />
                                            <span className="font-medium">
                                                {module.liveClasses} Live Class
                                                {module.liveClasses > 1
                                                    ? "es"
                                                    : ""}
                                            </span>
                                        </div>
                                        {module.projects && (
                                            <div className="flex items-center gap-1">
                                                <FileText className="w-4 h-4" />
                                                <span className="font-medium">
                                                    {module.projects} Project
                                                    {module.projects > 1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Chevron Icon */}
                                <div className="flex-shrink-0">
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                                            expandedModule === module.id
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module Content - Topics */}
                        {expandedModule === module.id &&
                            module.topics.length > 0 && (
                                <div className="bg-white p-6">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-gray-900">
                                                    {module.number}.
                                                </span>
                                                <span className="font-semibold text-gray-800">
                                                    {module.title}
                                                </span>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        {module.topics.map((topic) => (
                                            <div
                                                key={topic.id}
                                                className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                <span className="font-bold text-gray-900 min-w-[20px]">
                                                    {topic.id}.
                                                </span>
                                                <span className="leading-relaxed">
                                                    {topic.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
}
