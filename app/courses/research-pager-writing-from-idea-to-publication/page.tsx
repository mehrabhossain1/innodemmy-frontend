"use client";
import { useState } from "react";
import ResearchPaperHeroSection from "./components/ResearchPaperHeroSection";
import WhatYouGet from "./components/WhatYouGet";
import FAQ from "./components/FAQ";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import EnrollmentModal from "@/components/course/EnrollmentModal";

export default function ResearchPaperWritingFromIdeaToPublication() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "resource-persons", label: "Instructors and Mentors" },
        { id: "what-you-get", label: "What You will Get in This Course" },
        { id: "projects", label: "Projects" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "what-you-need", label: "What You will Need to Get Started" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "Research Paper Writing: From Idea to Publication",
        description:
            "এই কোর্সটি গবেষণাপত্র লেখার সম্পূর্ণ প্রক্রিয়া শেখায়, শুরু থেকে প্রকাশনা পর্যন্ত। কোর্সটি এমনভাবে ডিজাইন করা হয়েছে যাতে শিক্ষার্থীরা গবেষণার প্রতিটি ধাপ সম্পর্কে স্পষ্ট ধারণা পায় এবং উচ্চমানের গবেষণাপত্র রচনা করতে সক্ষম হয়।\n\nকোর্সে গবেষণা প্রশ্ন নির্ধারণ, সাহিত্য পর্যালোচনা, গবেষণা পদ্ধতি, ডেটা সংগ্রহ ও বিশ্লেষণ, ফলাফল উপস্থাপনা, এবং গবেষণাপত্র লেখার বিভিন্ন দিক বিস্তারিতভাবে আলোচনা করা হবে। এছাড়াও, জার্নাল নির্বাচন, সাবমিশন প্রক্রিয়া, পিয়ার রিভিউ হ্যান্ডলিং এবং রিভিশন কৌশল শেখানো হবে।\n\nকোর্সের মূল উদ্দেশ্য হলো অংশগ্রহণকারীদের একটি সম্পূর্ণ গবেষণাপত্র রচনা করে আন্তর্জাতিক জার্নালে প্রকাশনার জন্য প্রস্তুত করা। ব্যবহারিক কর্মশালা, রিয়েল-টাইম ফিডব্যাক এবং হাতে-কলমে প্রশিক্ষণের মাধ্যমে শিক্ষার্থীরা গবেষণাপত্র লেখার দক্ষতা অর্জন করবে।",
        price: 8000,
        originalPrice: 15000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example&autoplay=1",

        checkoutLink: "/checkout?course=research-paper-writing",
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
                courseId="research-paper-writing-from-idea-to-publication"
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
            <ResearchPaperHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course sections */}
            <section id="what-you-get">
                <WhatYouGet />
            </section>

            <section id="faq">
                <FAQ />
            </section>

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
}
