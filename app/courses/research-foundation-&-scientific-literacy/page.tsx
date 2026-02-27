"use client";
import { useState, useEffect } from "react";
import ResearchFoundationHeroSection from "./components/ResearchFoundationHeroSection";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";
import WhatYouGet from "./components/WhatYouGet";
import ResourcePersons from "./components/ResourcePersons";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import BookTheCallCard from "@/components/BookTheCallCard";
import EnrollmentModal from "@/components/course/EnrollmentModal";

const ResearchFoundationScientificLiteracy = () => {
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
        title: "Research Foundation & Scientific Literacy",
        description:
            "কোর্সটি বৈজ্ঞানিক গবেষণার মূল ভিত্তি এবং Critical thinking দক্ষতা অর্জনে ডিজাইন করা হয়েছে। এই কোর্সটি শিক্ষার্থী, নবীন গবেষক এবং পেশাজীবীদের জন্য আদর্শ, যারা বৈজ্ঞানিক গবেষণায় শক্তিশালী ভিত্তি তৈরি করতে এবং তাদের গবেষণা দক্ষতা উন্নত করতে চান।\n\nকোর্সটিতে শেখানো হবে:\n• বৈজ্ঞানিক অনুসন্ধান ও গবেষণা নকশার মৌলিক নীতি\n• গবেষণা প্রবন্ধ ও প্রকাশিত সাহিত্য সমালোচনামূলকভাবে মূল্যায়ন করার কৌশল\n• তথ্য বিশ্লেষণ ও ফলাফল ব্যাখ্যা করার দক্ষতা\n• বৈজ্ঞানিক ফলাফল স্পষ্টভাবে লিখিত এবং মৌখিকভাবে উপস্থাপন করার কৌশল\n• সমস্যা সমাধান এবং সমালোচনামূলক চিন্তাভাবনা বিকাশের জন্য প্রয়োজনীয় দক্ষতা",
        price: 5000,
        originalPrice: 8000,
        currency: "৳",
        thumbnailUrl: "/courses/ClinicalRFoundation.jpg",
        checkoutLink: "/checkout?course=research-foundation",
        enrollButtonText: "Enroll in Batch →",
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
                courseId: "research-foundation-scientific-literacy",
                courseName: courseData.title,
                coursePrice: courseData.price,
                courseOriginalPrice: courseData.originalPrice,
                currency: "BDT",
                courseCategory: "Clinical Research",
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
                            item_id: "research-foundation-scientific-literacy",
                            item_name: courseData.title,
                            item_category: "Clinical Research",
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
                courseId="research-foundation-scientific-literacy"
            />

            {/* Hero Section */}
            <ResearchFoundationHeroSection
                courseData={courseData}
                onEnrollClick={handleEnrollmentClick}
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

export default ResearchFoundationScientificLiteracy;
