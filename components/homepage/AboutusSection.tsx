"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "../Container";

// Counter component with animation
function AnimatedCounter({
    end,
    duration = 2500,
    suffix = "",
    prefix = "",
    isBengali = false,
    delay = 0,
}: {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    isBengali?: boolean;
    delay?: number;
}) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const countRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Convert English numbers to Bengali
    const toBengaliNumber = (num: number) => {
        const bengaliDigits = [
            "০",
            "১",
            "২",
            "৩",
            "৪",
            "৫",
            "৬",
            "৭",
            "৮",
            "৯",
        ];
        return num
            .toString()
            .split("")
            .map((digit) =>
                digit === "." ? "." : bengaliDigits[parseInt(digit)]
            )
            .join("");
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrame: number;
        let delayTimeout: NodeJS.Timeout;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Enhanced easing function - combination of easeInOutCubic for ultra-smooth animation
            const easeInOutCubic =
                progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            // Add slight elasticity at the end for more natural feel
            const elasticEnd =
                progress > 0.95
                    ? easeInOutCubic +
                      Math.sin((progress - 0.95) * 20) * 0.01 * (1 - progress)
                    : easeInOutCubic;

            const currentCount = Math.floor(elasticEnd * end);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        // Start animation after delay
        if (delay > 0) {
            delayTimeout = setTimeout(() => {
                animationFrame = requestAnimationFrame(animate);
            }, delay);
        } else {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            if (delayTimeout) {
                clearTimeout(delayTimeout);
            }
        };
    }, [isVisible, end, duration, delay]);

    const displayCount = isBengali
        ? toBengaliNumber(count)
        : count.toLocaleString();

    return (
        <div
            ref={countRef}
            className="text-2xl md:text-3xl lg:text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
            {prefix}
            {displayCount}
            {suffix}
        </div>
    );
}

export default function AboutusSection() {
    const stats = [
        {
            target: 50000,
            suffix: "+",
            label: "Students Enrolled",
            icon: Users,
            color: "from-primary to-primary/70",
            isBengali: false,
        },
        {
            target: 500,
            suffix: "+",
            label: "Expert Courses",
            icon: BookOpen,
            color: "from-secondary to-secondary/70",
            isBengali: false,
        },
        {
            target: 95,
            suffix: "%",
            label: "Success Rate",
            icon: Target,
            color: "from-primary to-primary/70",
            isBengali: false,
        },
        {
            target: 24,
            suffix: "/7",
            label: "Support Available",
            icon: Clock,
            color: "from-secondary to-secondary/70",
            isBengali: false,
        },
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-background via-muted/20 to-background py-12 md:py-16 lg:py-14">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3">
                        About{" "}
                        <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                            Inno
                        </span>
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            demy
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Empowering the next generation of innovators and leaders
                    </p>
                </div>

                {/* Statistics Cards - Modern Gradient Style with Smooth Animation */}
                <div className="mb-10 md:mb-12 lg:mb-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="relative group"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${
                                        index * 0.1
                                    }s both`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl lg:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50 group-hover:opacity-70"></div>
                                <div className="relative bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-5 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex flex-col items-center space-y-2 lg:space-y-2.5">
                                        <div
                                            className={`p-2 md:p-3 lg:p-2.5 bg-gradient-to-br ${stat.color} rounded-lg lg:rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <stat.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white" />
                                        </div>
                                        <AnimatedCounter
                                            end={stat.target}
                                            duration={2500}
                                            suffix={stat.suffix}
                                            isBengali={stat.isBengali}
                                            delay={index * 100}
                                        />
                                        <div className="text-xs md:text-sm lg:text-xs text-muted-foreground font-medium text-center">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>

                {/* Main About Content - Enhanced Design */}
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left Side - Text Content */}
                        <div className="p-6 md:p-10 lg:p-8 xl:p-12 flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-5">
                            <div className="space-y-3 lg:space-y-3">
                                <div className="inline-block">
                                    <span className="text-xs lg:text-sm font-semibold text-primary bg-primary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full">
                                        Who We Are
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
                                    A Future-Focused Learning Platform for{" "}
                                    <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                                        Tomorrow&apos;s Leaders
                                    </span>
                                </h3>
                            </div>

                            <p className="text-sm md:text-base lg:text-sm xl:text-base text-muted-foreground leading-relaxed">
                                InnoDemy connects ambitious learners with the
                                skills they need to stay ahead in a digital
                                world. We offer programs in{" "}
                                <span className="font-semibold text-primary">
                                    Clinical Research
                                </span>
                                ,{" "}
                                <span className="font-semibold text-primary">
                                    Programming
                                </span>
                                ,{" "}
                                <span className="font-semibold text-primary">
                                    Data Science & Machine Learning
                                </span>
                                ,{" "}
                                <span className="font-semibold text-primary">
                                    VLSI
                                </span>
                                , and{" "}
                                <span className="font-semibold text-primary">
                                    Core Engineering
                                </span>{" "}
                                shaping the next wave of technology.
                            </p>

                            <p className="text-sm md:text-base lg:text-sm xl:text-base text-muted-foreground leading-relaxed">
                                Learning goes beyond theory at InnoDemy. Each
                                course combines hands-on projects, industry case
                                studies, and research-backed insights to help
                                learners think critically, experiment boldly,
                                and apply knowledge with confidence.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-3">
                                <Link
                                    href="/aboutus"
                                    className="flex-1 sm:flex-initial"
                                >
                                    <Button
                                        size="default"
                                        className="w-full lg:px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Learn More About Us
                                    </Button>
                                </Link>
                                <Link
                                    href="/courses"
                                    className="flex-1 sm:flex-initial"
                                >
                                    <Button
                                        size="default"
                                        variant="outline"
                                        className="w-full lg:px-6 border-2 hover:bg-secondary hover:text-white hover:border-secondary font-semibold transition-all duration-200"
                                    >
                                        Browse Courses
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Image with Overlay */}
                        <div className="relative h-[250px] md:h-[300px] lg:h-auto lg:min-h-[350px] xl:min-h-[400px] bg-gradient-to-br from-primary/10 to-secondary/10">
                            <Image
                                src="https://img.freepik.com/free-vector/e-learning-infographic-set_1284-16836.jpg"
                                alt="E-learning infographic"
                                fill
                                className="object-cover mix-blend-multiply dark:mix-blend-normal dark:opacity-80"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
