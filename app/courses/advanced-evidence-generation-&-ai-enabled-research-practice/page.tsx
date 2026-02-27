"use client";
import { useState } from "react";
import AdvancedEvidenceHeroSection from "./components/AdvancedEvidenceHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import ResourcePersons from "./components/ResourcePersons";
import BookTheCallCard from "@/components/BookTheCallCard";

const AdvancedEvidenceGenerationAiEnabledResearchPractice = () => {
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "resource-persons", label: "Instructors and Mentors" },
        { id: "what-you-get", label: "What You will Get" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "what-you-need", label: "What You will Need" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "Advanced Evidence Generation & AI-Enabled Research Practice",
        description:
            "এই কোর্সটি তৈরি করা হয়েছে সেই গবেষক, ক্লিনিশিয়ান, এবং ডেটা-driven পেশাজীবীদের জন্য যারা traditional evidence generation থেকে আরও এক ধাপ এগিয়ে AI-powered research ecosystem-এ কাজ করতে চান। এখানে আপনি শিখবেন কীভাবে systematic review, meta-analysis, RWE (Real-World Evidence), and AI-assisted analytics মিলিয়ে industry-grade evidence products তৈরি করতে হয় ঠিক যেভাবে top-tier CROs এবং global pharma companies করে থাকে।\n\nকোর্সটিতে শেখানো হবে:\n• Systematic Review & Meta-Analysis এর advanced frameworks (PRISMA 2020, MOOSE)\n• AI-assisted literature mining, screening, risk-of-bias assessment (e.g., automation tools)\n• RWE pipelines ,  EHR, registry data, observational datasets, claims data থেকে evidence generation\n• AI-driven outcome modeling, prediction insights, and pattern recognition\n• Drug-evidence mapping, therapeutic area deep dives, pharmacoepidemiology logic\n• Evidence synthesis for regulatory dossiers, value-propositions, and HTA alignment\n• Advanced data visualization (automated forest plot, network meta-analysis visuals)\n• AI tools for research workflow acceleration (search, screening, statistics, interpretation, writing)\n• How global CROs build evidence packages: strategy, workflow, quality benchmarking",
        price: 8000,
        originalPrice: 12000,
        currency: "৳",
        thumbnailUrl: "/courses/ClinicalAdvanced.jpg",
        checkoutLink: "/checkout?course=advanced-evidence-generation",
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
                courseId="advanced-evidence-generation-ai-enabled-research-practice"
            />

            {/* Hero Section */}
            <AdvancedEvidenceHeroSection
                courseData={courseData}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course Module */}
            <div id="course-module">
                <CourseModule />
            </div>

            {/* Resource Persons */}
            <div id="resource-persons">
                <ResourcePersons />
            </div>

            {/* What You Get */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Who This Course is For */}
            <div id="who-this-for">
                <WhoThisCourseIsFor />
            </div>

            {/* What You Need */}
            <div id="what-you-need">
                <WhatYouNeed />
            </div>

            {/* FAQ */}
            <div id="faq">
                <FAQ />
            </div>

            <div id="book-call">
                <BookTheCallCard />
            </div>

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

export default AdvancedEvidenceGenerationAiEnabledResearchPractice;
