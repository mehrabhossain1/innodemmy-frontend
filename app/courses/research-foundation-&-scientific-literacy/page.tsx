"use client";
import { useState } from "react";
import ResearchFoundationHeroSection from "./components/ResearchFoundationHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";

const ResearchFoundationScientificLiteracy = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        thumbnailUrl:
            "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        checkoutLink: "/checkout?course=research-foundation",
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
            <ResearchFoundationHeroSection
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

            {/* Who This Course is For */}
            <WhoThisCourseIsFor />

            {/* FAQ */}
            <FAQ />

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

export default ResearchFoundationScientificLiteracy;
