"use client";
import { ChevronDown, Video, FileText } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/course/SectionTitle";

// Helper function to render text with bold markdown
const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={index} className="font-bold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
};

interface Topic {
    id: number;
    session: number;
    instructor: string;
    title: string;
    keyConcepts: string[];
    projectMilestones?: string[];
}

interface Module {
    id: number;
    number: number;
    title: string;
    color: string;
    bgColor: string;
    lightBgColor: string;
    topics: Topic[];
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Python Programming Fundamentals",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                session: 1,
                instructor: "A",
                title: "Getting Started with Python",
                keyConcepts: [
                    "Python Fundamentals Test",
                    "Introduction to Python Assessment",
                    "Python Basics Quiz",
                    "Core Python Knowledge Test",
                    "Python Programming Essentials Evaluation",
                ],
                projectMilestones: ["Student record manager"],
            },
            {
                id: 2,
                session: 2,
                instructor: "A",
                title: "Strings, Input/Output & Control Flow",
                keyConcepts: [
                    "Python Control Flow and String Operations Test",
                    "Python Logic and String Handling Assessment",
                    "Flow Control and String Manipulation Quiz",
                    "Python Intermediate Concepts Test",
                    "String Methods and Loop Structures Evaluation",
                ],
                projectMilestones: ["Password generator"],
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Data Structures and Functional Programming",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                session: 3,
                instructor: "M",
                title: "Data Structures & List Comprehensions",
                keyConcepts: [
                    "Python Data Structures Test",
                    "Collections and Comprehensions Assessment",
                    "Python Lists, Tuples, Sets, and Dictionaries Quiz",
                    "Advanced Data Handling in Python Test",
                    "Python Data Collection Operations Evaluation",
                ],
                projectMilestones: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
            {
                id: 2,
                session: 4,
                instructor: "M",
                title: "Functions, Recursion & Modules",
                keyConcepts: [
                    "Python Functions and Modules Test",
                    "Functional Programming in Python Assessment",
                    "Functions, Recursion, and Modules Quiz",
                    "Python Functionality and Code Reusability Test",
                    "Advanced Python Functions and Imports Evaluation",
                ],
                projectMilestones: [
                    "Recursive file search",
                    "Word filter with lambda and filter()",
                ],
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "File Handling, Error Management, and Object-Oriented Programming",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                session: 5,
                instructor: "A",
                title: "File Handling, CSV & JSON",
                keyConcepts: [
                    "Working with text files",
                    "CSV files using csv module",
                    "JSON: parsing, serialization",
                    "With statement, open(), read(), write()",
                    "File loops and data cleaning",
                    "File system navigation: os, pathlib",
                ],
                projectMilestones: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
            {
                id: 2,
                session: 6,
                instructor: "A",
                title: "Error Handling & Debugging",
                keyConcepts: [
                    "Error types: syntax, runtime, logic",
                    "Try-Except blocks, else, finally",
                    "Custom exceptions with raise",
                    "Basic debugger: pdb",
                    "Logging intro",
                ],
                projectMilestones: ["File reader with missing file handler"],
            },
            {
                id: 3,
                session: 7,
                instructor: "A",
                title: "Object-Oriented Programming (OOP)",
                keyConcepts: [
                    "Classes, objects, __init__, attributes",
                    "Class methods and self",
                    "Inheritance and method overriding",
                    "Encapsulation and __str__",
                    "Composition",
                ],
                projectMilestones: [
                    "Bank account system",
                    "Tic-Tac-Toe with OOP",
                ],
            },
        ],
    },
    {
        id: 4,
        number: 4,
        title: "Advanced Python Applications & Projects",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                session: 8,
                instructor: "A",
                title: "Advanced Python (Generators, Decorators, Virtualenv)",
                keyConcepts: [
                    "Generators: yield, lazy evaluation",
                    "Decorators: writing and applying",
                    "Closures and first-class functions",
                    "Introduction to virtualenv & pip",
                    "Installing external libraries",
                ],
                projectMilestones: ["Generator for large file line processing"],
            },
            {
                id: 2,
                session: 9,
                instructor: "A/M",
                title: "Python Project Support",
                keyConcepts: [
                    "Guidance on structuring Python projects and organizing code modules",
                    "Assistance with debugging, optimization, and improving code quality",
                    "Review of project workflows, and best practices for reproducible experiments",
                ],
            },
        ],
    },
];

