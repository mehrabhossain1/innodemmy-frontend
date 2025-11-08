"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroBg from "@/assets/HomePage/HeroBg-1.jpg";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[700px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={HeroBg}
                    alt="Clinical Research Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 via-teal-800/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40">
                <div className="max-w-4xl">
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Become an{" "}
                        <span className="text-[#e9ae30]">
                            Clinical Research
                        </span>{" "}
                        Expert
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl italic font-light">
                        Master clinical research skills through our
                        comprehensive program combining multiple in-depth
                        courses.
                    </p>

                    {/* Button */}
                    <Link href="/courses">
                        <Button
                            size="lg"
                            className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out transform hover:scale-105 bg-[#e9ae30] hover:bg-[#d69d28] text-white font-semibold rounded-md"
                        >
                            Explore Courses
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
