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
            question: "Is the course online or offline?",
            answer: "সম্পূর্ণ অনলাইন, high-flexibility format",
        },
        {
            question: "Will I receive a certificate after completion?",
            answer: "হ্যাঁ, একটি globally recognized certificate পাবেন",
        },
        {
            question: "Do I need previous experience in meta-analysis or AI?",
            answer: "Meta-analysis-এর basics থাকলে ভালো, তবে advanced concepts আমরা ধাপে ধাপে শেখাবো। AI tools use করা শেখানো হবে zero-to-pro level",
        },
        {
            question: "How long is the course?",
            answer: "সম্পূর্ণ প্রোগ্রাম ৩–৪ সপ্তাহে শেষ করা যায়",
        },
        {
            question: "How can I register for the course?",
            answer: "Website → Course Page → Enroll Now → details fill up → registration complete",
        },
    ];

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <SectionTitle title="FAQ" />

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
