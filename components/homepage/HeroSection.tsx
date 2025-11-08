"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import HeroBg1 from "@/assets/HomePage/HeroBg-1.jpg";
import HeroBg2 from "@/assets/HomePage/HeroBg-2.jpg";
import HeroBg3 from "@/assets/HomePage/HeroBg-3.jpg";
import HeroBg4 from "@/assets/HomePage/HeroBg-4.jpg";

// Define hero slides with images, titles, descriptions, and matching gradients
const heroSlides = [
    {
        image: HeroBg1,
        title: "Become an",
        highlight: "Clinical Research",
        subtitle: "Expert",
        description: "Master clinical research skills through our comprehensive program combining multiple in-depth courses.",
        gradient: "from-cyan-900/80 via-teal-800/50 to-transparent",
        link: "/courses/clinical-research"
    },
    {
        image: HeroBg2,
        title: "Transform Healthcare with",
        highlight: "AI & Technology",
        subtitle: "",
        description: "Explore cutting-edge healthcare technology and artificial intelligence solutions shaping the future of medicine.",
        gradient: "from-blue-900/85 via-cyan-800/55 to-transparent",
        link: "/courses/healthcare-ai"
    },
    {
        image: HeroBg3,
        title: "Master",
        highlight: "Digital Innovation",
        subtitle: "& Technology",
        description: "Dive deep into the world of digital transformation, circuit design, and next-generation computing systems.",
        gradient: "from-slate-900/90 via-blue-900/60 to-transparent",
        link: "/courses/digital-innovation"
    },
    {
        image: HeroBg4,
        title: "Advance Your",
        highlight: "Data Science",
        subtitle: "Career",
        description: "Build expertise in advanced computing, data analytics, and futuristic technology solutions for tomorrow's challenges.",
        gradient: "from-teal-900/85 via-cyan-800/55 to-transparent",
        link: "/courses/data-science"
    }
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    };

    const currentSlide = heroSlides[currentIndex];

    return (
        <section className="relative w-full h-[700px] overflow-hidden">
            {/* Carousel Background Images */}
            <div className="relative w-full h-full">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt={`Hero slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Gradient overlay matching each image */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-30 flex flex-col items-start justify-center px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40">
                <div className="max-w-4xl">
                    {/* Title with animation */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {currentSlide.title}{" "}
                        <span className="text-[#e9ae30]">
                            {currentSlide.highlight}
                        </span>{" "}
                        {currentSlide.subtitle}
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl italic font-light">
                        {currentSlide.description}
                    </p>

                    {/* Button */}
                    <Link href={currentSlide.link}>
                        <Button
                            size="lg"
                            className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out transform hover:scale-105 bg-[#e9ae30] hover:bg-[#d69d28] text-white font-semibold rounded-md"
                        >
                            Explore Courses
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

        </section>
    );
}
