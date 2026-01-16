"use client";
import { useState } from "react";
import ResearchPaperHeroSection from "./components/ResearchPaperHeroSection";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import WhatYouNeed from "./components/WhatYouNeed";
import BookTheCallCard from "@/components/BookTheCallCard";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import FAQ from "./components/FAQ";
import ResourcePersons from "../advanced-evidence-generation-&-ai-enabled-research-practice/components/ResourcePersons";

export default function ResearchPaperWritingFromIdeaToPublication() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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
        title: "Research Paper Writing: From Idea to Publication",
        description:
            "এই কোর্সটি গবেষণা পত্র লেখার কৌশল থেকে শুরু করে  উচ্চমানের জার্নালে তা প্রকাশ করার পূর্ণ প্রক্রিয়া শেখানোর জন্য ডিজাইন করা হয়েছে। বিশ্ববিদ্যালয় পর্যায়ের শিক্ষার্থী, স্নাতকোত্তর গবেষক, থিসিস লেখার প্রাক্কালে থাকা শিক্ষার্থী বা যারা Academic writing এ  দক্ষতা বাড়াতে চান, সবার জন্যই কোর্সটি উপযোগী। এখানে আপনি শিখবেন কীভাবে একটি গবেষণা আইডিয়া নির্বাচন করতে হয়, উপযুক্ত গবেষণা প্রশ্ন তৈরি করতে হয়, এবং তার ভিত্তিতে একটি সুগঠিত ও যুক্তিসম্মত গবেষণা পত্র প্রস্তুত করতে হয়।\n\nপ্রতিটি অধ্যায়ে থাকবে বাস্তব উদাহরণ এবং হাতে-কলমে অনুশীলন, যা আপনাকে শুধু থিওরি নয়, বাস্তব প্রয়োগেও দক্ষ করে তুলবে। আপনি জানবেন কীভাবে Plagiarism এড়াতে হয় এবং কীভাবে গবেষণাকে মৌলিক ও মূল্যবান করে তোলা যায়।\n\nএই কোর্সের শেষে আপনি নিজেই একটি সম্পূর্ণ গবেষণা পত্র প্রস্তুত করতে পারবেন এবং তা একটি প্রাসঙ্গিক একাডেমিক বা পিয়ার-রিভিউড জার্নালে জমা দেওয়ার জন্য দক্ষতা অর্জন করবেন। এটি আপনার একাডেমিক ক্যারিয়ারে একটি গুরুত্বপূর্ণ মাইলফলক হতে পারে।",
        price: 8000,
        originalPrice: 15000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example&autoplay=1",

        thumbnailUrl: "/courses/research-paper-writing.jpeg",

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
            <section id="course-module">
                <CourseModule />
            </section>

            <section id="resource-persons">
                <ResourcePersons />
            </section>

            <section id="what-you-get">
                <WhatYouGet />
            </section>

            <section id="projects">
                {/* Projects component will be added here */}
            </section>

            <section id="who-this-for">
                <WhoThisCourseIsFor />
            </section>

            <section id="what-you-need">
                <WhatYouNeed />
            </section>

            <section id="faq">
                <FAQ />
            </section>

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
}
