"use client";
import { useState } from "react";
import VLSIHeroSection from "@/app/courses/vlsi-physical-design-training/components/VLSIHeroSection";
import VLSICourseModule from "@/app/courses/vlsi-physical-design-training/components/VLSICourseModule";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import WhatYouGet from "@/app/courses/vlsi-physical-design-training/components/WhatYouGet";
import ToolsAndTechnologies from "@/app/courses/vlsi-physical-design-training/components/ToolsAndTechnologies";
import Projects from "@/app/courses/vlsi-physical-design-training/components/Projects";
import WhatYouNeed from "@/app/courses/vlsi-physical-design-training/components/WhatYouNeed";
import WhoThisCourseIsFor from "@/app/courses/vlsi-physical-design-training/components/WhoThisCourseIsFor";
import InstructorsAndMentors from "@/app/courses/vlsi-physical-design-training/components/InstructorsAndMentors";
import FAQ from "@/app/courses/vlsi-physical-design-training/components/FAQ";

const VlsiPhysicalDesignTraining = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "VLSI Physical Design Training",
        description:
            "VLSI Physical Design হলো সেমিকন্ডাক্টর চিপ ডেভেলপমেন্টের একটি অত্যন্ত গুরুত্বপূর্ণ ধাপ, যেখানে লজিক্যাল সার্কিটকে রূপান্তর করা হয় কার্যকর সিলিকন Layout এ। এই ধাপ সম্পন্ন হওয়ার পর ডিজাইনটি হয়ে ওঠে chip manufacturing এর জন্য প্রস্তুত।\n\nএই কোর্সে আপনি PD (Physical Design)-এর প্রয়োজনীয় প্রাথমিক জ্ঞান থেকে শুরু করে প্রতিটি ধাপ — Floorplanning, Placement, Routing, Clock Tree Synthesis (CTS), Power Planning, Physical Verification, এবং Timing Closure — বিস্তারিত ও নিখুঁতভাবে শিখবেন।\n\nশেখার পুরো প্রক্রিয়াটি হবে বাস্তব উদাহরণ, industry-grade open-source tools (primarily OpenROAD) এবং হাতে-কলমে প্র্যাকটিস-এর মাধ্যমে, যাতে আপনি সহজেই অর্জন করতে পারেন ইন্ডাস্ট্রি-রেডি স্কিলস এবং আত্মবিশ্বাসের সাথে Chip Design এ ক্যারিয়ার গড়ে তুলতে পারেন।",
        price: 18000,
        originalPrice: 30000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl: "/courses/VLSIPD.jpg",
        checkoutLink: "/checkout?course=vlsi-physical-design",
        videoLabel: "Watch Course Demo",
        enrollButtonText: "Enroll in VLSI Course →",
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
                                style={{ border: 0 }}
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
            <VLSIHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
            />

            {/* Course Module */}
            <VLSICourseModule />

            {/* What You Get */}
            <WhatYouGet />

            {/* Tools & Technologies */}
            <ToolsAndTechnologies />

            {/* Projects */}
            <Projects />

            {/* What You Need */}
            <WhatYouNeed />

            {/* Who This Course is For */}
            <WhoThisCourseIsFor />

            {/* Instructors and Mentors */}
            <InstructorsAndMentors />

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

export default VlsiPhysicalDesignTraining;
