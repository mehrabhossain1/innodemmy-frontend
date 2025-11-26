"use client";
import { useState } from "react";
import VLSIHeroSection from "@/app/courses/vlsi-physical-design-training/components/VLSIHeroSection";
import VLSICourseModule from "@/app/courses/vlsi-physical-design-training/components/VLSICourseModule";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";

const VlsiPhysicalDesignTraining = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "VLSI Physical Design Training",
        description:
            "Master the art of VLSI Physical Design with our comprehensive training program. Learn RTL fundamentals, synthesis, physical design flow, and industry-standard tools. This hands-on course covers Unix/Linux, scripting (Bash & TCL), Verilog, and takes you through the complete physical design journey from RTL to signoff. Perfect for aspiring physical design engineers looking to excel in the semiconductor industry.",
        price: 18000,
        originalPrice: 30000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=sT1A8q-UtEtGAlOr&autoplay=1",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
