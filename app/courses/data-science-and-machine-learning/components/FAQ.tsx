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
            question: "Can I download the videos?",
            answer: "Currently, video downloads are not available. However, you will have lifetime online access to all course videos and materials.",
        },
        {
            question: "Can I join the classes using a mobile device?",
            answer: "Yes, you can join live classes and access course content on any smartphone, tablet, or computer.",
        },
        {
            question: "Will I have lifetime access to the videos?",
            answer: "Yes, you will have lifetime access to all pre-recorded videos, live class recordings, and course resources.",
        },
        {
            question: "Where will the live classes be held?",
            answer: "All live classes are conducted online through a secure video conferencing platform. Links will be shared before each session.",
        },
        {
            question: "How will the assessments be conducted?",
            answer: "Assessments will be a mix of quizzes, assignments, and project submissions, designed to evaluate your understanding and practical skills.",
        },
        {
            question: "Will the live class recordings be available?",
            answer: "Yes, all live classes are recorded and you will have lifetime access to these recordings.",
        },
        {
            question: "Where can I get support if I face difficulties during practice?",
            answer: "You can get help during our weekly live support sessions and also through our active community forums and direct instructor support channels.",
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

