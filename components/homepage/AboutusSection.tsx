"use client";

import Container from "../Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Target, Clock, Award, Rocket, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AboutusSection() {
    const stats = [
        {
            count: "৫০,০০০+",
            label: "শিক্ষার্থী নথিভুক্ত",
            icon: Users,
            color: "from-primary to-primary/70",
        },
        {
            count: "৫০০+",
            label: "বিশেষজ্ঞ কোর্স",
            icon: BookOpen,
            color: "from-secondary to-secondary/70",
        },
        {
            count: "৯৫%",
            label: "সফলতার হার",
            icon: Target,
            color: "from-primary to-primary/70",
        },
        {
            count: "২৪/৭",
            label: "সহায়তা উপলব্ধ",
            icon: Clock,
            color: "from-secondary to-secondary/70",
        },
    ];

    const features = [
        {
            icon: Award,
            title: "Industry Expert Instructors",
            description: "Learn from professionals with real-world experience",
            color: "primary",
        },
        {
            icon: Rocket,
            title: "Project-Based Learning",
            description: "Build your portfolio with hands-on projects",
            color: "secondary",
        },
        {
            icon: Zap,
            title: "Fast-Track Your Career",
            description: "Get job-ready skills in months, not years",
            color: "primary",
        },
        {
            icon: TrendingUp,
            title: "Continuous Growth",
            description: "Stay updated with latest industry trends",
            color: "secondary",
        },
    ];

    return (
        <section className="relative w-full bg-gradient-to-b from-background via-muted/20 to-background py-16 md:py-20">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        About{" "}
                        <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                            Inno
                        </span>
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Demy
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Empowering the next generation of innovators and leaders
                    </p>
                </div>

                {/* Statistics Cards - Modern Gradient Style */}
                <div className="mb-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 group-hover:opacity-70"></div>
                                <div className="relative bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className={`p-3 md:p-4 bg-gradient-to-br ${stat.color} rounded-xl shadow-md`}>
                                            <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                            {stat.count}
                                        </div>
                                        <div className="text-xs md:text-sm text-muted-foreground font-medium text-center">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main About Content - Enhanced Design */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left Side - Text Content */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6 md:space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                                        Who We Are
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                    A Future-Focused Learning Platform for{" "}
                                    <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                                        Tomorrow&apos;s Leaders
                                    </span>
                                </h3>
                            </div>

                            <p className="text-base text-muted-foreground leading-relaxed">
                                InnoDemy connects ambitious learners with the skills
                                they need to stay ahead in a digital world. We
                                offer programs in{" "}
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

                            <p className="text-base text-muted-foreground leading-relaxed">
                                Learning goes beyond theory at InnoDemy. Each
                                course combines hands-on projects, industry case
                                studies, and research-backed insights to help
                                learners think critically, experiment boldly,
                                and apply knowledge with confidence.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/about" className="flex-1 sm:flex-initial">
                                    <Button
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Learn More About Us
                                    </Button>
                                </Link>
                                <Link href="/courses" className="flex-1 sm:flex-initial">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-2 hover:bg-secondary hover:text-white hover:border-secondary font-semibold transition-all duration-200"
                                    >
                                        Browse Courses
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Image with Overlay */}
                        <div className="relative h-[300px] lg:h-auto min-h-[400px] bg-gradient-to-br from-primary/10 to-secondary/10">
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

                {/* Features Grid - New Addition */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                                </div>
                                <h4 className="text-lg font-bold text-foreground mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
