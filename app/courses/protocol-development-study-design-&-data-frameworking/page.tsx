"use client";
import { useState } from "react";
import ProtocolDevelopmentHeroSection from "./components/ProtocolDevelopmentHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";

const ProtocolDevelopmentStudyDesignDataFrameworking = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Protocol Development, Study Design & Data Frameworking",
        description:
            "এই কোর্সটি সেই সকল শিক্ষার্থী, নবীন গবেষক এবং পেশাজীবীদের জন্য তৈরি, যারা <strong>Protocol Writing</strong>, <strong>Study Design</strong>, <strong>Variable Frameworking</strong> এবং <strong>Data Architecture</strong>-কে পেশাদার লেভেলে আয়ত্ত করতে আগ্রহী। বাস্তব <strong>clinical research projects</strong>, <strong>healthcare studies</strong> এবং <strong>academic research</strong>-এর জন্য প্রয়োজনীয় স্কিল শেখানোর মাধ্যমে এই কোর্স অংশগ্রহণকারীদের <strong>publication</strong>, <strong>thesis improvement</strong> এবং <strong>industry-grade trial setup</strong> এ প্রস্তুত করবে।",
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
            <ProtocolDevelopmentHeroSection
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

export default ProtocolDevelopmentStudyDesignDataFrameworking;
