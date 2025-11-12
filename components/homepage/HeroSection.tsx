"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import bg1 from "@/assets/HomePage/bg1.jpg";
import bg2 from "@/assets/HomePage/bg2.jpg";
import bg3 from "@/assets/HomePage/bg3.jpg";
import bg4 from "@/assets/HomePage/bg4.jpg";

const heroImages = [
    { src: bg1, alt: "Hero Background 1" },
    { src: bg2, alt: "Hero Background 2" },
    { src: bg3, alt: "Hero Background 3" },
    { src: bg4, alt: "Hero Background 4" },
];

export default function HeroSection() {
    return (
        <section className="relative w-full bg-background">
            <Container className="py-8 md:py-12">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Carousel
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: false,
                                stopOnMouseEnter: true,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {heroImages.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            priority={index === 0}
                                            className="object-cover"
                                            quality={90}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full md:w-2/3 lg:w-1/2 px-8 md:px-12 lg:px-16 text-white space-y-4 md:space-y-6">
                                                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                                                    Transform Your Future with{" "}
                                                    <span className="text-secondary">
                                                        World-Class
                                                    </span>{" "}
                                                    <span className="text-accent">
                                                        Education
                                                    </span>
                                                </h1>
                                                <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed">
                                                    Unlock your potential with
                                                    expert-led courses designed
                                                    to help you succeed in
                                                    today&apos;s competitive
                                                    world
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                                                    <Button
                                                        size="lg"
                                                        variant="secondary"
                                                        className="font-semibold shadow-lg hover:shadow-xl"
                                                    >
                                                        Explore Courses →
                                                    </Button>
                                                    <Button
                                                        size="lg"
                                                        className="font-semibold shadow-lg hover:shadow-xl"
                                                    >
                                                        Get Started Free
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-4 md:left-6 size-9 md:size-11 bg-background/95 hover:bg-background border-border shadow-lg" />
                        <CarouselNext className="right-4 md:right-6 size-9 md:size-11 bg-background/95 hover:bg-background border-border shadow-lg" />
                    </Carousel>
                </div>
            </Container>
        </section>
    );
}
