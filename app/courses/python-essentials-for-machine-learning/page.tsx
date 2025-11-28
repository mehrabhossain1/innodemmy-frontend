"use client";
import { useState } from "react";
import PythonHeroSection from "./components/PythonHeroSection";
import EnrollmentModal from "@/components/course/EnrollmentModal";
import WhatYouGet from "./components/WhatYouGet";
import Projects from "./components/Projects";
import WhatYouNeed from "./components/WhatYouNeed";
import WhoThisCourseIsFor from "./components/WhoThisCourseIsFor";
import InstructorsAndMentors from "./components/InstructorsAndMentors";
import FAQ from "./components/FAQ";

export default function PythonEssentialsForMachineLearning() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Python Essentials for Machine Learning",
        description:
            "এই কোর্সটি তৈরি করা হয়েছে মেশিন লার্নিং ও ডেটা সায়েন্স শেখার পূর্বশর্ত হিসেবে একটি মজবুত পাইথন প্রোগ্রামিং ভিত্তি গড়ে তোলার জন্য। এখানে মূল লক্ষ্য হলো মেশিন লার্নিং অ্যালগরিদম বা থিওরি নয়, বরং প্রোগ্রামিংয়ের মূল ধারণাগুলো দক্ষতার সাথে আয়ত্ত করা।\n\nকোর্সের মাধ্যমে আপনি পাইথনের বেসিক থেকে অ্যাডভান্সড টপিক ধাপে ধাপে হাতে-কলমে শিখবেন। এর মধ্যে থাকছে— ডেটা স্ট্রাকচার, ফাংশনাল প্রোগ্রামিং, অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং, এক্সেপশন হ্যান্ডলিং, ফাইল হ্যান্ডলিং । এছাড়াও, কোর্সে অন্তর্ভুক্ত থাকবে ১০টি বাস্তবমুখী প্রজেক্ট, যেখানে শেখা কনসেপ্টগুলো ব্যবহার করে আপনি বাস্তব সমস্যার সমাধান করবেন। এর ফলে আপনার প্রোগ্রামিং দক্ষতা শুধু শক্তিশালী হবে না, বরং আত্মবিশ্বাসের সাথে মেশিন লার্নিং শেখার জন্য প্রস্তুতি নিতে পারবেন।",
        price: 8000,
        originalPrice: 15000,
        currency: "৳",
        thumbnailUrl: "/courses/Python.jpg",
        videoUrl:
            "https://www.youtube.com/embed/YOUR_VIDEO_ID?si=YOUR_VIDEO_SI&autoplay=1",
        checkoutLink: "/checkout?course=python-essentials-for-ml",
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
                courseId="python-essentials-for-machine-learning"
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
            <PythonHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />

            {/* What You'll Get Section */}
            <div id="what-you-get">
                <WhatYouGet />
            </div>

            {/* Projects Section */}
            <div id="projects">
                <Projects />
            </div>

            {/* What You'll Need Section */}
            <div id="what-you-need">
                <WhatYouNeed />
            </div>

            {/* Who This Course is For Section */}
            <div id="who-this-for">
                <WhoThisCourseIsFor />
            </div>

            {/* Instructors and Mentors */}
            <div id="resource-persons">
                <InstructorsAndMentors />
            </div>

            {/* FAQ Section */}
            <div id="faq">
                <FAQ />
            </div>
        </div>
    );
}
