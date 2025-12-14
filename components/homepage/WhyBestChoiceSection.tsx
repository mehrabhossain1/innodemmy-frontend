"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    DollarSign,
    FolderOpen,
    Users,
    HeadphonesIcon,
    Award,
    LifeBuoy,
} from "lucide-react";
import Container from "../Container";

const featureCards = [
    {
        id: "affordable",
        title: "Best learning at affordable prices",
        description:
            "Best quality education accessible to everyone with affordable pricing",
        icon: DollarSign,
        gradient: "from-emerald-500 to-teal-500",
        iconColor: "text-emerald-500",
        bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
        id: "project-based",
        title: "Real-World Projects",
        description:
            "Build your portfolio with hands-on projects that mirror industry challenges",
        icon: FolderOpen,
        gradient: "from-violet-500 to-purple-500",
        iconColor: "text-violet-500",
        bgGradient: "from-violet-500/10 to-purple-500/10",
    },
    {
        id: "mentors",
        title: "Expert Mentors",
        description:
            "Learn from industry leaders who have shaped successful tech products and companies",
        icon: Users,
        gradient: "from-blue-500 to-cyan-500",
        iconColor: "text-blue-500",
        bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
        id: "support",
        title: "24/7 Support",
        description:
            "Get help whenever you need it with dedicated one-on-one support sessions",
        icon: HeadphonesIcon,
        gradient: "from-orange-500 to-amber-500",
        iconColor: "text-orange-500",
        bgGradient: "from-orange-500/10 to-amber-500/10",
    },
    {
        id: "certificate",
        title: "Certification",
        description:
            "Earn recognized certificates that boost your career and validate your expertise",
        icon: Award,
        gradient: "from-yellow-500 to-orange-500",
        iconColor: "text-yellow-500",
        bgGradient: "from-yellow-500/10 to-orange-500/10",
    },
    {
        id: "continued-support",
        title: "Lifetime Access",
        description:
            "Continue learning with exclusive resources and community support long after graduation",
        icon: LifeBuoy,
        gradient: "from-rose-500 to-pink-500",
        iconColor: "text-rose-500",
        bgGradient: "from-rose-500/10 to-pink-500/10",
    },
];

export default function WhyBestChoiceSection() {
    return (
        <section className="relative py-12 md:py-16 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-8">
                    <div className="inline-block mb-3 lg:mb-3">
                        <span className="text-xs lg:text-sm font-semibold text-primary bg-primary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-primary/20">
                            ✨ Why Choose Us
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-3">
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Innodemy
                        </span>{" "}
                        <span className="text-foreground">
                            is Your Best Choice
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Experience world-class education designed for real-world
                        success. Our unique approach combines expert mentorship,
                        hands-on projects, and lifetime support to accelerate
                        your career.
                    </p>
                </div>

                {/* Feature Cards - Enhanced Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-5">
                    {featureCards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={card.id}
                                className="group relative"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${
                                        index * 0.1
                                    }s both`,
                                }}
                            >
                                {/* Gradient Glow Effect */}
                                <div
                                    className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`}
                                ></div>

                                <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl lg:rounded-2xl h-full overflow-hidden">
                                    {/* Subtle Background Gradient */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    ></div>

                                    <CardContent className="relative p-4 md:p-4 lg:p-5">
                                        <div className="flex flex-col items-start text-left space-y-2 lg:space-y-2.5">
                                            {/* Icon with Gradient Background */}
                                            <div
                                                className={`relative p-2 lg:p-2.5 bg-gradient-to-br ${card.gradient} rounded-lg lg:rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                            >
                                                <IconComponent className="w-5 h-5 lg:w-5 lg:h-5 text-white" />

                                                {/* Icon Glow */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-lg lg:rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
                                                ></div>
                                            </div>

                                            {/* Title */}
                                            <h4 className="font-bold text-foreground text-sm lg:text-base leading-tight group-hover:text-primary transition-colors duration-300">
                                                {card.title}
                                            </h4>

                                            {/* Description */}
                                            <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                                                {card.description}
                                            </p>
                                        </div>
                                    </CardContent>

                                    {/* Corner Accent */}
                                    <div
                                        className={`absolute top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${card.gradient} opacity-10 rounded-bl-full`}
                                    ></div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </Container>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
