"use client";
import { useState } from "react";
import ResearchFoundationHeroSection from "./components/ResearchFoundationHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import EnrollmentModal from "@/components/course/EnrollmentModal";

const ResearchFoundationScientificLiteracy = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "what-you-get", label: "What You will Get in This Course" },
        { id: "resource-persons", label: "Resource Persons" },
        { id: "what-you-need", label: "What You will Need to Get Started" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "Research Foundation & Scientific Literacy",
        description:
            "কোর্সটি বৈজ্ঞানিক গবেষণার মূল ভিত্তি এবং Critical thinking দক্ষতা অর্জনে ডিজাইন করা হয়েছে। এই কোর্সটি শিক্ষার্থী, নবীন গবেষক এবং পেশাজীবীদের জন্য আদর্শ, যারা বৈজ্ঞানিক গবেষণায় শক্তিশালী ভিত্তি তৈরি করতে এবং তাদের গবেষণা দক্ষতা উন্নত করতে চান।\n\nকোর্সটিতে শেখানো হবে:\n• বৈজ্ঞানিক অনুসন্ধান ও গবেষণা নকশার মৌলিক নীতি\n• গবেষণা প্রবন্ধ ও প্রকাশিত সাহিত্য সমালোচনামূলকভাবে মূল্যায়ন করার কৌশল\n• তথ্য বিশ্লেষণ ও ফলাফল ব্যাখ্যা করার দক্ষতা\n• বৈজ্ঞানিক ফলাফল স্পষ্টভাবে লিখিত এবং মৌখিকভাবে উপস্থাপন করার কৌশল\n• সমস্যা সমাধান এবং সমালোচনামূলক চিন্তাভাবনা বিকাশের জন্য প্রয়োজনীয় দক্ষতা",
        price: 5000,
        originalPrice: 8000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/ClinicalRFoundation.jpg",
        checkoutLink: "/checkout?course=research-foundation",
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
                courseId="research-foundation-scientific-literacy"
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
            <ResearchFoundationHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course Module */}
            <div id="course-module">
                <CourseModule />
            </div>

            {/* What You Get */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Resource Persons */}
            <div id="resource-persons">
                <ResourcePersons />
            </div>

            {/* What You Need */}
            <div id="what-you-need">
                <WhatYouNeed />
            </div>

            {/* Who This Course is For */}
            <div id="who-this-for">
                <WhoThisCourseIsFor />
            </div>

            {/* FAQ */}
            <div id="faq">
                <FAQ />
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

export default ResearchFoundationScientificLiteracy;
