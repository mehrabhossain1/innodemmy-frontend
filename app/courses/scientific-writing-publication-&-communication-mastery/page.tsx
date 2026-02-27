"use client";
import { useState, useEffect } from "react";
import ScientificWritingHeroSection from "./components/ScientificWritingHeroSection";
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

const ScientificWritingPublicationCommunicationMastery = () => {
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

    // GTM Data Layer - Push course page view
    useEffect(() => {
        if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
                event: "course_page_view",
                pageType: "course_detail",
                courseId: "scientific-writing-publication-communication-mastery",
                courseName: courseData.title,
                coursePrice: courseData.price,
                courseOriginalPrice: courseData.originalPrice,
                currency: "BDT",
                courseCategory: "Research & Publication",
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
                            item_id: "scientific-writing-publication-communication-mastery",
                            item_name: courseData.title,
                            item_category: "Research & Publication",
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
                courseId="scientific-writing-publication-communication-mastery"
            />

            {/* Hero Section */}
            <ScientificWritingHeroSection
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

export default ScientificWritingPublicationCommunicationMastery;
