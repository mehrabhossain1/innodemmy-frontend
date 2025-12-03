"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "@/components/course/SectionTitle";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQ() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "Do I need prior coding experience for Physical Design?",
            answer: "No. Basic scripting knowledge in TCL, Shell, or Python is sufficient. All necessary coding and automation skills will be taught during the course.",
        },
        {
            question: "Can I practice from home?",
            answer: "Yes! The course uses open-source flows such as OpenROAD, OpenLANE, Magic, KLayout, and the Sky130 PDK, all of which can be accessed from any computer with internet connectivity.",
        },
        {
            question: "How is this course helpful for jobs?",
            answer: "Physical Design Engineers are in high demand worldwide, including in Bangladesh. This course equips you with hands-on skills, real projects, and interview preparation, making you job-ready for semiconductor and chip design companies.",
        },
        {
            question: "Will I get real projects to showcase?",
            answer: "Absolutely. You will work on end-to-end design projects, taking designs from RTL to GDSII, which can be included in your portfolio or GitHub to impress employers.",
        },
        {
            question: "Do I need chip fabrication knowledge?",
            answer: "Not in detail. A basic understanding of CMOS technology is enough. Actual fabrication is handled by foundries.",
        },
        {
            question: "Will I get help with job preparation?",
            answer: "Yes. The course includes interview preparation, CV review, mock tests, and guidance on presenting your projects professionally.",
        },
        {
            question: "What tools and software will I use?",
            answer: "You will primarily use open-source EDA tools (OpenROAD, OpenLANE, Magic, KLayout) and Sky130 PDK for all practical exercises. Optional exposure to industry-standard tools may also be discussed.",
        },
        {
            question:
                "Can I take this course if I am a complete beginner in VLSI?",
            answer: "Yes! The course starts from the basics of digital design and gradually moves to advanced physical design concepts. Prior VLSI knowledge is helpful but not mandatory.",
        },
        {
            question: "Is this course suitable for students and professionals?",
            answer: "Yes! Both undergraduate/graduate students and working professionals looking to upskill in Physical Design will benefit from this course.",
        },
        {
            question: "Will I get lifetime access to course materials?",
            answer: "Yes, all course videos, resources, and project templates are available for lifetime access.",
        },
        {
            question: "Can I interact with instructors for doubts?",
            answer: "Yes, you can get daily support sessions, live Q&A, and community assistance to resolve any questions while practicing.",
        },
        {
            question: "Will I get support on installing the tools on my PC?",
            answer: "Yes! You will receive step-by-step guidance to install and configure all required tools (like OpenROAD, PDKs, etc.) on your computer.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="Frequently Asked Questions (FAQ)" />

            <div className="max-w-3xl mx-auto space-y-3">
                {faqs.map((faq, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div
                            key={index}
                            className={`bg-white dark:bg-gray-800 rounded-lg border transition-all duration-300 overflow-hidden ${
                                isExpanded
                                    ? "border-primary dark:border-primary shadow-md"
                                    : "border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md"
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                            >
                                <div className="flex items-start gap-3 flex-1 pr-4">
                                    <span
                                        className={`font-bold text-base flex-shrink-0 ${
                                            isExpanded
                                                ? "text-primary"
                                                : "text-gray-400 dark:text-gray-500"
                                        }`}
                                    >
                                        Q{index + 1}.
                                    </span>
                                    <h3
                                        className={`font-semibold text-base leading-snug ${
                                            isExpanded
                                                ? "text-primary"
                                                : "text-gray-900 dark:text-white"
                                        }`}
                                    >
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0">
                                    {isExpanded ? (
                                        <Minus className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    )}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="px-4 pb-4">
                                    <div className="pl-9 border-l-2 border-primary/20 dark:border-primary/30 ml-1">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pl-3">
                                            {faq.answer}
                                        </p>
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
