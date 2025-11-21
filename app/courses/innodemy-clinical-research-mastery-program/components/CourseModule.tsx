"use client";
import { ChevronDown, Video, FileText } from "lucide-react";
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

interface Topic {
    id: number;
    title: string;
    overview?: string[];
    aiPractice?: string;
    aiSupport?: string;
    handsOnTask?: string;
    task?: string;
    deliverable?: string;
    exercise?: string;
}

interface Module {
    id: number;
    number: number;
    tierLabel: string;
    title: string;
    essence: string;
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
        tierLabel: "Tier",
        title: "Research Foundation & Scientific Literacy",
        essence:
            "Understand research fundamentals, evaluate scientific literature, and identify research gaps using AI-powered tools.",
        liveClasses: 6,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                title: "Understanding Clinical & Epidemiological Research",
                overview: [
                    "Overview of biomedical, clinical, and public-health research paradigms.",
                    "Translational research: from bench → bedside → community.",
                    "Evidence hierarchies and levels of evidence.",
                ],
                aiPractice:
                    "Use ChatGPT to generate definitions and examples of research types.",
                handsOnTask:
                    "Categorize 10 sample studies into correct design types.",
            },
            {
                id: 2,
                title: "Choosing a Researchable Topic",
                overview: [
                    "Criteria for novelty, feasibility, ethical and societal relevance.",
                    "Aligning topics with BMRC priority areas and SDG health goals.",
                ],
                aiPractice:
                    "Use **Elicit** or **ResearchRabbit** to discover current research trends.",
                deliverable:
                    "Topic shortlist with rationale and feasibility matrix.",
            },
            {
                id: 3,
                title: "Reading & Deconstructing Scientific Articles (IMRaD Framework)",
                overview: [
                    "Understanding article components and logic flow.",
                    "Extracting key methodology and results.",
                ],
                aiPractice:
                    "Use **Scite** to analyze citation strength and study impact.",
                exercise:
                    "Write a summary of an assigned paper in ≤ 200 words.",
            },
            {
                id: 4,
                title: "Critical Appraisal & Bias Detection",
                overview: [
                    "Appraisal checklists (CASP, STROBE, CONSORT).",
                    "Bias types and confounder identification.",
                ],
                handsOnTask:
                    "Apply STROBE to a published observational study.",
                aiSupport:
                    "Ask ChatGPT to generate bias summaries and checklist feedback.",
            },
            {
                id: 5,
                title: "Identifying Research Gaps Using AI Tools",
                overview: [
                    "Differentiating knowledge voids from replication needs.",
                    "Mapping literature clusters with **Litmaps** and **Connected Papers**.",
                ],
                task: "Produce a visual gap map and brief gap statement.",
            },
            {
                id: 6,
                title: "Developing Research Questions, Objectives & Hypotheses",
                overview: [
                    "PICO/PECO/PICOT frameworks and SMART objectives.",
                    "Null vs alternative hypotheses and testing logic.",
                ],
                aiPractice:
                    "Use ChatGPT to refine research objectives and draft hypotheses.",
                deliverable:
                    "Gap analysis document + finalized research question sheet.",
            },
        ],
    },
    {
        id: 2,
        number: 2,
        tierLabel: "Tier",
        title: "Protocol Development, Study Design & Data Framework",
        essence:
            "Transform ideas into structured, ethical, and statistically sound BMRC-compliant research protocols.",
        liveClasses: 5,
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [],
    },
    {
        id: 3,
        number: 3,
        tierLabel: "Tier",
        title: "Biostatistics, Data Analysis & Evidence Interpretation",
        essence:
            "Master hands-on statistical analysis, interpretation, and visualization using SPSS, STATA, Excel, and AI assistance.",
        liveClasses: 6,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [],
    },
    {
        id: 4,
        number: 4,
        tierLabel: "Tier",
        title: "Scientific Writing, Publication & Communication Mastery",
        essence:
            "Learn to write every section of a research paper, manage references, and communicate results effectively.",
        liveClasses: 5,
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [],
    },
    {
        id: 5,
        number: 5,
        tierLabel: "Tier",
        title: "Advanced Evidence Generation & AI-Enabled Research Practice (Optional Track)",
        essence:
            "Deep-dive into meta-analysis, advanced biostatistics, medical writing, and grant proposal development with automation.",
        liveClasses: 4,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [],
    },
    {
        id: 6,
        number: 6,
        tierLabel: "CAPSTONE",
        title: "Integrated Research Project & Publication Defense",
        essence:
            "Apply all learning to a real project—complete protocol, dataset, manuscript, and defend findings before expert panel.",
        liveClasses: 3,
        projects: 1,
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [],
    },
];