export default function CourseModule() {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => {
            if (prev.includes(moduleId)) {
                return prev.filter((id) => id !== moduleId);
            } else {
                return [...prev, moduleId];
            }
        });
    };

    const toggleTopic = (moduleId: number, topicId: number) => {
        const topicKey = `${moduleId}-${topicId}`;
        setExpandedTopic(expandedTopic === topicKey ? null : topicKey);
    };

    // Get instructor full name
    const getInstructorName = (code: string) => {
        const instructors: { [key: string]: string } = {
            A: "Arif Mahmud Sisir",
            M: "M Azizul Hakim Shuvo",
            R: "Mamunur Rashid Alex",
            N: "Md Nafee Al Islam",
        };
        return instructors[code] || code;
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Course Module" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className={`${
                            module.bgColor
                        } dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                            expandedModules.includes(module.id)
                                ? "shadow-lg h-auto"
                                : "shadow-md hover:shadow-lg h-[110px]"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className="p-4 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                            }}
                        >
                            <div className="flex items-start gap-3">
                                {/* Module Number Badge */}
                                <div
                                    className={`${module.color} text-white rounded-lg px-3 py-2 flex-shrink-0 shadow-md`}
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
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base leading-tight">
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <Video className="w-3.5 h-3.5" />
                                            <span className="font-medium">
                                                {module.topics.length} Session
                                                {module.topics.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-3.5 h-3.5" />
                                            <span className="font-medium">
                                                {module.topics.reduce(
                                                    (acc, topic) =>
                                                        acc +
                                                        (topic.projectMilestones
                                                            ?.length || 0),
                                                    0
                                                )}{" "}
                                                Project
                                                {module.topics.reduce(
                                                    (acc, topic) =>
                                                        acc +
                                                        (topic.projectMilestones
                                                            ?.length || 0),
                                                    0
                                                ) > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chevron Icon */}
                                <div className="flex-shrink-0">
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                                            expandedModules.includes(module.id)
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module Content - Topics */}
                        {expandedModules.includes(module.id) &&
                            module.topics.length > 0 && (
                                <div className="px-4 pb-4">
                                    <div className="space-y-2">
                                        {module.topics.map((topic) => {
                                            const topicKey = `${module.id}-${topic.id}`;
                                            const isTopicExpanded =
                                                expandedTopic === topicKey;
                                            const hasDetails =
                                                topic.keyConcepts ||
                                                topic.projectMilestones;

                                            const borderColor =
                                                module.id === 1
                                                    ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
                                                    : module.id === 2
                                                    ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20"
                                                    : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20";

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`border rounded-md p-2 transition-all duration-300 ${
                                                        isTopicExpanded
                                                            ? `${borderColor} shadow-sm`
                                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-start gap-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
                                                            hasDetails
                                                                ? "cursor-pointer"
                                                                : ""
                                                        }`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (hasDetails) {
                                                                toggleTopic(
                                                                    module.id,
                                                                    topic.id
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <span className="font-bold text-gray-900 dark:text-white min-w-[18px] text-sm">
                                                            {topic.session}.
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className="leading-tight font-semibold text-sm block">
                                                                        {
                                                                            topic.title
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        Instructor:{" "}
                                                                        {getInstructorName(
                                                                            topic.instructor
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                {hasDetails && (
                                                                    <ChevronDown
                                                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                                                            isTopicExpanded
                                                                                ? "rotate-180"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* Expanded Topic Details */}
                                                            {isTopicExpanded &&
                                                                hasDetails && (
                                                                    <div className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                                                                        {topic.keyConcepts &&
                                                                            topic
                                                                                .keyConcepts
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-md border border-indigo-100 dark:border-indigo-800">
                                                                                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-indigo-600 dark:text-indigo-400">
                                                                                            📚
                                                                                        </span>
                                                                                        Key
                                                                                        Concepts
                                                                                        &
                                                                                        Activities:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.keyConcepts.map(
                                                                                            (
                                                                                                concept,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-indigo-800 dark:text-indigo-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        concept
                                                                                                    )}
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}

                                                                        {topic.projectMilestones &&
                                                                            topic
                                                                                .projectMilestones
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                                                                                    <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-purple-600 dark:text-purple-400">
                                                                                            🎯
                                                                                        </span>
                                                                                        Project
                                                                                        Milestones:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.projectMilestones.map(
                                                                                            (
                                                                                                milestone,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-purple-800 dark:text-purple-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        milestone
                                                                                                    )}
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
}
