"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    HelpCircle,
    Video,
    Smartphone,
    Clock,
    MessageCircle,
    Award,
    UserCheck,
} from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "Can I download the videos?",
            answer: "No, the videos cannot be downloaded, but you can watch them online anytime by logging into the platform.",
            icon: Video,
        },
        {
            question: "Can I join using a mobile device?",
            answer: "Yes, you can join the course from any device ,  mobile, laptop, or desktop.",
            icon: Smartphone,
        },
        {
            question: "Will I have lifetime access to the videos?",
            answer: "Yes, you will have lifetime access to the course videos (conditions apply).",
            icon: Clock,
        },
        {
            question: "Where will the live classes be held?",
            answer: "Live classes will be conducted online via Zoom.",
            icon: HelpCircle,
        },
        {
            question: "Will recordings of live classes be available?",
            answer: "Yes, all live class recordings will be uploaded to the platform for later viewing.",
            icon: Video,
        },
        {
            question:
                "Where can I get support if I face difficulties while practicing?",
            answer: "You will receive support through our WhatsApp group and dedicated Q&A sessions.",
            icon: MessageCircle,
        },
        {
            question: "Can this course help me get a job or scholarship?",
            answer: "Yes, the course is designed to build your portfolio with real projects, research guidance, and publication-ready papers, which can significantly enhance your chances of landing a job or securing a scholarship.",
            icon: Award,
        },
        {
            question: "Is there any support after the course ends?",
            answer: "Yes, we provide exclusive post-course support for research, career guidance, and project-related queries.",
            icon: UserCheck,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="mb-4 shadow-md rounded-lg overflow-hidden"
                    >
                        <AccordionTrigger className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 flex items-center space-x-3">
                            <faq.icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="bg-white p-4 text-gray-600">
                            <p className="text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
