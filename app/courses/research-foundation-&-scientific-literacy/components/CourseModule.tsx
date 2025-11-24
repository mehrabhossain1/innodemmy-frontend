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
    aiPractice?: string;
    aiSupport?: string;
    handsOnTask?: string;
    task?: string;
    deliverable?: string;
    exercise?: string;
    color: string;
    bgColor: string;
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Understanding Clinical & Epidemiological Research",
        overview: [
            "Overview of biomedical, clinical, and public-health research paradigms.",
            "Translational research: from bench → bedside → community.",
            "Evidence hierarchies and levels of evidence.",
        ],
        aiPractice:
            "Use ChatGPT to generate definitions and examples of research types.",
        handsOnTask: "Categorize 10 sample studies into correct design types.",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        id: 2,
        number: 2,
        title: "Choosing a Researchable Topic",
        overview: [
            "Criteria for novelty, feasibility, ethical and societal relevance.",
            "Aligning topics with BMRC priority areas and SDG health goals.",
        ],
        aiPractice:
            "Use **Elicit** or **ResearchRabbit** to discover current research trends.",
        deliverable:
            "Topic shortlist with rationale and feasibility matrix.",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
    },
    {
        id: 3,
        number: 3,
        title: "Reading & Deconstructing Scientific Articles (IMRaD Framework)",
        overview: [
            "Understanding article components and logic flow.",
            "Extracting key methodology and results.",
        ],
        aiPractice:
            "Use **Scite** to analyze citation strength and study impact.",
        exercise: "Write a summary of an assigned paper in ≤ 200 words.",
        color: "bg-green-500",
        bgColor: "bg-green-50",
    },
    {
        id: 4,
        number: 4,
        title: "Critical Appraisal & Bias Detection",
        overview: [
            "Appraisal checklists (CASP, STROBE, CONSORT).",
            "Bias types and confounder identification.",
        ],
        handsOnTask: "Apply STROBE to a published observational study.",
        aiSupport:
            "Ask ChatGPT to generate bias summaries and checklist feedback.",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
    },
    {
        id: 5,
        number: 5,
        title: "Identifying Research Gaps Using AI Tools",
        overview: [
            "Differentiating knowledge voids from replication needs.",
            "Mapping literature clusters with **Litmaps** and **Connected Papers**.",
        ],
        task: "Produce a visual gap map and brief gap statement.",
        color: "bg-red-500",
        bgColor: "bg-red-50",
    },
    {
        id: 6,
        number: 6,
        title: "Developing Research Questions, Objectives & Hypotheses",
        overview: [
            "PICO/PECO/PICOT frameworks and SMART objectives.",
            "Null vs alternative hypotheses and testing logic.",
        ],
        aiPractice:
            "Use ChatGPT to refine research objectives and draft hypotheses.",
        deliverable:
            "Gap analysis document + finalized research question sheet.",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
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
                    How to Think, Read, and Question Like a Researcher
                </p>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module.id);
                    const hasDetails =
                        module.overview ||
                        module.aiPractice ||
                        module.aiSupport ||
                        module.handsOnTask ||
                        module.task ||
                        module.deliverable ||
                        module.exercise;

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

                                        {module.handsOnTask && (
                                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                <h4 className="font-semibold text-green-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-green-600">
                                                        ✋
                                                    </span>
                                                    Hands-On Task:
                                                </h4>
                                                <p className="leading-relaxed text-green-800">
                                                    {renderTextWithBold(
                                                        module.handsOnTask
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {module.task && (
                                            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                                <h4 className="font-semibold text-indigo-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-indigo-600">
                                                        ✅
                                                    </span>
                                                    Task:
                                                </h4>
                                                <p className="leading-relaxed text-indigo-800">
                                                    {renderTextWithBold(
                                                        module.task
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

                                        {module.exercise && (
                                            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                                <h4 className="font-semibold text-orange-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-orange-600">
                                                        📝
                                                    </span>
                                                    Exercise:
                                                </h4>
                                                <p className="leading-relaxed text-orange-800">
                                                    {renderTextWithBold(
                                                        module.exercise
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
