"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import Container from "../Container";
import { getAllWebinars } from "@/lib/data/webinars";

export default function FreeMasterclassSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );
    const webinars = getAllWebinars();

    return (
        <section className="relative py-12 md:py-16 lg:py-14 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-8">
                    <div className="inline-block mb-3 lg:mb-3">
                        <span className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20">
                            🎓 100% Free
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-3">
                        <span className="bg-gradient-to-r from-secondary via-secondary/80 to-secondary/70 bg-clip-text text-transparent">
                            Free Masterclass
                        </span>{" "}
                        <span className="text-foreground">Sessions</span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Get a taste of our world-class teaching methodology.
                        Learn from industry experts at absolutely no cost.
                    </p>
                </div>

                {/* Masterclass Cards Carousel */}
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full mb-8 md:mb-10 lg:mb-8"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-3 lg:-ml-3">
                        {webinars.map((masterclass, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-3 lg:pl-3 md:basis-1/2 lg:basis-1/3"
                            >
                                <Link href={`/webinar/${masterclass.id}`}>
                                    <div className="relative group h-full">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>

                                        <div className="relative bg-card/80 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border-2 border-border group-hover:border-secondary/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full">
                                            {/* Thumbnail with Play Button Overlay */}
                                            <div className="relative overflow-hidden h-44 lg:h-48">
                                                <Image
                                                    src={masterclass.image}
                                                    alt={masterclass.title}
                                                    width={400}
                                                    height={208}
                                                    // className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}

                                                {/* Play Button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300 border-2 border-white/20">
                                                        <Play
                                                            className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-0.5"
                                                            fill="currentColor"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-black/80 backdrop-blur-sm text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-md lg:rounded-lg text-[10px] lg:text-xs font-semibold border border-white/10">
                                                    {masterclass.duration}
                                                </div>

                                                {/* Free Badge */}
                                                <div className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-md lg:rounded-lg text-[10px] lg:text-xs font-bold shadow-lg">
                                                    ✨ FREE
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 lg:p-5 space-y-2.5 lg:space-y-3">
                                                {/* Title */}
                                                <h3 className="text-base lg:text-lg font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors leading-tight min-h-[2.8rem] lg:min-h-[3.2rem]">
                                                    {masterclass.title}
                                                </h3>

                                                {/* Instructor */}
                                                <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-muted-foreground">
                                                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                        <span className="text-[10px] lg:text-xs font-bold text-primary">
                                                            {masterclass.instructor.charAt(
                                                                0
                                                            )}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">
                                                        {masterclass.instructor}
                                                    </span>
                                                </div>

                                                {/* Topics */}
                                                <div className="flex flex-wrap gap-1 lg:gap-1.5">
                                                    {masterclass.topics
                                                        .slice(0, 2)
                                                        .map((topic, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[10px] lg:text-xs bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    {masterclass.topics.length >
                                                        2 && (
                                                        <span className="text-[10px] lg:text-xs bg-muted/50 text-muted-foreground px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium border border-border">
                                                            +
                                                            {masterclass.topics
                                                                .length - 2}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Stats Bar */}
                                                <div className="flex items-center justify-between pt-2 lg:pt-3 border-t border-border">
                                                    <span className="text-[10px] lg:text-xs text-muted-foreground flex items-center gap-1">
                                                        <svg
                                                            className="w-3 h-3 lg:w-4 lg:h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                        {masterclass.views.toLocaleString()}
                                                    </span>

                                                    <div className="flex items-center gap-1 text-secondary font-semibold text-xs lg:text-sm group-hover:gap-2 transition-all">
                                                        Watch Now
                                                        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <CarouselPrevious className="hidden md:flex -left-10 lg:-left-12 h-9 w-9 lg:h-10 lg:w-10 bg-card/80 backdrop-blur-sm hover:bg-secondary hover:text-white border-2 border-border hover:border-secondary shadow-lg transition-all duration-300" />
                    <CarouselNext className="hidden md:flex -right-10 lg:-right-12 h-9 w-9 lg:h-10 lg:w-10 bg-card/80 backdrop-blur-sm hover:bg-secondary hover:text-white border-2 border-border hover:border-secondary shadow-lg transition-all duration-300" />
                </Carousel>

                {/* View All Button - Enhanced */}
                <div className="text-center">
                    <Link href="/webinar">
                        <Button
                            size="default"
                            className="px-6 lg:px-7 py-5 lg:py-5 h-auto text-sm lg:text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 rounded-lg lg:rounded-xl border-2 border-primary/20 hover:border-primary/40 group"
                        >
                            Explore All Masterclasses
                            <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
