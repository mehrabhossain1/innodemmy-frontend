import BlogsSection from "@/components/homepage/BlogsSection";
import CoursesSection from "@/components/homepage/CoursesSection";
import HeroSection from "@/components/homepage/HeroSection";
import WhyBestChoiceSection from "@/components/homepage/WhyBestChoiceSection";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <CoursesSection />
            <BlogsSection />
            <WhyBestChoiceSection />
        </main>
    );
}
