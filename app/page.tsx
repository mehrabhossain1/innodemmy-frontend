import BookTheCallCard from "@/components/BookTheCallCard";
import BlogsSection from "@/components/homepage/BlogsSection";
import CoursesSection from "@/components/homepage/CoursesSection";
import CountsSection from "@/components/homepage/CountsSection";
import FreeMasterclassSection from "@/components/homepage/FreeMasterclassSection";
import HeroSection from "@/components/homepage/HeroSection";
import { TechnologyStackSection } from "@/components/homepage/TechnologyStackSection";
import WhyBestChoiceSection from "@/components/homepage/WhyBestChoiceSection";

export default function Home() {
    return (
        <main className="bg-background">
            <HeroSection />
            <CountsSection />
            <CoursesSection />
            <FreeMasterclassSection />
            <WhyBestChoiceSection />
            <TechnologyStackSection />
            <BookTheCallCard />
            <BlogsSection />
        </main>
    );
}
