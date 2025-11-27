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
    practice?: string;
    aiSupport?: string;
    handsOn?: string;
    aiIntegration?: string;
    deliverable?: string;
    aiPractice?: string;
    color: string;
    bgColor: string;
}

const modules: Module[] = [
    {
        id: 1,
        number: 1,
        title: "Study Design Selection",
        overview: [
            "Overview of observational and experimental designs.",
            "Strengths and limitations of each approach.",
        ],
        practice: "Analyze five abstracts to select correct design type.",
        aiSupport: "Ask ChatGPT to simulate design selection scenarios.",
        color: "bg-red-500",
        bgColor: "bg-red-50",
    },
    {
        id: 2,
        number: 2,
        title: "Variable Identification & Conceptual Framework",
        overview: [
            "Defining independent, dependent, and confounding variables.",
            "Constructing conceptual and analytical models.",
        ],
        handsOn: "Use Canva AI or Lucidchart AI to draw framework diagrams.",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        id: 3,
        number: 3,
        title: "Sampling Strategy & Sample Size Determination",
        overview: [
            "Probability vs non-probability sampling.",
            "Formulas for proportion, mean difference, correlation.",
        ],
        aiIntegration: "Compute sample size in Excel or ChatGPT math mode.",
        deliverable: "Sample-size sheet with literature references.",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
    },
    {
        id: 4,
        number: 4,
        title: "CRF / Questionnaire Development & Validation",
        overview: [
            "CRF structure, question types, and scoring.",
            "Pilot testing and reliability testing (Cronbach's alpha).",
        ],
        handsOn: "Design Google Form and run mini pilot with peer feedback.",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
    },
    {
        id: 5,
        number: 5,
        title: "Data Management Planning",
        overview: [
            "Codebooks, data security, and back-up plans.",
            "Data entry and quality-control workflow.",
        ],
        aiPractice:
            "Use ChatGPT to auto-generate variable codes and validation rules.",
        color: "bg-lime-500",
        bgColor: "bg-lime-50",
    },
    {
        id: 6,
        number: 6,
        title: "Ethical Considerations & Informed Consent",
        overview: [
            "BMRC guidelines, confidentiality, and local ethics context.",
        ],
        practice:
            "Write a participant information sheet and consent form with AI editing for readability.",
        color: "bg-green-500",
        bgColor: "bg-green-50",
    },
    {
        id: 7,
        number: 7,
        title: "Writing a BMRC-Compliant Protocol",
        overview: [
            "Section-wise writing (Background, Objectives, Methods, Timeline, Budget).",
            "Referencing and final review for submission.",
        ],
        aiSupport: "Use structured ChatGPT prompts for each protocol section.",
        deliverable:
            "Full BMRC-ready protocol + conceptual diagram + CRF toolset.",
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
            <SectionTitle title="Course Module" />
            <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                    From Research Question to Ethical and Operational Blueprint
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module.id);
                    const hasDetails =
                        module.overview ||
                        module.practice ||
                        module.aiSupport ||
                        module.handsOn ||
                        module.aiIntegration ||
                        module.deliverable ||
                        module.aiPractice;

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

                                        {module.aiIntegration && (
                                            <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                                                <h4 className="font-semibold text-violet-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                    <span className="text-violet-600">
                                                        🤖
                                                    </span>
                                                    AI Integration:
                                                </h4>
                                                <p className="leading-relaxed text-violet-800">
                                                    {renderTextWithBold(
                                                        module.aiIntegration
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
