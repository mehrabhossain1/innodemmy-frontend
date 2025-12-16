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
        title: "Introduction to Research",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        lightBgColor: "bg-blue-100",
        topics: [
            {
                id: 1,
                session: 1,
                title: "Introduction to Research & Critical Reading",
                keyConcepts: [
                    "Concepts: Structure of a research paper",
                    "Activities: Introduction to Google Scholar, arXiv. Guided reading and critique of a foundational ML paper",
                ],
            },
            {
                id: 2,
                session: 2,
                title: "Ethics & Responsible Research",
                keyConcepts: [
                    "Concepts: Academic integrity, reproducibility, plagiarism, predatory journals",
                    "Activities: Case study discussions on ethical dilemmas in research",
                ],
            },
        ],
    },
    {
        id: 2,
        number: 2,
        title: "Research Questions and Literature Review",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                session: 3,
                title: "Formulating a Research Question",
                keyConcepts: [
                    "Concepts: How to identify research gaps from existing literature",
                    "Activities: Brainstorming and refining a novel research question for the final paper, based on course projects",
                ],
            },
            {
                id: 2,
                session: 4,
                title: "Literature Review",
                keyConcepts: [
                    "Concepts: How to find, read, and synthesize academic papers to build an argument",
                    "Activities: Writing the literature review section for the capstone paper",
                ],
            },
        ],
    },
    {
        id: 3,
        number: 3,
        title: "Methodology and Experimental Design",
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                session: 5,
                title: "Methodology & Experiments",
                keyConcepts: [
                    "Concepts: Designing a fair experimental setup",
                    "Activities: Writing the methodology section and running final experiments for the capstone paper",
                ],
            },
            {
                id: 2,
                session: 6,
                title: "Workshop: Methodology & Initial Results",
                keyConcepts: [
                    'Activities: A "lab meeting" style session where students present their methodology and preliminary results for peer and instructor feedback',
                ],
            },
        ],
    },
    {
        id: 4,
        number: 4,
        title: "Writing and Structuring the Paper",
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                session: 7,
                title: "Writing Results & Discussion",
                keyConcepts: [
                    "Concepts: Presenting results clearly using tables/figures. Interpreting results and discussing implications",
                    "Activities: Writing the results and discussion sections",
                ],
            },
            {
                id: 2,
                session: 9,
                title: "Writing the Introduction & Abstract",
                keyConcepts: [
                    "Concepts: Structuring a compelling introduction. Writing a concise and informative abstract",
                    "Activities: Refining the introduction and drafting the abstract",
                ],
            },
            {
                id: 3,
                session: 10,
                title: "Writing the Conclusion & Future Work",
                keyConcepts: [
                    "Concepts: Summarizing contributions, acknowledging limitations, and suggesting future research directions",
                    "Activities: Writing the final sections of the paper",
                ],
            },
        ],
    },
    {
        id: 5,
        number: 5,
        title: "Polishing & Submission Prep",
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [
            {
                id: 1,
                session: 11,
                title: "Citations, and Formatting",
                keyConcepts: [
                    "Concepts: Using citation managers (Zotero, Mendeley). Formatting with LaTeX/Word",
                    "Activities: Introduction to Overleaf. Formatting the paper for a target venue",
                ],
            },
        ],
    },
    {
        id: 6,
        number: 6,
        title: "Refinement and Peer Review",
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [
            {
                id: 1,
                session: 8,
                title: "Workshop: Paper Draft peer Review",
                keyConcepts: [
                    "Activities: A comprehensive peer review session on the paper draft, simulating a real conference review process",
                ],
            },
            {
                id: 2,
                session: 12,
                title: "Peer Review & Rebuttal Training",
                keyConcepts: [
                    "Concepts: How reviewers think; responding to criticism",
                    "Activities: Students review each other's drafts + write mock rebuttal letters",
                ],
            },
        ],
    },
    {
        id: 7,
        number: 7,
        title: "Final Presentation",
        color: "bg-indigo-500",
        bgColor: "bg-indigo-50",
        lightBgColor: "bg-indigo-100",
        topics: [
            {
                id: 1,
                session: 13,
                title: "Conference-style presentation",
                keyConcepts: [
                    "Activities: Students present their research findings in a conference-style presentation. Q&A and feedback from peers and the instructor",
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
                        className={`${module.bgColor
                            } dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${expandedModules.includes(module.id)
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
                                        className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${expandedModules.includes(module.id)
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
                                                    className={`border rounded-md p-2 transition-all duration-300 ${isTopicExpanded
                                                            ? `${borderColor} shadow-sm`
                                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
                                                        }`}
                                                >
                                                    <div
                                                        className={`flex items-start gap-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${hasDetails
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
                                                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isTopicExpanded
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
