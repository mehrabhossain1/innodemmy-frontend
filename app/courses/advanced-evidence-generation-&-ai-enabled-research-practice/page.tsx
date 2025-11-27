"use client";
import { useState } from "react";
import AdvancedEvidenceHeroSection from "./components/AdvancedEvidenceHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";

const AdvancedEvidenceGenerationAiEnabledResearchPractice = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Advanced Evidence Generation & AI-Enabled Research Practice",
        description:
            "এই কোর্সটি তৈরি করা হয়েছে সেই গবেষক, ক্লিনিশিয়ান, এবং ডেটা-driven পেশাজীবীদের জন্য যারা traditional evidence generation থেকে আরও এক ধাপ এগিয়ে AI-powered research ecosystem-এ কাজ করতে চান। এখানে আপনি শিখবেন কীভাবে systematic review, meta-analysis, RWE (Real-World Evidence), and AI-assisted analytics মিলিয়ে industry-grade evidence products তৈরি করতে হয় ঠিক যেভাবে top-tier CROs এবং global pharma companies করে থাকে।\n\nকোর্সটিতে শেখানো হবে:\n• Systematic Review & Meta-Analysis এর advanced frameworks (PRISMA 2020, MOOSE)\n• AI-assisted literature mining, screening, risk-of-bias assessment (e.g., automation tools)\n• RWE pipelines — EHR, registry data, observational datasets, claims data থেকে evidence generation\n• AI-driven outcome modeling, prediction insights, and pattern recognition\n• Drug-evidence mapping, therapeutic area deep dives, pharmacoepidemiology logic\n• Evidence synthesis for regulatory dossiers, value-propositions, and HTA alignment\n• Advanced data visualization (automated forest plot, network meta-analysis visuals)\n• AI tools for research workflow acceleration (search, screening, statistics, interpretation, writing)\n• How global CROs build evidence packages: strategy, workflow, quality benchmarking",
        price: 8000,
        originalPrice: 12000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/ClinicalAdvanced.jpg",
        checkoutLink: "/checkout?course=advanced-evidence-generation",
        videoLabel: "Click to watch the demo class",
        enrollButtonText: "Enroll in Batch →",
        enrollButtonTextShort: "Enroll Now",
        promoLabel: "Promo Applied",
        liveCourseLabel: "Live Course",
    };

    return (
        <div className="pb-24">
            {/* Video Modal */}
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVideoPlaying(false)}
                            className="absolute -top-12 right-0 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            ✕
                        </button>
                        {/* Video Container */}
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src={courseData.videoUrl}
                                title={courseData.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <AdvancedEvidenceHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
            />

            {/* Course Module */}
            <CourseModule />

            {/* Sticky Bottom Bar */}
            <StickyEnrollmentBar
                price={courseData.price}
                originalPrice={courseData.originalPrice}
                currency={courseData.currency}
                promoLabel={courseData.promoLabel}
                enrollButtonText={courseData.enrollButtonText}
                checkoutLink={courseData.checkoutLink}
                showPromo={true}
            />
        </div>
    );
};

export default AdvancedEvidenceGenerationAiEnabledResearchPractice;
