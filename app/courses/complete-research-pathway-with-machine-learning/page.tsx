"use client";
import { useState } from "react";
import CompleteResearchHeroSection from "./components/CompleteResearchHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import WhatYouGet from "./components/WhatYouGet";
import Projects from "./components/Projects";

export default function CompleteResearchPathwayWithMachineLearning() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "what-you-get", label: "What You'll Get in This Course" },
        { id: "resource-persons", label: "Resource Persons" },
        { id: "what-you-need", label: "What You'll Need to Get Started" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "Complete Research Pathway with Machine Learning",
        description:
            "এই কোর্সটি মেশিন লার্নিং ভিত্তিক গবেষণার জন্য একটি পূর্ণাঙ্গ ও কাঠামোবদ্ধ রোডম্যাপ প্রদান করে। কোর্সটি এমনভাবে ডিজাইন করা হয়েছে যাতে শিক্ষার্থীরা আধুনিক গবেষণার জটিলতা সহজে বোঝার পাশাপাশি ধারাবাহিকভাবে একাডেমিক ও প্র্যাকটিক্যাল দক্ষতা অর্জন করতে পারে।\n\nকোর্সে মেশিন লার্নিংয়ের মৌলিক ধারণা থেকে শুরু করে Computer Vision ও NLP এর মত  Advanced Deep learning topics এবং গবেষণার প্রতিটি ধাপ বিস্তারিতভাবে আলোচনা করা হবে—গবেষণার প্রশ্ন নির্ধারণ, ডেটা সংগ্রহ ও বিশ্লেষণ, মডেল উন্নয়ন, ফলাফল মূল্যায়ন, এবং গবেষণাপত্র রচনা ও উপস্থাপনা।\n\nসাথে, বাস্তবমুখী প্রশিক্ষণ ও গবেষণা কৌশল শেখানো হবে, যা গবেষক ও পেশাজীবীদের মেশিন লার্নিং গবেষণায় সফল হতে প্রয়োজনীয় দক্ষতা অর্জনে সহায়তা করবে। কোর্সের মূল উদ্দেশ্য হলো অংশগ্রহণকারীদের মেশিন লার্নিং গবেষণায় প্রয়োজনীয় দক্ষতা অর্জনে সক্ষম করে তোলা, যাতে তারা গবেষণার প্রতিটি ধাপ সম্পন্ন করে গুণগতমানসম্পন্ন গবেষণাপত্র রচনা করতে পারে।",
        price: 20000,
        originalPrice: 35000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        checkoutLink: "/checkout?course=complete-research-pathway-ml",
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
                courseId="complete-research-pathway-with-machine-learning"
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
            <CompleteResearchHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course Module */}
            <div id="course-module">
                {/* TODO: Add CourseModule component */}
            </div>

            {/* What You Get */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Projects */}
            <div id="projects">
                <Projects />
            </div>

            {/* Resource Persons */}
            <div id="resource-persons">
                {/* TODO: Add ResourcePersons component */}
            </div>

            {/* What You Need */}
            <div id="what-you-need">
                {/* TODO: Add WhatYouNeed component */}
            </div>

            {/* Who This Course is For */}
            <div id="who-this-for">
                {/* TODO: Add WhoThisCourseIsFor component */}
            </div>

            {/* FAQ */}
            <div id="faq">{/* TODO: Add FAQ component */}</div>

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
