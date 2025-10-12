import BookTheCallCard from "@/components/BookTheCallCard";
import BlogsSection from "@/components/homepage/BlogsSection";
import CoursesSection from "@/components/homepage/CoursesSection";
import HeroSection from "@/components/homepage/HeroSection";
import { TechnologyStackSection } from "@/components/homepage/TechnologyStackSection";
import WhyBestChoiceSection from "@/components/homepage/WhyBestChoiceSection";

export default function Home() {
    return (
        <main className="bg-background">
            <HeroSection />
            <CoursesSection />
            <WhyBestChoiceSection />
            <TechnologyStackSection />
            <BookTheCallCard />
            <BlogsSection />
        </main>
    );
}
