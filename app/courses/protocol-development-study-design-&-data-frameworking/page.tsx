"use client";
import { useState } from "react";
import ProtocolDevelopmentHeroSection from "./components/ProtocolDevelopmentHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import EnrollmentModal from "@/components/course/EnrollmentModal";

const ProtocolDevelopmentStudyDesignDataFrameworking = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Protocol Development, Study Design & Data Frameworking",
        description:
            "এই কোর্সটি সেই সকল শিক্ষার্থী, নবীন গবেষক এবং পেশাজীবীদের জন্য তৈরি, যারা <strong>Protocol Writing</strong>, <strong>Study Design</strong>, <strong>Variable Frameworking</strong> এবং <strong>Data Architecture</strong>-কে পেশাদার লেভেলে আয়ত্ত করতে আগ্রহী। বাস্তব <strong>clinical research projects</strong>, <strong>healthcare studies</strong> এবং <strong>academic research</strong>-এর জন্য প্রয়োজনীয় স্কিল শেখানোর মাধ্যমে এই কোর্স অংশগ্রহণকারীদের <strong>publication</strong>, <strong>thesis improvement</strong> এবং <strong>industry-grade trial setup</strong> এ প্রস্তুত করবে।\n\nকোর্সটিতে শেখানো হবে:\n• <strong>Study Design & Research Frameworks:</strong> RCT, Case-Control, Cohort, Cross-Sectional এবং Qualitative designs সহ বিভিন্ন গবেষণা মডেলের ব্যবহার, উপযোগিতা ও বাস্তব প্রয়োগ\n• <strong>Professional Protocol Development:</strong> Background, Rationale, Objectives, Methodology, Variables, Sampling Strategy, Sample Size, Ethics এবং Statistical Analysis Plan, সহ একটি সম্পূর্ণ protocol তৈরির essential steps\n• <strong>Data Architecture & Master-Sheet Design:</strong> Variable coding, labeling, scoring rules, derived variables এবং গবেষণা-উপযোগী master dataset structure নির্মাণের practical techniques\n• <strong>CRF (Case Report Form) Development:</strong> Data capture logic, operational feasibility assessment এবং study workflow অনুযায়ী CRF ডিজাইন ও refinement\n• <strong>Sampling Strategy & Bias Control:</strong> Recruitment flow, sampling methods, endpoint definition, bias minimization এবং quality assurance principles\n• <strong>International Guidelines Alignment:</strong> STROBE, CONSORT এবং SPIRIT guideline অনুসারে protocol structure alignment ও real-world protocol critiquing এবং publication-ready refinement strategies",
        price: 7000,
        originalPrice: 11000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/ClinicalProtocol.jpg",
        checkoutLink: "/checkout?course=protocol-development",
        videoLabel: "Click to watch the demo class",
        enrollButtonText: "Enroll in Batch →",
        enrollButtonTextShort: "Enroll Now",
        promoLabel: "Promo Applied",
        liveCourseLabel: "Live Course",
    };

    return (
        <div className="pb-24">
            {/* Enrollment Modal */}
            <EnrollmentModal
                isOpen={isEnrollmentModalOpen}
                onClose={() => setIsEnrollmentModalOpen(false)}
                courseTitle={courseData.title}
                coursePrice={courseData.price}
                courseId="protocol-development-study-design-data-frameworking"
            />

            {/* Video Modal */}
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVideoPlaying(false)}
                            className="absolute -top-12 right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            ✕
                        </button>
                        {/* Video Container */}
                        <div className="relative aspect-video bg-black dark:bg-gray-900 rounded-lg overflow-hidden">
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
            <ProtocolDevelopmentHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* Course Module */}
            <CourseModule />

            {/* Resource Persons */}
            <ResourcePersons />

            {/* What You Get */}
            <WhatYouGet />


            {/* Who This Course is For */}
            <WhoThisCourseIsFor />


            {/* What You Need */}
            <WhatYouNeed />

            {/* FAQ */}
            <FAQ />

            {/* Sticky Bottom Bar */}
            <StickyEnrollmentBar
                price={courseData.price}
                originalPrice={courseData.originalPrice}
                currency={courseData.currency}
                promoLabel={courseData.promoLabel}
                enrollButtonText={courseData.enrollButtonText}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
                showPromo={true}
            />
        </div>
    );
};

export default ProtocolDevelopmentStudyDesignDataFrameworking;
