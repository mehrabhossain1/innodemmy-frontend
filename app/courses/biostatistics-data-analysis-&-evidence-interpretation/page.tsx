"use client";
import { useState } from "react";
import BiostatisticsHeroSection from "./components/BiostatisticsHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";

const BiostatisticsDataAnalysisEvidenceInterpretation = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        thumbnailUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        checkoutLink: "/checkout?course=biostatistics",
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
            <BiostatisticsHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
            />

            {/* Course Module */}
            <CourseModule />

            {/* What You Get */}
            <WhatYouGet />

            {/* Resource Persons */}
            <ResourcePersons />

            {/* What You Need */}
            <WhatYouNeed />

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

export default BiostatisticsDataAnalysisEvidenceInterpretation;
