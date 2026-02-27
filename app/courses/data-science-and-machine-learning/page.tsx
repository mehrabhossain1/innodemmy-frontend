"use client";
import { useState, useEffect } from "react";
import DataScienceHeroSection from "./components/DataScienceHeroSection";
import WhatYouGet from "./components/WhatYouGet";
import Projects from "./components/Projects";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import FAQ from "./components/FAQ";
import CourseModule from "./components/CourseModule";
import StickyNavigation from "@/components/course/StickyNavigation";
import StickyEnrollmentBar from "@/components/course/StickyEnrollmentBar";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import ResourcePersons from "../advanced-evidence-generation-&-ai-enabled-research-practice/components/ResourcePersons";
import BookTheCallCard from "@/components/BookTheCallCard";

export default function DataScienceAndMachineLearning() {
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
        title: "Data Science and Machine Learning",
        description:
            "এই স্পেশালাইজেশনটি এমনভাবে পরিকল্পনা করা হয়েছে, যাতে আপনি একদিকে মেশিন লার্নিং ও ডেটা সায়েন্সের দৃঢ় একাডেমিক ভিত্তি গড়ে তুলতে পারেন, আর অন্যদিকে প্রকৃত সমস্যার সমাধানে কাজ করে বাস্তবভিত্তিক ইন্ডাস্ট্রি-প্রয়োজনীয় দক্ষতা অর্জন করতে পারেন।\n\nপুরো কোর্সজুড়ে আপনি বাস্তব ডেটাসেট ব্যবহার করে হাতে-কলমে প্রজেক্ট করবেন, প্রতিটি ধাপে শিখবেন কীভাবে মডেল তৈরি, বিশ্লেষণ ও অপটিমাইজেশন করতে হয়, এবং সেগুলোর ফলাফল কীভাবে ব্যাখ্যা ও উপস্থাপন করা যায়। পাশাপাশি, আপনি বিকাশ ঘটাবেন গবেষণাভিত্তিক চিন্তাভাবনা ও সমালোচনামূলক বিশ্লেষণের দক্ষতা—যা একাডেমিক গবেষণা ও ইন্ডাস্ট্রিয়াল অ্যাপ্লিকেশন—দুই ক্ষেত্রেই সমানভাবে গুরুত্বপূর্ণ।\n\nএই কোর্স থেকে অর্জিত জ্ঞান ও দক্ষতা আপনাকে আজকের প্রতিযোগিতাপূর্ণ চাকরির বাজারে সফল হওয়ার জন্য প্রস্তুত করবে, যেখানে Data Scientist, Machine Learning Engineer, AI Researcher, NLP Engineer ও Computer Vision Specialist–এর মতো হাই-ডিমান্ড রোলগুলোর জন্য আপনার দক্ষতা হবে সরাসরি প্রযোজ্য।",
        price: 18000,
        originalPrice: 30000,
        currency: "৳",
        thumbnailUrl: "/courses/rsrch.png",
        checkoutLink: "/checkout?course=data-science-ml-specialization",
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
                courseId: "data-science-and-machine-learning",
                courseName: courseData.title,
                coursePrice: courseData.price,
                courseOriginalPrice: courseData.originalPrice,
                currency: "BDT",
                courseCategory: "Data Science & Machine Learning",
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
                            item_id: "data-science-and-machine-learning",
                            item_name: courseData.title,
                            item_category: "Data Science & Machine Learning",
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
                courseId="data-science-and-machine-learning"
            />

            {/* Hero Section */}
            <DataScienceHeroSection
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

            {/* Resource Persons Section */}
            <div id="resource-persons">
                <ResourcePersons />
            </div>

            {/* What You Get */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

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
}
