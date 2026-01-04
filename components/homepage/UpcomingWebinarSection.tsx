"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Play } from "lucide-react";
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
import { getUpcomingWebinars } from "@/lib/data/webinars";

export default function UpcomingWebinarSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );
    const webinars = getUpcomingWebinars();

    return (
        <section className="relative py-12 md:py-16 lg:py-14 bg-gradient-to-b from-background via-accent/5 to-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-3">
                        <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/70 bg-clip-text text-transparent">
                            Upcoming Masterclass
                        </span>{" "}
                        <span className="text-foreground">Sessions</span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Reserve your spot in our upcoming live sessions.
                        Interact with experts and elevate your skills in
                        real-time.
                    </p>
                </div>

                {/* Webinar Cards Carousel */}
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
                        {webinars.map((webinar, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-3 lg:pl-3 md:basis-1/2 lg:basis-1/3"
                            >
                                <Link href={`/upcoming-webinar/${webinar.id}`}>
                                    <div className="relative group h-full">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>

                                        <div className="relative bg-card/80 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border-2 border-border group-hover:border-accent/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl shadow-lg h-full">
                                            {/* Thumbnail with Play Button Overlay */}
                                            <div className="relative overflow-hidden h-44 lg:h-48">
                                                <Image
                                                    src={webinar.image}
                                                    alt={webinar.title}
                                                    width={400}
                                                    height={208}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />

                                                {/* Play Button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300 border-2 border-white/20">
                                                        <Play
                                                            className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-0.5"
                                                            fill="currentColor"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-black/80 backdrop-blur-sm text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-md lg:rounded-lg text-[10px] lg:text-xs font-semibold border border-white/10">
                                                    {webinar.duration}
                                                </div>

                                                {/* Live Badge */}
                                                <div className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-md lg:rounded-lg text-[10px] lg:text-xs font-bold shadow-lg flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                    UPCOMING
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 lg:p-5 space-y-2.5 lg:space-y-3">
                                                {/* Title */}
                                                <h3 className="text-base lg:text-lg font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-tight min-h-[2.8rem] lg:min-h-[3.2rem]">
                                                    {webinar.title}
                                                </h3>

                                                {/* Instructor */}
                                                <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-muted-foreground">
                                                    {webinar.instructorImage ? (
                                                        <Image
                                                            src={
                                                                webinar.instructorImage
                                                            }
                                                            alt={
                                                                webinar.instructor
                                                            }
                                                            width={32}
                                                            height={32}
                                                            className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                                            <span className="text-[10px] lg:text-xs font-bold text-primary">
                                                                {webinar.instructor.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <span className="font-medium">
                                                        {webinar.instructor}
                                                    </span>
                                                </div>

                                                {/* Topics */}
                                                <div className="flex flex-wrap gap-1 lg:gap-1.5">
                                                    {webinar.topics
                                                        .slice(0, 2)
                                                        .map((topic, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[10px] lg:text-xs bg-gradient-to-r from-accent/10 to-primary/10 text-accent border border-accent/20 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    {webinar.topics.length >
                                                        2 && (
                                                        <span className="text-[10px] lg:text-xs bg-muted/50 text-muted-foreground px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium border border-border">
                                                            +
                                                            {webinar.topics
                                                                .length - 2}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Stats Bar */}
                                                <div className="flex items-center justify-between pt-2 lg:pt-3 border-t border-border">
                                                    <span className="text-[10px] lg:text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                                                        {webinar.date}
                                                    </span>

                                                    <div className="flex items-center gap-1 text-accent font-semibold text-xs lg:text-sm group-hover:gap-2 transition-all">
                                                        Register Now
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
                    <CarouselPrevious className="hidden md:flex -left-10 lg:-left-12 h-9 w-9 lg:h-10 lg:w-10 bg-card/80 backdrop-blur-sm hover:bg-accent hover:text-white border-2 border-border hover:border-accent shadow-lg transition-all duration-300" />
                    <CarouselNext className="hidden md:flex -right-10 lg:-right-12 h-9 w-9 lg:h-10 lg:w-10 bg-card/80 backdrop-blur-sm hover:bg-accent hover:text-white border-2 border-border hover:border-accent shadow-lg transition-all duration-300" />
                </Carousel>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/upcoming-webinar">
                        <Button
                            size="default"
                            className="px-6 lg:px-7 py-5 lg:py-5 h-auto text-sm lg:text-base font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white shadow-lg shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 rounded-lg lg:rounded-xl border-2 border-accent/20 hover:border-accent/40 group"
                        >
                            View All Upcoming Masterclasses
                            <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
