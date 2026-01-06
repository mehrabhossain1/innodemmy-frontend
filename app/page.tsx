import { Suspense } from "react";
import BookTheCallCard from "@/components/BookTheCallCard";
import BlogsSection from "@/components/homepage/BlogsSection";
import CoursesSection from "@/components/homepage/CoursesSection";
import FreeMasterclassSection from "@/components/homepage/FreeMasterclassSection";
import HeroSection from "@/components/homepage/HeroSection";
import { TechnologyStackSection } from "@/components/homepage/TechnologyStackSection";
import WhyBestChoiceSection from "@/components/homepage/WhyBestChoiceSection";
import AboutusSection from "@/components/homepage/AboutusSection";
import UpcomingWebinarSection from "@/components/homepage/UpcomingWebinarSection";

export default function Home() {
    return (
        <main className="space-y-20">
            <HeroSection />
            <AboutusSection />
            <Suspense
                fallback={
                    <div className="py-20 text-center">Loading courses...</div>
                }
            >
                <CoursesSection />
            </Suspense>
            <UpcomingWebinarSection />
            <FreeMasterclassSection />
            <WhyBestChoiceSection />
            <TechnologyStackSection />
            <BlogsSection />
            <BookTheCallCard />
        </main>
    );
}
