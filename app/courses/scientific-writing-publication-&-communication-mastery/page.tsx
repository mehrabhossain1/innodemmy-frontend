"use client";
import { useState } from "react";
import ScientificWritingHeroSection from "./components/ScientificWritingHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";

const ScientificWritingPublicationCommunicationMastery = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Scientific Writing, Publication & Communication Mastery",
        description:
            "এই কোর্সটি ডিজাইন করা হয়েছে শিক্ষার্থী, গবেষক এবং পেশাজীবীদের জন্য, যারা <strong>scientific writing</strong>, <strong>manuscript preparation</strong>, <strong>journal submission</strong>, <strong>peer-review communication</strong> এবং <strong>high-impact scientific communication</strong>-এ professional authority অর্জন করতে চান। কোর্সটি <strong>academic</strong>, <strong>clinical</strong> এবং <strong>industry research</strong>—এই তিন ক্ষেত্রেই globally competitive লেখালেখির দক্ষতা গড়ে তুলতে সহায়তা করবে।\n\nকোর্সটিতে শেখানো হবে:\n• <strong>Core principles of scientific writing:</strong> clarity, precision, logic, structure, and coherence\n• <strong>Manuscript structure (IMRAD):</strong> journal formatting standards, authorship rules & publication ethics\n• <strong>Literature synthesis:</strong> argument building, citation mastery, referencing strategies, critical interpretation\n• <strong>High-impact section writing:</strong> Introduction, Methods, Results & Discussion—top-tier journal standardে\n• <strong>Turnitin-safe writing:</strong> paraphrasing techniques, maintaining originality & AI-assisted refinement\n• <strong>Abstract development:</strong> structured/unstructured abstracts, graphical abstract design\n• <strong>Journal selection & submission:</strong> avoiding predatory journals, impact assessment, submission portal navigation\n• <strong>Peer-review response mastery:</strong> rebuttal drafting, revision strategy, acceptance optimization\n• <strong>Scientific communication skills:</strong> conference poster design, oral presentation techniques & slide development",
        price: 10000,
        originalPrice: 15000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        checkoutLink: "/checkout?course=scientific-writing",
        videoLabel: "ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস",
        enrollButtonText: "ব্যাচে ভর্তি হোন →",
        enrollButtonTextShort: "Enroll Now",
        promoLabel: "প্রোমো অ্যাপ্লাইড",
        liveCourseLabel: "লাইভ কোর্স",
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
            <ScientificWritingHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
            />

            {/* Course Module */}
            <CourseModule />

            {/* What You Get */}
            <WhatYouGet />

            {/* Resource Persons */}
            <ResourcePersons />

            {/* Who This Course is For */}
            <WhoThisCourseIsFor />

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

export default ScientificWritingPublicationCommunicationMastery;
