"use client";
import { useState } from "react";
import ScientificWritingHeroSection from "./components/ScientificWritingHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import EnrollmentModal from "@/components/course/EnrollmentModal";

const ScientificWritingPublicationCommunicationMastery = () => {
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
        title: "Scientific Writing, Publication & Communication Mastery",
        description:
            "এই কোর্সটি ডিজাইন করা হয়েছে শিক্ষার্থী, গবেষক এবং পেশাজীবীদের জন্য, যারা <strong>scientific writing</strong>, <strong>manuscript preparation</strong>, <strong>journal submission</strong>, <strong>peer-review communication</strong> এবং <strong>high-impact scientific communication</strong>-এ professional authority অর্জন করতে চান। কোর্সটি <strong>academic</strong>, <strong>clinical</strong> এবং <strong>industry research</strong>, এই তিন ক্ষেত্রেই globally competitive লেখালেখির দক্ষতা গড়ে তুলতে সহায়তা করবে।\n\nকোর্সটিতে শেখানো হবে:\n• <strong>Core principles of scientific writing:</strong> clarity, precision, logic, structure, and coherence\n• <strong>Manuscript structure (IMRAD):</strong> journal formatting standards, authorship rules & publication ethics\n• <strong>Literature synthesis:</strong> argument building, citation mastery, referencing strategies, critical interpretation\n• <strong>High-impact section writing:</strong> Introduction, Methods, Results & Discussion, top-tier journal standardে\n• <strong>Turnitin-safe writing:</strong> paraphrasing techniques, maintaining originality & AI-assisted refinement\n• <strong>Abstract development:</strong> structured/unstructured abstracts, graphical abstract design\n• <strong>Journal selection & submission:</strong> avoiding predatory journals, impact assessment, submission portal navigation\n• <strong>Peer-review response mastery:</strong> rebuttal drafting, revision strategy, acceptance optimization\n• <strong>Scientific communication skills:</strong> conference poster design, oral presentation techniques & slide development",
        price: 10000,
        originalPrice: 15000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/scintificwriting.jpg",
        checkoutLink: "/checkout?course=scientific-writing",
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
                courseId="scientific-writing-publication-communication-mastery"
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
            <ScientificWritingHeroSection
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

export default ScientificWritingPublicationCommunicationMastery;
