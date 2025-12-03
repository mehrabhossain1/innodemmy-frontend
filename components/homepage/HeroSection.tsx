"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
    {
        src: bg1,
        alt: "Hero Background 1",
        title: (
            <>
                Decode <span className="text-secondary">intelligence</span>
                <br />
                Design tomorrow
            </>
        ),
        subtitle:
            "Master the language of machines and shape the systems that shape the future.",
    },
    {
        src: bg2,
        alt: "Hero Background 2",
        title: (
            <>
                Become an{" "}
                <span className="text-secondary">
                    Clinical
                    <br />
                    Research
                </span>{" "}
                Expert
            </>
        ),
        subtitle:
            "Master clinical research skills through our comprehensive program combining multiple in-depth courses.",
    },
    {
        src: bg3,
        alt: "Hero Background 3",
        title: (
            <>
                Step Into The World
                <br />
                Of <span className="text-secondary">Chip Design</span>
            </>
        ),
        subtitle:
            "Learn how to translate logic into high performance, manufacturable silicon",
    },
    {
        src: bg4,
        alt: "Hero Background 4",
        title: (
            <>
                <span className="text-secondary">"DON'T WAIT FOR</span>
                <br />
                OPPORTUNITY
                <br />
                <span className="text-secondary">learn to create it"</span>
            </>
        ),
        subtitle: "",
    },
];

export default function HeroSection() {
    const autoplayPlugin = useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: true,
        })
    );

    const handleMouseEnter = () => {
        autoplayPlugin.current.stop();
    };

    const handleMouseLeave = () => {
        autoplayPlugin.current.play();
    };

    return (
        <section className="relative w-full">
            <Container className="">
                <div
                    className="relative overflow-hidden rounded-2xl my-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Carousel
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        plugins={[autoplayPlugin.current]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {heroImages.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-[550px]">
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
                                            <div className="w-full md:w-3/4 lg:w-4/5 px-8 md:px-12 lg:px-20 text-white space-y-4 md:space-y-6">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight italic">
                                                    {image.title}
                                                </h1>
                                                <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed font-semibold">
                                                    {image.subtitle}
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                                                    <Link href="/courses">
                                                        <Button
                                                            size="lg"
                                                            variant="secondary"
                                                            className="font-semibold shadow-lg hover:shadow-xl"
                                                        >
                                                            Explore Courses →
                                                        </Button>
                                                    </Link>
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
