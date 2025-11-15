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
        title: "Affordable Excellence",
        description:
            "Premium education at prices that won't break the bank. Quality learning for everyone.",
        icon: DollarSign,
        gradient: "from-emerald-500 to-teal-500",
        iconColor: "text-emerald-500",
        bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
        id: "project-based",
        title: "Real-World Projects",
        description: "Build your portfolio with hands-on projects that mirror industry challenges.",
        icon: FolderOpen,
        gradient: "from-violet-500 to-purple-500",
        iconColor: "text-violet-500",
        bgGradient: "from-violet-500/10 to-purple-500/10",
    },
    {
        id: "mentors",
        title: "Expert Mentors",
        description:
            "Learn from industry leaders who have shaped successful tech products and companies.",
        icon: Users,
        gradient: "from-blue-500 to-cyan-500",
        iconColor: "text-blue-500",
        bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
        id: "support",
        title: "24/7 Support",
        description: "Get help whenever you need it with dedicated one-on-one support sessions.",
        icon: HeadphonesIcon,
        gradient: "from-orange-500 to-amber-500",
        iconColor: "text-orange-500",
        bgGradient: "from-orange-500/10 to-amber-500/10",
    },
    {
        id: "certificate",
        title: "Industry Certification",
        description:
            "Earn recognized certificates that boost your career and validate your expertise.",
        icon: Award,
        gradient: "from-yellow-500 to-orange-500",
        iconColor: "text-yellow-500",
        bgGradient: "from-yellow-500/10 to-orange-500/10",
    },
    {
        id: "continued-support",
        title: "Lifetime Access",
        description:
            "Continue learning with exclusive resources and community support long after graduation.",
        icon: LifeBuoy,
        gradient: "from-rose-500 to-pink-500",
        iconColor: "text-rose-500",
        bgGradient: "from-rose-500/10 to-pink-500/10",
    },
];

export default function WhyBestChoiceSection() {
    return (
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                            ✨ Why Choose Us
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Innodemy
                        </span>{" "}
                        <span className="text-foreground">
                            is Your Best Choice
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Experience world-class education designed for real-world success.
                        Our unique approach combines expert mentorship, hands-on projects,
                        and lifetime support to accelerate your career.
                    </p>
                </div>

                {/* Feature Cards - Enhanced Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {featureCards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={card.id}
                                className="group relative"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                {/* Gradient Glow Effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`}></div>

                                <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl h-full overflow-hidden">
                                    {/* Subtle Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                    <CardContent className="relative p-6 md:p-8">
                                        <div className="flex flex-col items-start text-left space-y-4">
                                            {/* Icon with Gradient Background */}
                                            <div className={`relative p-4 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                                <IconComponent className="w-7 h-7 text-white" />

                                                {/* Icon Glow */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                                            </div>

                                            {/* Title */}
                                            <h4 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                                                {card.title}
                                            </h4>

                                            {/* Description */}
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {card.description}
                                            </p>

                                            {/* Decorative Arrow */}
                                            <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                                                <span>Learn more</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </CardContent>

                                    {/* Corner Accent */}
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-10 rounded-bl-full`}></div>
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
