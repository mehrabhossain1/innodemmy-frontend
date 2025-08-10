"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

import Curriculum from "./courseoverviewsection/Curriculum";
import CourseBenefits from "./courseoverviewsection/CourseBenefits";
import Projects from "./courseoverviewsection/Projects";
import WhoFor from "./courseoverviewsection/WhoFor";
import FAQ from "./courseoverviewsection/FAQ";
import InstructorAndMentorPanel from "./courseoverviewsection/InstructorAndMentorPanel";

export default function CourseOverview() {
    const curriculumRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const whoForRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
                <Button onClick={() => scrollToSection(curriculumRef)}>
                    Curriculum
                </Button>
                <Button onClick={() => scrollToSection(benefitsRef)}>
                    What You Are Getting From the Course
                </Button>
                <Button onClick={() => scrollToSection(projectsRef)}>
                    Projects
                </Button>
                <Button onClick={() => scrollToSection(whoForRef)}>
                    Who This Course For
                </Button>
                <Button onClick={() => scrollToSection(faqRef)}>FAQ</Button>
            </div>

            {/* Sections */}
            <div ref={curriculumRef}>
                <Curriculum />
            </div>
            <div className="mt-16">
                <InstructorAndMentorPanel />
            </div>
            <div ref={benefitsRef} className="mt-16">
                <CourseBenefits />
            </div>

            <div ref={projectsRef} className="mt-16">
                <Projects />
            </div>
            <div ref={whoForRef} className="mt-16">
                <WhoFor />
            </div>
            <div ref={faqRef} className="mt-16">
                <FAQ />
            </div>
        </div>
    );
}
