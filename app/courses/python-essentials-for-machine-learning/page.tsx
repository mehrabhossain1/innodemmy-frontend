"use client";
import { useState, useEffect } from "react";
import PythonHeroSection from "./components/PythonHeroSection";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import WhatYouGet from "./components/WhatYouGet";
import Projects from "./components/Projects";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import InstructorsAndMentors from "./components/InstructorsAndMentors";
import FAQ from "./components/FAQ";
import BookTheCallCard from "@/components/BookTheCallCard";
import StickyNavigation from "@/components/course/StickyNavigation";
import CourseModule from "./components/CourseModule";

export default function PythonEssentialsForMachineLearning() {
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        { id: "course-module", label: "Course Module" },
        { id: "resource-persons", label: "Instructors and Mentors" },
        { id: "what-you-get", label: "What You will Get" },
        { id: "projects", label: "Projects" },
        { id: "who-this-for", label: "Who This Course is For" },
        { id: "what-you-need", label: "What You will Need" },
        { id: "faq", label: "FAQ" },
    ];

    // Centralized Course Data
    const courseData = {
        title: "Python Essentials for Machine Learning",
        description:
            "এই কোর্সটি তৈরি করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্স শেখার পূর্বশর্ত হিসেবে একটি মজবুত পাইথন প্রোগ্রামিং ভিত্তি গড়ে তোলার জন্য। এখানে মূল লক্ষ্য হলো মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারণাগুলো দক্ষতার সাথে আয়ত্ত করা।\n\nকোর্সের মাধ্যমে আপনি পাইথনের বেসিক থেকে অ্যাডভান্সড টপিক ধাপে ধাপে হাতে-কলমে শিখবেন। এর মধ্যে থাকছে,  ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং, ফাইল হ্যান্ডলিং । এছাড়াও, কোর্সে অন্তর্ভুক্ত থাকবে ১০টি বাস্তবমুখী প্রজেক্ট, যেখানে শেখা কনসেপ্টগুলো ব্যবহার করে আপনি বাস্তব সমস্যার সমাধান করবেন। এর ফলে আপনার প্রোগ্রামিং দক্ষতা শুধু শক্তিশালী হবে না, বরং আত্মবিশ্বাসের সাথে মেশিন লার্নিং শেখার জন্য প্রস্তুতি নিতে পারবেন।",
        price: 8000,
        originalPrice: 15000,
        currency: "৳",
        thumbnailUrl: "/courses/Python.jpg",
        checkoutLink: "/checkout?course=python-essentials-for-ml",
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
                courseId: "python-essentials-for-machine-learning",
                courseName: courseData.title,
                coursePrice: courseData.price,
                courseOriginalPrice: courseData.originalPrice,
                currency: "BDT",
                courseCategory: "Machine Learning",
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
                            item_id: "python-essentials-for-machine-learning",
                            item_name: courseData.title,
                            item_category: "Machine Learning",
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
                courseId="python-essentials-for-machine-learning"
            />

            {/* Hero Section */}
            <PythonHeroSection
                courseData={courseData}
                onVideoClick={() => {}}
                onEnrollClick={handleEnrollmentClick}
            />

            {/* Sticky Navigation */}
            <StickyNavigation items={navigationItems} />

            {/* Course Module */}
            <div id="course-module">
                <CourseModule />
            </div>

            {/* Instructors and Mentors */}
            <div id="resource-persons">
                <InstructorsAndMentors />
            </div>

            {/* What You will Get Section */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Projects Section */}
            <div id="projects">
                <Projects />
            </div>
            {/* Who This Course is For Section */}
            <div id="who-this-for">
                <WhoThisCourseIsFor />
            </div>

            {/* What You will Need Section */}
            <div id="what-you-need">
                <WhatYouNeed />
            </div>

            {/* FAQ Section */}
            <div id="faq">
                <FAQ />
            </div>

            <div id="book-call">
                <BookTheCallCard />
            </div>

            {/* Sticky Enrollment Bar */}
            <StickyEnrollmentBar
                price={courseData.price}
                originalPrice={courseData.originalPrice}
                currency={courseData.currency}
                promoLabel={courseData.promoLabel}
                enrollButtonText={courseData.enrollButtonText}
                onEnrollClick={handleEnrollmentClick}
            />
        </div>
    );
}
