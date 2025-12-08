"use client";
import { ChevronDown } from "lucide-react";
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

interface Module {
    id: number;
    number: number;
    title: string;
    overview?: string[];
    aiPractice?: string;
    handsOn?: string;
    aiSupport?: string;
    task?: string;
    deliverable?: string;
    color: string;
    bgColor: string;
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Systematic Review & Meta-Analysis (PRISMA)",
        overview: ["Building search strategy and data extraction templates."],
        aiPractice:
            "Use Elicit for search automation and ChatGPT for forest plot summaries.",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
    },
    {
        id: 2,
        number: 2,
        title: "Advanced Biostatistics & Machine Learning",
        overview: ["Predictive modeling and survival analysis."],
        handsOn: "Run regressions in Python and interpret via ChatGPT.",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
    },
    {
        id: 3,
        number: 3,
        title: "Medical & Regulatory Writing",
        overview: [
            "CSR, protocol synopsis, and investigator brochure drafting.",
        ],
        aiSupport: "Generate sections using ChatGPT regulatory templates.",
        color: "bg-violet-500",
        bgColor: "bg-violet-50",
    },
    {
        id: 4,
        number: 4,
        title: "Grant Proposal & Project Management",
        overview: ["Gantt chart planning, budget design, and M&E frameworks."],
        aiPractice:
            "Use ChatGPT + Canva AI to create timeline and budget tables.",
        color: "bg-fuchsia-500",
        bgColor: "bg-fuchsia-50",
    },
    {
        id: 5,
        number: 5,
        title: "AI in Research Workflow",
        overview: ["End-to-end automation from literature to writing."],
        task: "Build your own AI pipeline with Scite + Elicit + ChatGPT + Mendeley.",
        deliverable: "Systematic review or grant proposal + AI literature map.",
        color: "bg-pink-500",
        bgColor: "bg-pink-50",
    },
];

export default function CourseModule() {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => {
            if (prev.includes(moduleId)) {
                return prev.filter((id) => id !== moduleId);
            } else {
                return [...prev, moduleId];
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Course Module" />
            <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                    Move Beyond Research – Automate and Innovate
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module.id);
                    const hasDetails =
                        module.overview ||
                        module.aiPractice ||
                        module.handsOn ||
                        module.aiSupport ||
                        module.task ||
                        module.deliverable;

                    return (
                        <div
                            key={module.id}
                            className={`${
                                module.bgColor
                            } dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                                isExpanded
                                    ? "shadow-lg"
                                    : "shadow-md hover:shadow-lg"
                            }`}
                        >
                            {/* Module Header */}
                            <div
                                className={`p-5 cursor-pointer`}
                                onClick={() => toggleModule(module.id)}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Module Number Badge */}
                                    <div
                                        className={`${module.color} text-white rounded-xl px-4 py-3 flex-shrink-0 shadow-md`}
                                    >
                                        <div className="text-sm font-semibold">
                                            Class
                                        </div>
                                        <div className="text-3xl font-bold">
                                            {module.number}
                                        </div>
                                    </div>

                                    {/* Module Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base leading-tight">
                                            {module.title}
                                        </h3>
                                    </div>

                                    {/* Chevron Icon */}
                                    {hasDetails && (
                                        <div className="flex-shrink-0">
                                            <ChevronDown
                                                className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                                                    isExpanded
                                                        ? "rotate-180"
                                                        : "rotate-0"
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Module Content */}
                            {isExpanded && hasDetails && (
                                <div className="px-5 pb-5">
                                    <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                                        {module.overview &&
                                            module.overview.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-base">
                                                        Overview:
                                                    </h4>
                                                    <ul className="space-y-1.5 list-disc list-inside">
                                                        {module.overview.map(
                                                            (point, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="leading-relaxed"
                                                                >
                                                                    {renderTextWithBold(
                                                                        point
                                                                    )}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                        {module.aiPractice && (
                                            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-blue-600 dark:text-blue-400">
                                                        🤖
                                                    </span>
                                                    AI Practice:
                                                </h4>
                                                <p className="leading-relaxed text-blue-800 dark:text-blue-200">
                                                    {renderTextWithBold(
                                                        module.aiPractice
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.handsOn && (
                                            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-100 dark:border-green-800">
                                                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-green-600 dark:text-green-400">
                                                        ✋
                                                    </span>
                                                    Hands-On:
                                                </h4>
                                                <p className="leading-relaxed text-green-800 dark:text-green-200">
                                                    {renderTextWithBold(
                                                        module.handsOn
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.aiSupport && (
                                            <div className="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg border border-cyan-100 dark:border-cyan-800">
                                                <h4 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-cyan-600 dark:text-cyan-400">
                                                        🤖
                                                    </span>
                                                    AI Support:
                                                </h4>
                                                <p className="leading-relaxed text-cyan-800 dark:text-cyan-200">
                                                    {renderTextWithBold(
                                                        module.aiSupport
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.task && (
                                            <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                                                <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-amber-600 dark:text-amber-400">
                                                        📝
                                                    </span>
                                                    Task:
                                                </h4>
                                                <p className="leading-relaxed text-amber-800 dark:text-amber-200">
                                                    {renderTextWithBold(
                                                        module.task
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.deliverable && (
                                            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-100 dark:border-purple-800">
                                                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-purple-600 dark:text-purple-400">
                                                        📦
                                                    </span>
                                                    Deliverables:
                                                </h4>
                                                <p className="leading-relaxed text-purple-800 dark:text-purple-200">
                                                    {renderTextWithBold(
                                                        module.deliverable
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
