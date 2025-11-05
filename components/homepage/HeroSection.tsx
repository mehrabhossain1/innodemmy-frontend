"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/HomePage/Web Home Page first.jpg";
import img2 from "@/assets/HomePage/Web home page 2nd.jpg";
import img3 from "@/assets/HomePage/Web home page 3rd.jpg";
import img4 from "@/assets/HomePage/Web home page 4th.jpg";

// Define carousel slides with images and their associated course links
const slides = [
    { image: img1, courseLink: "/courses/web-development" },
    { image: img2, courseLink: "/courses/data-science" },
    { image: img3, courseLink: "/courses/mobile-development" },
    { image: img4, courseLink: "/courses/digital-marketing" },
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] max-h-[700px] overflow-hidden">
            {/* Carousel Images */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
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
                        {/* Transparent gradient overlay that blends with the image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
                    </div>
                ))}
            </div>

            {/* Browse Course Button with backdrop blur */}
            <div className="absolute bottom-40 left-80 z-20">
                <Link href={slides[currentIndex].courseLink}>
                    <Button
                        size="lg"
                        className="text-base sm:text-lg px-10 sm:px-16 py-2 sm:py-3 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-105 bg-secondary/95 hover:bg-secondary backdrop-blur-sm"
                    >
                        Browse Course
                    </Button>
                </Link>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
