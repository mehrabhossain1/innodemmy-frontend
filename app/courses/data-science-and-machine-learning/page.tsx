"use client";
import { useState } from "react";
import DataScienceHeroSection from "./components/DataScienceHeroSection";

export default function DataScienceAndMachineLearning() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

    // Centralized Course Data
    const courseData = {
        title: "Data Science and Machine Learning",
        description:
            "এই স্পেশালাইজেশনটি এমনভাবে পরিকল্পনা করা হয়েছে, যাতে আপনি একদিকে মেশিন লার্নিং ও ডেটা সায়েন্সের দৃঢ় একাডেমিক ভিত্তি গড়ে তুলতে পারেন, আর অন্যদিকে প্রকৃত সমস্যার সমাধানে কাজ করে বাস্তবভিত্তিক ইন্ডাস্ট্রি-প্রয়োজনীয় দক্ষতা অর্জন করতে পারেন।\n\nপুরো কোর্সজুড়ে আপনি বাস্তব ডেটাসেট ব্যবহার করে হাতে-কলমে প্রজেক্ট করবেন, প্রতিটি ধাপে শিখবেন কীভাবে মডেল তৈরি, বিশ্লেষণ ও অপটিমাইজেশন করতে হয়, এবং সেগুলোর ফলাফল কীভাবে ব্যাখ্যা ও উপস্থাপন করা যায়। পাশাপাশি, আপনি বিকাশ ঘটাবেন গবেষণাভিত্তিক চিন্তাভাবনা ও সমালোচনামূলক বিশ্লেষণের দক্ষতা—যা একাডেমিক গবেষণা ও ইন্ডাস্ট্রিয়াল অ্যাপ্লিকেশন—দুই ক্ষেত্রেই সমানভাবে গুরুত্বপূর্ণ।\n\nএই কোর্স থেকে অর্জিত জ্ঞান ও দক্ষতা আপনাকে আজকের প্রতিযোগিতাপূর্ণ চাকরির বাজারে সফল হওয়ার জন্য প্রস্তুত করবে, যেখানে Data Scientist, Machine Learning Engineer, AI Researcher, NLP Engineer ও Computer Vision Specialist–এর মতো হাই-ডিমান্ড রোলগুলোর জন্য আপনার দক্ষতা হবে সরাসরি প্রযোজ্য।",
        price: 18000,
        originalPrice: 30000,
        currency: "৳",
        videoUrl:
            "https://www.youtube.com/embed/--9W4yF149Y?si=sT1A8q-UtEtGAlOr&autoplay=1",
        checkoutLink: "/checkout?course=data-science-ml-specialization",
        videoLabel: "Click to watch the demo class",
        enrollButtonText: "Enroll in Batch →",
        enrollButtonTextShort: "Enroll Now",
        promoLabel: "Promo Applied",
        liveCourseLabel: "Live Course",
    };

    return (
        <div className="pb-24">
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
            <DataScienceHeroSection
                courseData={courseData}
                onVideoClick={() => setIsVideoPlaying(true)}
                onEnrollClick={() => setIsEnrollmentModalOpen(true)}
            />
        </div>
    );
}