export default function CourseModule() {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleModule = (moduleId: number) => {
        setExpandedModules(prev => {
            if (prev.includes(moduleId)) {
                // Remove module from expanded list
                return prev.filter(id => id !== moduleId);
            } else {
                // Add module to expanded list
                return [...prev, moduleId];
            }
        });
    };

    const toggleTopic = (moduleId: number, topicId: number) => {
        const topicKey = `${moduleId}-${topicId}`;
        setExpandedTopic(expandedTopic === topicKey ? null : topicKey);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Course Module
                </h2>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {modules.map((module) => (
                    <div
                        key={module.id}
                        className={`${
                            module.bgColor
                        } rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                            expandedModules.includes(module.id)
                                ? "shadow-lg"
                                : "shadow-md hover:shadow-lg"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className={`p-5 cursor-pointer`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                            }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Module Number Badge */}
                                <div
                                    className={`${module.color} text-white rounded-xl px-4 py-3 flex-shrink-0 shadow-md`}
                                >
                                    <div className="text-sm font-semibold">
                                        {module.tierLabel}
                                    </div>
                                    <div className="text-3xl font-bold">
                                        {module.tierLabel === "CAPSTONE"
                                            ? ""
                                            : module.number}
                                    </div>
                                </div>

                                {/* Module Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                                        {module.essence}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="flex items-center gap-1.5">
                                            <Video className="w-4 h-4" />
                                            <span className="font-medium">
                                                {module.liveClasses} Live Class
                                                {module.liveClasses > 1
                                                    ? "es"
                                                    : ""}
                                            </span>
                                        </div>
                                        {module.projects && (
                                            <div className="flex items-center gap-1.5">
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
                                        className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
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
                                <div className="px-5 pb-5">
                                    <div className="space-y-2.5">
                                        {module.topics.map((topic) => {
                                            const topicKey = `${module.id}-${topic.id}`;
                                            const isTopicExpanded =
                                                expandedTopic === topicKey;
                                            const hasDetails =
                                                topic.overview ||
                                                topic.aiPractice ||
                                                topic.aiSupport ||
                                                topic.handsOnTask ||
                                                topic.task ||
                                                topic.deliverable ||
                                                topic.exercise;

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`border rounded-lg p-3 transition-all duration-300 ${
                                                        isTopicExpanded
                                                            ? "border-blue-300 bg-blue-50/50 shadow-sm"
                                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-start gap-3 text-base text-gray-700 hover:text-gray-900 transition-colors ${
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
                                                        <span className="font-bold text-gray-900 min-w-[24px] text-lg">
                                                            {topic.id}.
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="leading-relaxed font-medium text-base">
                                                                    {
                                                                        topic.title
                                                                    }
                                                                </span>
                                                                {hasDetails && (
                                                                    <ChevronDown
                                                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
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
                                                                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                                                                        {topic.overview &&
                                                                            topic
                                                                                .overview
                                                                                .length >
                                                                                0 && (
                                                                                <div>
                                                                                    <ul className="space-y-1.5 list-disc list-inside">
                                                                                        {topic.overview.map(
                                                                                            (
                                                                                                point,
                                                                                                idx
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
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

                                                                        {topic.aiPractice && (
                                                                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                                                <h4 className="font-semibold text-blue-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-blue-600">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Practice:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-blue-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiPractice
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.aiSupport && (
                                                                            <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
                                                                                <h4 className="font-semibold text-cyan-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-cyan-600">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Support:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-cyan-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiSupport
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.handsOnTask && (
                                                                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                                                <h4 className="font-semibold text-green-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-green-600">
                                                                                        ✋
                                                                                    </span>
                                                                                    Hands-On
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-green-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.handsOnTask
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.task && (
                                                                            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                                                                <h4 className="font-semibold text-indigo-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-indigo-600">
                                                                                        ✅
                                                                                    </span>
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-indigo-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.task
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.deliverable && (
                                                                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                                                                <h4 className="font-semibold text-purple-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-purple-600">
                                                                                        📦
                                                                                    </span>
                                                                                    Deliverable:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-purple-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.deliverable
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.exercise && (
                                                                            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                                                                <h4 className="font-semibold text-orange-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-orange-600">
                                                                                        📝
                                                                                    </span>
                                                                                    Exercise:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-orange-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.exercise
                                                                                    )}
                                                                                </p>
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
