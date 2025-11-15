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
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );
    const webinars = getAllWebinars();

    return (
        <section className="py-16 bg-muted/30">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent mb-4">
                        Free Masterclass Sessions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of free masterclass sessions and
                        get a taste of our teaching methodology. Learn from
                        industry experts at no cost.
                    </p>
                </div>

                {/* Masterclass Cards Carousel */}
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full mb-16"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {webinars.map((masterclass, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="bg-card rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl shadow-md border border-border h-full">
                                    {/* Thumbnail with Play Button Overlay */}
                                    <div className="relative overflow-hidden h-48">
                                        <Image
                                            src={masterclass.image}
                                            alt={masterclass.title}
                                            width={400}
                                            height={192}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Play
                                                    className="w-8 h-8 text-primary ml-1"
                                                    fill="currentColor"
                                                />
                                            </div>
                                        </div>
                                        {/* Duration Badge */}
                                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                            {masterclass.duration}
                                        </div>
                                        {/* Free Badge */}
                                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                                            FREE
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 space-y-3">
                                        {/* Title */}
                                        <Link
                                            href={`/webinar/${masterclass.id}`}
                                        >
                                            <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                                                {masterclass.title}
                                            </h3>
                                        </Link>

                                        {/* Instructor */}
                                        <p className="text-sm text-muted-foreground">
                                            by {masterclass.instructor}
                                        </p>

                                        {/* Topics */}
                                        <div className="flex flex-wrap gap-2">
                                            {masterclass.topics
                                                .slice(0, 3)
                                                .map((topic, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            {masterclass.topics.length > 3 && (
                                                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                                                    +
                                                    {masterclass.topics.length -
                                                        3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Views */}
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-sm text-muted-foreground">
                                                {masterclass.views.toLocaleString()}{" "}
                                                views
                                            </span>
                                        </div>

                                        {/* Watch Now Button */}
                                        <Link
                                            href={`/webinar/${masterclass.id}`}
                                        >
                                            <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold text-sm h-10 rounded-md transition-all duration-200 ease-out mt-3">
                                                <Play
                                                    className="mr-2 h-4 w-4"
                                                    fill="currentColor"
                                                />
                                                Watch Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <CarouselPrevious className="hidden md:flex -left-12 bg-white dark:bg-gray-800 hover:bg-secondary hover:text-white border-2 shadow-lg" />
                    <CarouselNext className="hidden md:flex -right-12 bg-white dark:bg-gray-800 hover:bg-secondary hover:text-white border-2 shadow-lg" />
                </Carousel>

                {/* View All Masterclasses Button */}
                <div className="text-center">
                    <Link href="/courses">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-3 h-auto text-base shadow-lg hover:shadow-xl transition-all duration-200 ease-out border-2 hover:bg-secondary hover:text-white hover:border-secondary"
                        >
                            Explore All Courses
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
