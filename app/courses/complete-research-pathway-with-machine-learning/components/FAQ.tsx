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
            question: "How are the class sessions conducted?",
            answer: "All live sessions are conducted via Zoom using structured, instructor-led methods to ensure interactive and effective learning",
        },
        {
            question: "Can I join using a mobile device?",
            answer: "Yes, you can join the course from any device ,  mobile, laptop, or desktop",
        },
        {
            question: "Will I have lifetime access to the recorded videos?",
            answer: "No. Participants are encouraged to make full use of the live support provided throughout the program, as we believe that meaningful learning cannot be attained solely through recorded content. Session recordings may be re-broadcast when deemed necessary",
        },
        {
            question: "Will recordings of live classes be available?",
            answer: "No, we encourage you to take live support as much as you need",
        },
        {
            question:
                "Where can I get support if I face difficulties while practicing?",
            answer: "You will receive support through our WhatsApp group and dedicated Q&A sessions",
        },
        {
            question: "Can this course help me get a job or scholarship?",
            answer: "Yes, the course is designed to build your portfolio with real projects, research guidance, and publication-ready papers, which can significantly enhance your chances of landing a job or securing a scholarship",
        },
        {
            question: "Is there any support after the course ends?",
            answer: "Yes, we provide exclusive post-course support for research, career guidance, and project-related queries",
        },
        {
            question: "Do you provide support for paper submission and review?",
            answer: "Yes. We offer guidance throughout the paper submission process and provide support during the review stage to help ensure quality and compliance with publication standards",
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
