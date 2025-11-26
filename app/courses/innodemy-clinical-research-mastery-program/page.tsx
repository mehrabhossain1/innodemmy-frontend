"use client";
import { useState } from "react";
import ClinicalResearchHeroSection from "@/app/courses/innodemy-clinical-research-mastery-program/components/ClinicalResearchHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import WhatYouGet from "./components/WhatYouGet";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import ResourcePersons from "./components/ResourcePersons";

const InnodemyClinicalResearchMasteryProgram = () => {
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
        title: "Innodemy Clinical Research Mastery Program",
        description:
            "INNODEMY ক্লিনিকাল রিসার্চ মাস্টারি প্রোগ্রাম একটি পূর্ণাঙ্গ প্রশিক্ষণ যা আপনাকে ক্লিনিকাল রিসার্চের গুরুত্বপূর্ণ ধারণা এবং প্র্যাকটিক্যাল দক্ষতা অর্জনে সাহায্য করবে। এই প্রোগ্রামের মাধ্যমে জটিল বিষয়গুলো সহজ ও কার্যকরভাবে শেখানো হয়, যাতে শিক্ষার্থী ও পেশাজীবীরা থিওরি থেকে প্র্যাকটিক্যাল পর্যন্ত পুরো প্রক্রিয়াটি আয়ত্ত করতে পারেন।\nকোর্সটিতে আপনি শিখবেন গবেষণা নকশা, ক্লিনিকাল ট্রায়ালের নিয়মনীতি ও নৈতিক মানদণ্ড, ডেটা কালেকশন ও বিশ্লেষণ, এবং গবেষণা প্রবন্ধ লিখন ও প্রকাশনার দক্ষতা। এছাড়া, বাস্তব উদাহরণ ও হাতেকলমে অভিজ্ঞতার মাধ্যমে আপনি শুধুমাত্র ধারণা অর্জনই করবেন না, বরং প্রফেশনাল পরিবেশে এগুলো প্রয়োগ করতে সক্ষম হবেন।\nএই প্রোগ্রামটি শিক্ষার্থী, স্বাস্থ্য ও মেডিকেল পেশাজীবী, এবং গবেষক যেকোনো স্তরের জন্য উপযোগী। কোর্স শেষ করার পর, আপনি ক্লিনিকাল রিসার্চ প্রজেক্টে কার্যকরভাবে অংশগ্রহণ করতে পারবেন, আন্তর্জাতিক মানের গবেষণা প্রবন্ধ তৈরি ও প্রকাশ করতে পারবেন, এবং আপনার পেশাদার ক্যারিয়ারকে আরও শক্তিশালী করতে সক্ষম হবেন।",
        price: 15000,
        originalPrice: 24000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        checkoutLink: "/checkout?course=clinical-research",
        videoLabel: "ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস",
        enrollButtonText: "ব্যাচে ভর্তি হোন →",
        enrollButtonTextShort: "Enroll Now",
        promoLabel: "প্রোমো অ্যাপ্লাইড",
        liveCourseLabel: "লাইভ কোর্স",
    };

    return (
        <div className="pb-24">
            {/* Enrollment Modal */}
            <EnrollmentModal
                isOpen={isEnrollmentModalOpen}
                onClose={() => setIsEnrollmentModalOpen(false)}
                courseTitle={courseData.title}
                coursePrice={courseData.price}
                courseId="innodemy-clinical-research-mastery-program"
            />

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
            <ClinicalResearchHeroSection
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

            {/* What You'll Get Section */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Resource Persons Section */}
            <div id="resource-persons">
                <ResourcePersons />
            </div>

            {/* What You'll Need Section */}
            <div id="what-you-need">
                <WhatYouNeed />
            </div>

            {/* Who This Course is For Section */}
            <div id="who-this-for">
                <WhoThisCourseIsFor />
            </div>

            {/* FAQ Section */}
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

export default InnodemyClinicalResearchMasteryProgram;
