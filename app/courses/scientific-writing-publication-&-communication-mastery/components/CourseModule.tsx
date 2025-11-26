"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
    practice?: string;
    aiPractice?: string;
    handsOn?: string;
    aiSupport?: string;
    simulation?: string;
    deliverable?: string;
    color: string;
    bgColor: string;
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Structure of a Scientific Paper (IMRaD)",
        overview: ["Understanding organization and flow."],
        practice: "Rearrange a disordered paper with ChatGPT guidance.",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
    },
    {
        id: 2,
        number: 2,
        title: "Abstract Writing",
        overview: ["Structured vs unstructured formats."],
        aiPractice:
            "Generate abstracts and refine language with Grammarly AI.",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        id: 3,
        number: 3,
        title: "Introduction Writing",
        overview: ["Building the Global → Local → Gap → Aim story."],
        practice:
            "Use Scite to fetch citations; summarize context via ChatGPT.",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
    },
    {
        id: 4,
        number: 4,
        title: "Methods Writing",
        overview: ["Translating protocol to publishable Methods section."],
        handsOn: "Create a Methods draft using ChatGPT templates.",
        color: "bg-lime-500",
        bgColor: "bg-lime-50",
    },
    {
        id: 5,
        number: 5,
        title: "Results Writing",
        overview: ["Presenting quantitative findings logically."],
        aiSupport:
            "Convert SPSS outputs into narrative sentences and tables.",
        color: "bg-emerald-500",
        bgColor: "bg-emerald-50",
    },
    {
        id: 6,
        number: 6,
        title: "Discussion Writing",
        overview: [
            "Interpretation, comparison, limitations, and conclusion.",
        ],
        practice:
            "Generate discussion drafts and validate with Scite citations.",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
    },
    {
        id: 7,
        number: 7,
        title: "References & Citation Management",
        overview: ["Reference styles (Vancouver, Harvard)."],
        handsOn: "Manage citations with Zotero and ChatGPT plugins.",
        color: "bg-cyan-500",
        bgColor: "bg-cyan-50",
    },
    {
        id: 8,
        number: 8,
        title: "Journal Selection & Submission Strategy",
        overview: ["Journal targeting and cover letter drafting."],
        aiPractice: "Use Journal Finder AI for 5 best fit journals.",
        color: "bg-sky-500",
        bgColor: "bg-sky-50",
    },
    {
        id: 9,
        number: 9,
        title: "Responding to Reviewers & Revision",
        overview: ["Handling peer review feedback professionally."],
        simulation: "Upload comments to ChatGPT to draft responses.",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        id: 10,
        number: 10,
        title: "Conference Presentation Skills",
        overview: ["Poster, oral presentation, and Q&A techniques."],
        handsOn:
            "Design poster in Canva and generate speech script via ChatGPT.",
        deliverable:
            "Full IMRaD manuscript + poster + reviewer reply pack.",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
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
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Course Modules
                </h2>
                <p className="text-gray-600 mt-2">
                    Crafting and Communicating Scientific Evidence
                </p>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module.id);
                    const hasDetails =
                        module.overview ||
                        module.practice ||
                        module.aiPractice ||
                        module.handsOn ||
                        module.aiSupport ||
                        module.simulation ||
                        module.deliverable;

                    return (
                        <div
                            key={module.id}
                            className={`${
                                module.bgColor
                            } rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
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
                                        <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                                            {module.title}
                                        </h3>
                                    </div>

                                    {/* Chevron Icon */}
                                    {hasDetails && (
                                        <div className="flex-shrink-0">
                                            <ChevronDown
                                                className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
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
                                    <div className="space-y-2.5 text-sm text-gray-600">
                                        {module.overview &&
                                            module.overview.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-base">
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

                                        {module.practice && (
                                            <div className="bg-pink-50 p-3 rounded-lg border border-pink-100">
                                                <h4 className="font-semibold text-pink-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-pink-600">
                                                        🎯
                                                    </span>
                                                    Practice:
                                                </h4>
                                                <p className="leading-relaxed text-pink-800">
                                                    {renderTextWithBold(
                                                        module.practice
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.aiPractice && (
                                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                <h4 className="font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-blue-600">
                                                        🤖
                                                    </span>
                                                    AI Practice:
                                                </h4>
                                                <p className="leading-relaxed text-blue-800">
                                                    {renderTextWithBold(
                                                        module.aiPractice
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.handsOn && (
                                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                <h4 className="font-semibold text-green-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-green-600">
                                                        ✋
                                                    </span>
                                                    Hands-On:
                                                </h4>
                                                <p className="leading-relaxed text-green-800">
                                                    {renderTextWithBold(
                                                        module.handsOn
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.aiSupport && (
                                            <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
                                                <h4 className="font-semibold text-cyan-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-cyan-600">
                                                        🤖
                                                    </span>
                                                    AI Support:
                                                </h4>
                                                <p className="leading-relaxed text-cyan-800">
                                                    {renderTextWithBold(
                                                        module.aiSupport
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.simulation && (
                                            <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                                                <h4 className="font-semibold text-rose-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-rose-600">
                                                        🎮
                                                    </span>
                                                    Simulation:
                                                </h4>
                                                <p className="leading-relaxed text-rose-800">
                                                    {renderTextWithBold(
                                                        module.simulation
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.deliverable && (
                                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                                <h4 className="font-semibold text-purple-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-purple-600">
                                                        📦
                                                    </span>
                                                    Deliverables:
                                                </h4>
                                                <p className="leading-relaxed text-purple-800">
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
