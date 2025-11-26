"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQ() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "Is the course online or offline?",
            answer: "The course is fully online, providing flexibility to learn at your own pace.",
        },
        {
            question: "Will I receive a certificate after completion?",
            answer: "Yes, an internationally recognized certificate will be awarded upon successfully completing the program.",
        },
        {
            question: "Do I need prior experience in clinical research?",
            answer: "Yes, You will need understanding of medical or science-related subjects.",
        },
        {
            question: "How long is the course?",
            answer: "The program is designed to be completed in 10–12 weeks",
        },
        {
            question: "How can I register for the course?",
            answer: "Registration is simple: visit our website, complete the online form, and secure your spot in the program.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Frequently Asked Questions (FAQ):
                </h2>
                <hr className="my-2 border-gray-200" />
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div
                            key={index}
                            className={`bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                                isExpanded ? "ring-2 ring-primary/20" : ""
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="font-bold text-primary text-lg flex-shrink-0">
                                        {index + 1}.
                                    </span>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                        {faq.question}
                                    </h3>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-gray-600 flex-shrink-0 ml-4 transition-transform duration-300 ${
                                        isExpanded ? "rotate-180" : "rotate-0"
                                    }`}
                                />
                            </button>

                            {isExpanded && (
                                <div className="px-5 pb-5 pt-2">
                                    <div className="pl-8 pr-10">
                                        <p className="text-gray-700 text-base leading-relaxed">
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
