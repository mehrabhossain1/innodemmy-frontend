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
            "Deep-dive into meta-analysis, advanced biostatistics, medical writing, and grant proposal development with automation. Move Beyond Research – Automate and Innovate with cutting-edge AI tools and methodologies.",
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
