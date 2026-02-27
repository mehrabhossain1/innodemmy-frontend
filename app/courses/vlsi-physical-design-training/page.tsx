"use client";
import { useState, useEffect } from "react";
import VLSIHeroSection from "@/app/courses/vlsi-physical-design-training/components/VLSIHeroSection";
import VLSICourseModule from "@/app/courses/vlsi-physical-design-training/components/VLSICourseModule";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import WhatYouGet from "@/app/courses/vlsi-physical-design-training/components/WhatYouGet";
// import ToolsAndTechnologies from "@/app/courses/vlsi-physical-design-training/components/ToolsAndTechnologies";
import Projects from "@/app/courses/vlsi-physical-design-training/components/Projects";
import WhatYouNeed from "@/app/courses/vlsi-physical-design-training/components/WhatYouNeed";
import WhoThisCourseIsFor from "@/app/courses/vlsi-physical-design-training/components/WhoThisCourseIsFor";
import InstructorsAndMentors from "@/app/courses/vlsi-physical-design-training/components/InstructorsAndMentors";
import FAQ from "@/app/courses/vlsi-physical-design-training/components/FAQ";
import BookTheCallCard from "@/components/BookTheCallCard";

const VlsiPhysicalDesignTraining = () => {
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "instructors", label: "Instructors and Mentors" },
        { id: "what-you-get", label: "What You will Get" },
        // { id: "tools-technologies", label: "Tools & Technologies" },
        { id: "projects", label: "Projects" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "what-you-need", label: "What You will Need" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "VLSI Physical Design Training",
        description:
            "VLSI Physical Design হচ্ছে semiconductor chip development এর একটি গুরুত্বপূর্ণ পর্যায়, যেখানে লজিক্যাল সার্কিটকে রূপান্তর করা হয় বাস্তব সিলিকন লেআউট-এ। এই ধাপ সম্পন্ন হওয়ার পরই একটি design manufacturing এর জন্য প্রস্তুত হয়ে ওঠে।\n\nএই কোর্সে আপনি Physical Design (PD) এর মৌলিক ধারণা থেকে শুরু করে প্রতিটি ধাপ যেমন Floorplanning, Placement, Routing, Clock Tree Synthesis (CTS), Power Planning, Physical Verification, Timing Closure সহ অন্যান্য প্রয়োজনীয় বিষয় অত্যন্ত সহজবোধ্য উপায়ে শিখবেন।\n\nশেখার সম্পূর্ণ প্রক্রিয়াটি সাজানো হয়েছে বাস্তব উদাহরণ, industry-grade open-source tools (OpenROAD) এবং হাতে-কলমে প্র্যাকটিসের মাধ্যমে, যাতে আপনি খুব সহজেই industry ready skills অর্জন করতে পারেন এবং আত্মবিশ্বাসের সাথে VLSI industry তে ক্যারিয়ার গড়ে তুলতে পারেন।",
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

    // GTM Data Layer - Push course page view
    useEffect(() => {
        if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
                event: "course_page_view",
                pageType: "course_detail",
                courseId: "vlsi-physical-design-training",
                courseName: courseData.title,
                coursePrice: courseData.price,
                courseOriginalPrice: courseData.originalPrice,
                currency: "BDT",
                courseCategory: "VLSI",
                courseType: "Live Course",
            });
        }
    }, [courseData.originalPrice, courseData.price, courseData.title]);

    // GTM - Track enrollment click
    const handleEnrollmentClick = () => {
        setIsEnrollmentModalOpen(true);
        if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
                event: "begin_checkout",
                ecommerce: {
                    currency: "BDT",
                    value: courseData.price,
                    items: [
                        {
                            item_id: "vlsi-physical-design-training",
                            item_name: courseData.title,
                            item_category: "VLSI",
                            price: courseData.price,
                            quantity: 1,
                        },
                    ],
                },
            });
        }
    };

    return (
        <div className="pb-24">
            {/* Enrollment Modal */}
            <EnrollmentModal
                isOpen={isEnrollmentModalOpen}
                onClose={() => setIsEnrollmentModalOpen(false)}
                courseTitle={courseData.title}
                coursePrice={courseData.price}
                courseId="vlsi-physical-design-training"
            />

            {/* Hero Section */}
            <VLSIHeroSection
                courseData={courseData}
                onEnrollClick={handleEnrollmentClick}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course Module */}
            <div id="course-module">
                <VLSICourseModule />
            </div>

            {/* Instructors and Mentors */}
            <div id="instructors">
                <InstructorsAndMentors />
            </div>

            {/* What You Get */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Tools & Technologies */}
            {/* <div id="tools-technologies">
                <ToolsAndTechnologies />
            </div> */}

            {/* Projects */}
            <div id="projects">
                <Projects />
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
                onEnrollClick={handleEnrollmentClick}
                showPromo={true}
            />
        </div>
    );
};

export default VlsiPhysicalDesignTraining;
