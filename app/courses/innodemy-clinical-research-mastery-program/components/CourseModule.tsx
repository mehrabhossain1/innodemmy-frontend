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
    title: string;
    overview?: string[];
    aiPractice?: string;
    aiSupport?: string;
    aiIntegration?: string;
    aiTask?: string;
    handsOn?: string;
    handsOnTask?: string;
    task?: string;
    deliverable?: string;
    exercise?: string;
    practice?: string;
    simulation?: string;
}

interface Module {
    id: number;
    number: number;
    tierLabel: string;
    title: string;
    subtitle?: string;
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
        tierLabel: "Module",
        title: "Research Foundation & Scientific Literacy",
        subtitle: "How to Think, Read, and Question Like a Researcher",
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
                handsOnTask: "Apply STROBE to a published observational study.",
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
        tierLabel: "Module",
        title: "Protocol Development, Study Design & Data Frameworking",
        subtitle: "From Research Question to Ethical and Operational Blueprint",
        essence:
            "Transform ideas into structured, ethical, and statistically sound BMRC-compliant research protocols.",
        liveClasses: 7,
        color: "bg-red-500",
        bgColor: "bg-red-50",
        lightBgColor: "bg-red-100",
        topics: [
            {
                id: 1,
                title: "Study Design Selection",
                overview: [
                    "Overview of observational and experimental designs.",
                    "Strengths and limitations of each approach.",
                ],
                practice:
                    "Analyze five abstracts to select correct design type.",
                aiSupport:
                    "Ask ChatGPT to simulate design selection scenarios.",
            },
            {
                id: 2,
                title: "Variable Identification & Conceptual Framework",
                overview: [
                    "Defining independent, dependent, and confounding variables.",
                    "Constructing conceptual and analytical models.",
                ],
                handsOn:
                    "Use Canva AI or Lucidchart AI to draw framework diagrams.",
            },
            {
                id: 3,
                title: "Sampling Strategy & Sample Size Determination",
                overview: [
                    "Probability vs non-probability sampling.",
                    "Formulas for proportion, mean difference, correlation.",
                ],
                aiIntegration:
                    "Compute sample size in Excel or ChatGPT math mode.",
                deliverable: "Sample-size sheet with literature references.",
            },
            {
                id: 4,
                title: "CRF / Questionnaire Development & Validation",
                overview: [
                    "CRF structure, question types, and scoring.",
                    "Pilot testing and reliability testing (Cronbach's alpha).",
                ],
                handsOn:
                    "Design Google Form and run mini pilot with peer feedback.",
            },
            {
                id: 5,
                title: "Data Management Planning",
                overview: [
                    "Codebooks, data security, and back-up plans.",
                    "Data entry and quality-control workflow.",
                ],
                aiPractice:
                    "Use ChatGPT to auto-generate variable codes and validation rules.",
            },
            {
                id: 6,
                title: "Ethical Considerations & Informed Consent",
                overview: [
                    "BMRC guidelines, confidentiality, and local ethics context.",
                ],
                practice:
                    "Write a participant information sheet and consent form with AI editing for readability.",
            },
            {
                id: 7,
                title: "Writing a BMRC-Compliant Protocol",
                overview: [
                    "Section-wise writing (Background, Objectives, Methods, Timeline, Budget).",
                    "Referencing and final review for submission.",
                ],
                aiSupport:
                    "Use structured ChatGPT prompts for each protocol section.",
                deliverable:
                    "Full BMRC-ready protocol + conceptual diagram + CRF toolset.",
            },
        ],
    },
    {
        id: 3,
        number: 3,
        tierLabel: "Module",
        title: "Biostatistics, Data Analysis & Evidence Interpretation",
        subtitle: "From Dataset to Decision-Ready Insight",
        essence:
            "Master hands-on statistical analysis, interpretation, and visualization using SPSS, STATA, Excel, and AI assistance.",
        liveClasses: 7,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        lightBgColor: "bg-green-100",
        topics: [
            {
                id: 1,
                title: "Data Entry, Coding & Cleaning",
                overview: ["Preparing datasets and handling missing data."],
                handsOn:
                    "Import data to SPSS; use ChatGPT to generate syntax for re-coding variables.",
            },
            {
                id: 2,
                title: "Descriptive Statistics & Visualization",
                overview: [
                    "Central tendency, dispersion, and data distribution.",
                ],
                practice:
                    "Create frequency tables and charts via Excel Copilot.",
            },
            {
                id: 3,
                title: "Inferential Statistics",
                overview: [
                    "Applying Chi-square, t-test, ANOVA, correlation analysis.",
                ],
                aiTask: "Paste SPSS outputs into ChatGPT for automated result interpretation.",
            },
            {
                id: 4,
                title: "Regression & Predictive Models",
                overview: ["Logistic, linear, and Cox regression concepts."],
                practice:
                    "Run models and interpret AUC values with ChatGPT guidance.",
            },
            {
                id: 5,
                title: "Statistical Interpretation & Narrative Writing",
                overview: ["Turning numbers into meaningful sentences."],
                aiPractice:
                    "Convert SPSS outputs into publication-ready paragraphs.",
            },
            {
                id: 6,
                title: "Data Visualization for Publications",
                overview: [
                    "Preparing Forest Plots, Boxplots, Scatter Diagrams.",
                ],
                handsOn: "Design figures using Canva AI or GraphMaker.",
            },
            {
                id: 7,
                title: "Avoiding Statistical Errors",
                overview: ["Common fallacies and diagnostic checks."],
                simulation:
                    "Analyze faulty datasets and correct them using AI feedback.",
                deliverable:
                    "Cleaned dataset + analysis report + publication figures.",
            },
        ],
    },
    {
        id: 4,
        number: 4,
        tierLabel: "Module",
        title: "Scientific Writing, Publication & Communication Mastery",
        subtitle: "Crafting and Communicating Scientific Evidence",
        essence:
            "Learn to write every section of a research paper, manage references, and communicate results effectively.",
        liveClasses: 10,
        color: "bg-amber-500",
        bgColor: "bg-amber-50",
        lightBgColor: "bg-amber-100",
        topics: [
            {
                id: 1,
                title: "Structure of a Scientific Paper (IMRaD)",
                overview: ["Understanding organization and flow."],
                practice: "Rearrange a disordered paper with ChatGPT guidance.",
            },
            {
                id: 2,
                title: "Abstract Writing",
                overview: ["Structured vs unstructured formats."],
                aiPractice:
                    "Generate abstracts and refine language with Grammarly AI.",
            },
            {
                id: 3,
                title: "Introduction Writing",
                overview: ["Building the Global → Local → Gap → Aim story."],
                practice:
                    "Use Scite to fetch citations; summarize context via ChatGPT.",
            },
            {
                id: 4,
                title: "Methods Writing",
                overview: [
                    "Translating protocol to publishable Methods section.",
                ],
                handsOn: "Create a Methods draft using ChatGPT templates.",
            },
            {
                id: 5,
                title: "Results Writing",
                overview: ["Presenting quantitative findings logically."],
                aiSupport:
                    "Convert SPSS outputs into narrative sentences and tables.",
            },
            {
                id: 6,
                title: "Discussion Writing",
                overview: [
                    "Interpretation, comparison, limitations, and conclusion.",
                ],
                practice:
                    "Generate discussion drafts and validate with Scite citations.",
            },
            {
                id: 7,
                title: "References & Citation Management",
                overview: ["Reference styles (Vancouver, Harvard)."],
                handsOn: "Manage citations with Zotero and ChatGPT plugins.",
            },
            {
                id: 8,
                title: "Journal Selection & Submission Strategy",
                overview: ["Journal targeting and cover letter drafting."],
                aiPractice: "Use Journal Finder AI for 5 best fit journals.",
            },
            {
                id: 9,
                title: "Responding to Reviewers & Revision",
                overview: ["Handling peer review feedback professionally."],
                simulation: "Upload comments to ChatGPT to draft responses.",
            },
            {
                id: 10,
                title: "Conference Presentation Skills",
                overview: ["Poster, oral presentation, and Q&A techniques."],
                handsOn:
                    "Design poster in Canva and generate speech script via ChatGPT.",
                deliverable:
                    "Full IMRaD manuscript + poster + reviewer reply pack.",
            },
        ],
    },
    {
        id: 5,
        number: 5,
        tierLabel: "Module",
        title: "Advanced Evidence Generation & AI-Enabled Research Practice (Optional Track)",
        subtitle: "Move Beyond Research – Automate and Innovate",
        essence:
            "Deep-dive into meta-analysis, advanced biostatistics, medical writing, and grant proposal development with automation.",
        liveClasses: 5,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        lightBgColor: "bg-purple-100",
        topics: [
            {
                id: 1,
                title: "Systematic Review & Meta-Analysis (PRISMA)",
                overview: [
                    "Building search strategy and data extraction templates.",
                ],
                aiPractice:
                    "Use Elicit for search automation and ChatGPT for forest plot summaries.",
            },
            {
                id: 2,
                title: "Advanced Biostatistics & Machine Learning",
                overview: ["Predictive modeling and survival analysis."],
                handsOn: "Run regressions in Python and interpret via ChatGPT.",
            },
            {
                id: 3,
                title: "Medical & Regulatory Writing",
                overview: [
                    "CSR, protocol synopsis, and investigator brochure drafting.",
                ],
                aiSupport:
                    "Generate sections using ChatGPT regulatory templates.",
            },
            {
                id: 4,
                title: "Grant Proposal & Project Management",
                overview: [
                    "Gantt chart planning, budget design, and M&E frameworks.",
                ],
                aiPractice:
                    "Use ChatGPT + Canva AI to create timeline and budget tables.",
            },
            {
                id: 5,
                title: "AI in Research Workflow",
                overview: ["End-to-end automation from literature to writing."],
                task: "Build your own AI pipeline with Scite + Elicit + ChatGPT + Mendeley.",
                deliverable:
                    "Systematic review or grant proposal + AI literature map.",
            },
        ],
    },
    {
        id: 6,
        number: 6,
        tierLabel: "CAPSTONE",
        title: "Integrated Research Project & Publication Defense",
        subtitle: "Prove It. Present It. Publish It.",
        essence:
            "Apply all learning to a real project, complete protocol, dataset, manuscript, and defend findings before expert panel.",
        liveClasses: 0,
        projects: 1,
        color: "bg-teal-500",
        bgColor: "bg-teal-50",
        lightBgColor: "bg-teal-100",
        topics: [
            {
                id: 1,
                title: "Capstone Project Requirements",
                overview: [
                    "One BMRC-compliant protocol.",
                    "One analyzed dataset (with SPSS outputs).",
                    "One full IMRaD manuscript.",
                    "A viva presentation before InnoDemy faculty.",
                ],
                aiIntegration:
                    "ChatGPT for refinement | Scite for verification | Grammarly for proofing | PowerPoint Copilot for presentation.",
                deliverable:
                    "🏅 InnoDemy Certified Clinical Research Scholar (ICCRS)",
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
                // Remove module from expanded list
                return prev.filter((id) => id !== moduleId);
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
                                : "shadow-md hover:shadow-lg h-[200px]"
                        }`}
                    >
                        {/* Module Header */}
                        <div
                            className={`p-4 cursor-pointer`}
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
                                        {module.tierLabel}
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {module.tierLabel === "CAPSTONE"
                                            ? ""
                                            : module.number}
                                    </div>
                                </div>

                                {/* Module Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 text-base leading-tight">
                                        {module.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1.5 leading-relaxed">
                                        {module.essence}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                                        {module.liveClasses !== undefined &&
                                            module.liveClasses > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <Video className="w-3.5 h-3.5" />
                                                    <span className="font-medium">
                                                        {module.liveClasses}{" "}
                                                        Live Class
                                                        {module.liveClasses > 1
                                                            ? "es"
                                                            : ""}
                                                    </span>
                                                </div>
                                            )}
                                        {module.projects && (
                                            <div className="flex items-center gap-1">
                                                <FileText className="w-3.5 h-3.5" />
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
                                    {/* Subtitle */}
                                    {module.subtitle && (
                                        <div className="mb-3 text-center px-3">
                                            <p
                                                className={`text-[9px] italic font-semibold bg-clip-text text-transparent leading-snug ${
                                                    module.id === 1
                                                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                                        : module.id === 2
                                                        ? "bg-gradient-to-r from-red-600 to-orange-600"
                                                        : module.id === 3
                                                        ? "bg-gradient-to-r from-green-600 to-teal-600"
                                                        : module.id === 4
                                                        ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                                                        : module.id === 5
                                                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                                                        : "bg-gradient-to-r from-teal-600 to-cyan-600"
                                                }`}
                                            >
                                                "{module.subtitle}"
                                            </p>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        {module.topics.map((topic) => {
                                            const topicKey = `${module.id}-${topic.id}`;
                                            const isTopicExpanded =
                                                expandedTopic === topicKey;
                                            const hasDetails =
                                                topic.overview ||
                                                topic.aiPractice ||
                                                topic.aiSupport ||
                                                topic.aiIntegration ||
                                                topic.aiTask ||
                                                topic.handsOn ||
                                                topic.handsOnTask ||
                                                topic.task ||
                                                topic.deliverable ||
                                                topic.exercise ||
                                                topic.practice ||
                                                topic.simulation;

                                            const borderColor =
                                                module.id === 1
                                                    ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
                                                    : module.id === 2
                                                    ? "border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20"
                                                    : module.id === 3
                                                    ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20"
                                                    : module.id === 4
                                                    ? "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20"
                                                    : module.id === 5
                                                    ? "border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/20"
                                                    : "border-teal-300 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/20";

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
                                                            {topic.id}.
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="leading-tight font-semibold text-sm">
                                                                    {
                                                                        topic.title
                                                                    }
                                                                </span>
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
                                                                        {topic.overview &&
                                                                            topic
                                                                                .overview
                                                                                .length >
                                                                                0 && (
                                                                                <div>
                                                                                    <ul className="space-y-1 list-disc list-inside">
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
                                                                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md border border-blue-100 dark:border-blue-800">
                                                                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-blue-600 dark:text-blue-400">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Practice:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-blue-800 dark:text-blue-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiPractice
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.aiSupport && (
                                                                            <div className="bg-cyan-50 dark:bg-cyan-900/30 p-2 rounded-md border border-cyan-100 dark:border-cyan-800">
                                                                                <h4 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-cyan-600 dark:text-cyan-400">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Support:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-cyan-800 dark:text-cyan-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiSupport
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.aiIntegration && (
                                                                            <div className="bg-violet-50 dark:bg-violet-900/30 p-2 rounded-md border border-violet-100 dark:border-violet-800">
                                                                                <h4 className="font-semibold text-violet-900 dark:text-violet-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-violet-600 dark:text-violet-400">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Integration:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-violet-800 dark:text-violet-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiIntegration
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.aiTask && (
                                                                            <div className="bg-sky-50 dark:bg-sky-900/30 p-2 rounded-md border border-sky-100 dark:border-sky-800">
                                                                                <h4 className="font-semibold text-sky-900 dark:text-sky-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-sky-600 dark:text-sky-400">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-sky-800 dark:text-sky-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiTask
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.handsOn && (
                                                                            <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-md border border-green-100 dark:border-green-800">
                                                                                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-green-600 dark:text-green-400">
                                                                                        ✋
                                                                                    </span>
                                                                                    Hands-On:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-green-800 dark:text-green-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.handsOn
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.handsOnTask && (
                                                                            <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-md border border-green-100 dark:border-green-800">
                                                                                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-green-600 dark:text-green-400">
                                                                                        ✋
                                                                                    </span>
                                                                                    Hands-On
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-green-800 dark:text-green-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.handsOnTask
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.task && (
                                                                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-md border border-indigo-100 dark:border-indigo-800">
                                                                                <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-indigo-600 dark:text-indigo-400">
                                                                                        ✅
                                                                                    </span>
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-indigo-800 dark:text-indigo-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.task
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.deliverable && (
                                                                            <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md border border-purple-100 dark:border-purple-800">
                                                                                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-purple-600 dark:text-purple-400">
                                                                                        📦
                                                                                    </span>
                                                                                    Deliverables:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-purple-800 dark:text-purple-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.deliverable
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.exercise && (
                                                                            <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-md border border-orange-100 dark:border-orange-800">
                                                                                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-orange-600 dark:text-orange-400">
                                                                                        📝
                                                                                    </span>
                                                                                    Exercise:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-orange-800 dark:text-orange-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.exercise
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.practice && (
                                                                            <div className="bg-pink-50 dark:bg-pink-900/30 p-2 rounded-md border border-pink-100 dark:border-pink-800">
                                                                                <h4 className="font-semibold text-pink-900 dark:text-pink-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-pink-600 dark:text-pink-400">
                                                                                        🎯
                                                                                    </span>
                                                                                    Practice:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-pink-800 dark:text-pink-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.practice
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.simulation && (
                                                                            <div className="bg-rose-50 dark:bg-rose-900/30 p-2 rounded-md border border-rose-100 dark:border-rose-800">
                                                                                <h4 className="font-semibold text-rose-900 dark:text-rose-300 mb-1 flex items-center gap-1 text-xs">
                                                                                    <span className="text-rose-600 dark:text-rose-400">
                                                                                        🎮
                                                                                    </span>
                                                                                    Simulation:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-rose-800 dark:text-rose-200">
                                                                                    {renderTextWithBold(
                                                                                        topic.simulation
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
