"use client";
import { useState } from "react";
import BiostatisticsHeroSection from "./components/BiostatisticsHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import BookTheCallCard from "@/components/BookTheCallCard";
import EnrollmentModal from "@/components/course/EnrollmentModal";

const BiostatisticsDataAnalysisEvidenceInterpretation = () => {
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
        title: "Biostatistics, Data Analysis & Evidence Interpretation",
        description:
            "এই কোর্সটি শিক্ষার্থী, নবীন গবেষক এবং পেশাজীবীদের জন্য প্রস্তুত করা হয়েছে, যারা hands-on statistical analysis, evidence-based interpretation এবং data visualization-এ industry-standard দক্ষতা অর্জন করতে আগ্রহী। পুরো কোর্স জুড়ে SPSS, STATA, Excel এবং AI-assisted analytics ব্যবহার করে বাস্তব গবেষণা ডেটার বিশ্লেষণ, ক্লিনিক্যাল প্রাসঙ্গিক ব্যাখ্যা এবং প্রকাশযোগ্য (publication-ready) আউটপুট তৈরির দক্ষতা উন্নয়নের ওপর বিশেষ গুরুত্ব দেওয়া হয়েছে।\n\nকোর্সটিতে শেখানো হবে:\n• Biostatistics এর মৌলিক ধারণা: descriptive statistics, probability basics, hypothesis testing (t-test, chi-square, ANOVA, correlation, regression)\n• Hands-on data analysis workflow: SPSS, STATA ও Excel ব্যবহার করে Data Management, cleaning, coding, recoding ও missing data handling\n• Study design essentials: sample size determination ও power analysis সহ গবেষণার জন্য প্রয়োজনীয় স্ট্যাটিস্টিক্যাল প্রস্তুতি\n• Research-grade data visualization: forest plot, ROC curve, Kaplan-Meier, bar-line-scatter charts সহ প্রকাশযোগ্য গ্রাফ তৈরি\n• Evidence interpretation ও AI-assisted analytics: clinical logic দ্বারা ফলাফল ব্যাখ্যা, AI-এর মাধ্যমে model suggestion, test selection, predictive insights ও visualization enhancement",
        price: 7000,
        originalPrice: 11000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/ClinicalDataAnalysis.jpg",
        checkoutLink: "/checkout?course=biostatistics",
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
                courseId="biostatistics-data-analysis-evidence-interpretation"
            />

            {/* Hero Section */}
            <BiostatisticsHeroSection
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

export default BiostatisticsDataAnalysisEvidenceInterpretation;
