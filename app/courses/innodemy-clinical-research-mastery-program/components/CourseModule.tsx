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
        tierLabel: "Tier",
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
        tierLabel: "Tier",
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
        tierLabel: "Tier",
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
        tierLabel: "Tier",
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
        tierLabel: "Tier",
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
            "Apply all learning to a real project—complete protocol, dataset, manuscript, and defend findings before expert panel.",
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
                                        {module.liveClasses !== undefined &&
                                            module.liveClasses > 0 && (
                                                <div className="flex items-center gap-1.5">
                                                    <Video className="w-4 h-4" />
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
                                    {/* Subtitle */}
                                    {module.subtitle && (
                                        <div className="mb-4 text-center px-4">
                                            <p
                                                className={`text-[10px] italic font-semibold bg-clip-text text-transparent leading-snug ${
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
                                                    ? "border-blue-300 bg-blue-50/50"
                                                    : module.id === 2
                                                    ? "border-red-300 bg-red-50/50"
                                                    : module.id === 3
                                                    ? "border-green-300 bg-green-50/50"
                                                    : module.id === 4
                                                    ? "border-amber-300 bg-amber-50/50"
                                                    : module.id === 5
                                                    ? "border-purple-300 bg-purple-50/50"
                                                    : "border-teal-300 bg-teal-50/50";

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`border rounded-lg p-2.5 transition-all duration-300 ${
                                                        isTopicExpanded
                                                            ? `${borderColor} shadow-sm`
                                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-start gap-2 text-gray-700 hover:text-gray-900 transition-colors ${
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
                                                        <span className="font-bold text-gray-900 min-w-[20px] text-base">
                                                            {topic.id}.
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="leading-tight font-semibold text-base">
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
                                                                    <div className="mt-3 space-y-2.5 text-sm text-gray-600">
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

                                                                        {topic.aiIntegration && (
                                                                            <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                                                                                <h4 className="font-semibold text-violet-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-violet-600">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Integration:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-violet-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiIntegration
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.aiTask && (
                                                                            <div className="bg-sky-50 p-3 rounded-lg border border-sky-100">
                                                                                <h4 className="font-semibold text-sky-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-sky-600">
                                                                                        🤖
                                                                                    </span>
                                                                                    AI
                                                                                    Task:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-sky-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.aiTask
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.handsOn && (
                                                                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                                                <h4 className="font-semibold text-green-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-green-600">
                                                                                        ✋
                                                                                    </span>
                                                                                    Hands-On:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-green-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.handsOn
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
                                                                                    Deliverables:
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

                                                                        {topic.practice && (
                                                                            <div className="bg-pink-50 p-3 rounded-lg border border-pink-100">
                                                                                <h4 className="font-semibold text-pink-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-pink-600">
                                                                                        🎯
                                                                                    </span>
                                                                                    Practice:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-pink-800">
                                                                                    {renderTextWithBold(
                                                                                        topic.practice
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {topic.simulation && (
                                                                            <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                                                                                <h4 className="font-semibold text-rose-900 mb-1.5 flex items-center gap-1.5 text-base">
                                                                                    <span className="text-rose-600">
                                                                                        🎮
                                                                                    </span>
                                                                                    Simulation:
                                                                                </h4>
                                                                                <p className="leading-relaxed text-rose-800">
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
