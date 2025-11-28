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
    title: string;
    topics: string[];
    exercises?: string[];
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
        title: "Getting Started with Python",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                session: 1,
                title: "Getting Started with Python",
                topics: [
                    "What is Python and why use it?",
                    "Installing Python (Anaconda, VS Code, Jupyter)",
                    "Python syntax, indentation, comments",
                    "Variables and naming rules",
                    "Built-in data types: int, float, str, bool",
                    "Type casting and type()",
                    "Operators: arithmetic, comparison, logical",
                ],
                exercises: [
                    "Personal info script",
                    "Simple calculator",
                    "Even/Odd number checker",
                ],
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Strings, Input/Output & Control Flow",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                session: 2,
                title: "Strings, Input/Output & Control Flow",
                topics: [
                    "String indexing, slicing, methods (split(), join(), replace(), strip())",
                    "f-strings and .format()",
                    "input() and console interactions",
                    "if, elif, else statements",
                    "for, while loops",
                    "break, continue, pass",
                    "Nested loops and logic patterns",
                ],
                exercises: ["Password generator", "Word/character counter"],
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "Data Structures & List Comprehensions",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                session: 3,
                title: "Data Structures & List Comprehensions",
                topics: [
                    "Lists, Tuples, Sets, Dictionaries",
                    "CRUD operations on collections",
                    "get(), .update(), .items()",
                    "Nested structures",
                    "zip(), enumerate(), sorted()",
                    "List comprehensions and dictionary/set comprehensions",
                ],
                exercises: ["Student record manager", "Word frequency counter"],
            },
        ],
    },
    {
        id: 4,
        number: 4,
        title: "Functions, Recursion & Modules",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                session: 4,
                title: "Functions, Recursion & Modules",
                topics: [
                    "Defining and calling functions",
                    "Parameters, return values, scope",
                    "Default, keyword, variable-length arguments",
                    "Recursion: factorial, Fibonacci, directory scan",
                    "Anonymous functions: lambda",
                    "map(), filter(), reduce()",
                    "Built-in functions: map(), filter(), reduce()",
                    "Writing your own modules and imports",
                ],
                exercises: [
                    "Recursive file search",
                    "Word filter with lambda and filter()",
                ],
            },
        ],
    },
    {
        id: 5,
        number: 5,
        title: "File Handling, CSV & JSON",
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [
            {
                id: 1,
                session: 5,
                title: "File Handling, CSV & JSON",
                topics: [
                    "Working with text files",
                    "CSV files using csv module",
                    "JSON: parsing, serialization",
                    "with statement, open(), read(), write()",
                    "File loops and data cleaning",
                    "File system navigation: os, pathlib",
                ],
                exercises: [
                    "CSV data cleaner & summarizer",
                    "JSON user profile builder",
                ],
            },
        ],
    },
    {
        id: 6,
        number: 6,
        title: "Error Handling & Debugging",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [
            {
                id: 1,
                session: 6,
                title: "Error Handling & Debugging",
                topics: [
                    "Error types: syntax, runtime, logic",
                    "Try-Except blocks, else, finally",
                    "Custom exceptions with raise",
                    "Basic debugger: pdb",
                    "Logging intro (optional)",
                ],
                exercises: ["File reader with missing file handler"],
            },
        ],
    },
    {
        id: 7,
        number: 7,
        title: "Object-Oriented Programming (OOP)",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
        lightBgColor: "bg-indigo-100",
        topics: [
            {
                id: 1,
                session: 7,
                title: "Object-Oriented Programming (OOP)",
                topics: [
                    "Classes, objects, __init__, attributes",
                    "Class methods and self",
                    "Inheritance and method overriding",
                    "Encapsulation and __str__",
                    "Composition (optional)",
                ],
                exercises: ["Bank account system", "Tic-Tac-Toe with OOP"],
            },
        ],
    },
    {
        id: 8,
        number: 8,
        title: "Advanced Python (Generators, Decorators, Virtualenv)",
        color: "bg-pink-500",
        bgColor: "bg-pink-50",
        lightBgColor: "bg-pink-100",
        topics: [
            {
                id: 1,
                session: 8,
                title: "Advanced Python (Generators, Decorators, Virtualenv)",
                topics: [
                    "Generators: yield, lazy evaluation",
                    "Decorators: writing and applying",
                    "Closures and first-class functions",
                    "Introduction to virtualenv & pip",
                    "Installing external libraries",
                ],
                exercises: ["Generator for large file line processing"],
            },
        ],
    },
    {
        id: 9,
        number: 9,
        title: "Web Scraping & APIs",
        color: "bg-cyan-500",
        bgColor: "bg-cyan-50",
        lightBgColor: "bg-cyan-100",
        topics: [
            {
                id: 1,
                session: 9,
                title: "Web Scraping & APIs",
                topics: [
                    "Web scraping with requests, BeautifulSoup",
                    "Parsing HTML: tags, classes, attributes",
                    "Error handling for HTTP requests",
                    "Working with APIs (e.g., OpenWeatherMap)",
                    "Exporting data to CSV/JSON",
                ],
                exercises: [
                    "News headline scraper",
                    "Weather report fetcher",
                    "Job listings to CSV from web",
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
                                                        (topic.exercises
                                                            ?.length || 0),
                                                    0
                                                )}{" "}
                                                Exercise
                                                {module.topics.reduce(
                                                    (acc, topic) =>
                                                        acc +
                                                        (topic.exercises
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
                                                topic.topics || topic.exercises;

                                            const borderColor =
                                                module.id === 1
                                                    ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
                                                    : module.id === 2
                                                    ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20"
                                                    : module.id === 3
                                                    ? "border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/20"
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
                                                                        {topic.topics &&
                                                                            topic
                                                                                .topics
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-md border border-indigo-100 dark:border-indigo-800">
                                                                                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-indigo-600 dark:text-indigo-400">
                                                                                            📚
                                                                                        </span>
                                                                                        Topics
                                                                                        Covered:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.topics.map(
                                                                                            (
                                                                                                topicItem,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-indigo-800 dark:text-indigo-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        topicItem
                                                                                                    )}
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}

                                                                        {topic.exercises &&
                                                                            topic
                                                                                .exercises
                                                                                .length >
                                                                                0 && (
                                                                                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                                                                                    <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1 text-xs">
                                                                                        <span className="text-purple-600 dark:text-purple-400">
                                                                                            💻
                                                                                        </span>
                                                                                        Exercises:
                                                                                    </h4>
                                                                                    <ul className="space-y-1 list-disc list-inside">
                                                                                        {topic.exercises.map(
                                                                                            (
                                                                                                exercise,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="leading-relaxed text-purple-800 dark:text-purple-200"
                                                                                                >
                                                                                                    {renderTextWithBold(
                                                                                                        exercise
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
