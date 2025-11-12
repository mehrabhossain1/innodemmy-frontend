// import BookTheCallCard from "@/components/BookTheCallCard";
import BlogsSection from "@/components/homepage/BlogsSection";
import CoursesSection from "@/components/homepage/CoursesSection";
import FreeMasterclassSection from "@/components/homepage/FreeMasterclassSection";
import HeroSection from "@/components/homepage/HeroSection";
import { TechnologyStackSection } from "@/components/homepage/TechnologyStackSection";
import WhyBestChoiceSection from "@/components/homepage/WhyBestChoiceSection";
import AboutusSection from "@/components/homepage/AboutusSection";

export default function Home() {
    return (
        <main className="">
            <HeroSection />
            <AboutusSection />
            <CoursesSection />
            <FreeMasterclassSection />
            <WhyBestChoiceSection />
            <TechnologyStackSection />
            <BlogsSection />
            {/* <BookTheCallCard /> */}
        </main>
    );
}
