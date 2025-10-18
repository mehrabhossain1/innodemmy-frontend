"use client";

import {
    Target,
    Users,
    Lightbulb,
    Award,
    Shield,
    Zap,
    BookOpen,
    Code,
    UserCheck,
    Briefcase,
    Network,
    GraduationCap,
    Globe,
    Heart,
    Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
                        Transforming Talent into Expertise
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                        At Innodemy, we believe the future belongs to those who
                        never stop learning. Based in Bangladesh, we are an
                        innovative EdTech platform dedicated to empowering
                        learners, professionals, and organizations with
                        in-demand technology skills that drive career success in
                        the digital era.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-10">
                        <Target className="w-14 h-14 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Mission
                        </h2>
                    </div>

                    <Card className="border-l-4 border-primary shadow-sm">
                        <CardContent className="p-8">
                            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                Our mission is simple yet impactful: to bridge
                                the gap between traditional education and the
                                rapidly evolving job market by providing
                                high-quality, practical, and industry-aligned
                                training programs.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Whether you are a student seeking your first
                                job, a professional upgrading your skills, or a
                                company looking to upskill your workforce,
                                Innodemy offers learning experiences designed
                                for real-world impact.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Users className="w-14 h-14 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Our Founding Team
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Innodemy was founded by passionate technologists and
                            industry experts with a shared vision — to make
                            world-class, technology-driven education accessible
                            to every learner in Bangladesh.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Card className="border hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            Fakrul Islam Javed
                                        </h3>
                                        <p className="text-primary font-semibold">
                                            Co-Founder & CEO
                                        </p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    ASIC Physical Design Engineer with expertise
                                    in semiconductor design, research, and
                                    technology-focused education.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            Ahmed Ullah Shuvo
                                        </h3>
                                        <p className="text-primary font-semibold">
                                            Co-Founder & COO
                                        </p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Research Investigator specializing in
                                    clinical research and innovation, dedicated
                                    to developing globally competitive talent.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Heart className="w-14 h-14 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            We are guided by principles that define who we are
                            and how we work:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Lightbulb,
                                title: "Innovation",
                                description:
                                    "We constantly update our methods and content to match industry trends.",
                            },
                            {
                                icon: Award,
                                title: "Excellence",
                                description:
                                    "We maintain the highest standards in training, delivery, and learner outcomes.",
                            },
                            {
                                icon: Shield,
                                title: "Integrity",
                                description:
                                    "We operate with transparency, honesty, and accountability.",
                            },
                            {
                                icon: Zap,
                                title: "Empowerment",
                                description:
                                    "We give our learners the tools and confidence to take charge of their careers.",
                            },
                            {
                                icon: Globe,
                                title: "Accessibility",
                                description:
                                    "We make quality education affordable and available to all.",
                            },
                            {
                                icon: Handshake,
                                title: "Collaboration",
                                description:
                                    "We promote teamwork and collaboration to help students, mentors, and educators grow and succeed together.",
                            },
                        ].map((value, index) => (
                            <Card
                                key={index}
                                className="border hover:border-primary/50 hover:shadow-lg transition-all group"
                            >
                                <CardContent className="p-6 text-center">
                                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold text-foreground mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Sets Us Apart Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Target className="w-14 h-14 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            What Sets Us Apart
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            We bridge the gap between knowledge and real-world
                            application, helping learners turn skills into
                            impact:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: BookOpen,
                                title: "Industry-Aligned Curriculum",
                                description:
                                    "Designed in consultation with global tech professionals.",
                            },
                            {
                                icon: Code,
                                title: "Hands-On Learning",
                                description:
                                    "Live projects, coding challenges, and real-world problem solving.",
                            },
                            {
                                icon: UserCheck,
                                title: "Expert Mentorship",
                                description:
                                    "One-on-one guidance from seasoned industry practitioners.",
                            },
                            {
                                icon: Briefcase,
                                title: "Career Pathway Support",
                                description:
                                    "CV reviews, mock interviews, and internship/job connections.",
                            },
                            {
                                icon: Network,
                                title: "Community & Networking",
                                description:
                                    "Access to an active network of learners, alumni, and industry leaders.",
                            },
                            {
                                icon: Users,
                                title: "Personalized Learning Experience",
                                description:
                                    "Each learner is unique, so we design courses that align with your goals and learning style.",
                            },
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className="border hover:border-secondary/50 hover:shadow-lg transition-all group"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <feature.icon className="w-8 h-8 text-secondary mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div>
                                            <h3 className="text-base font-bold text-foreground mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            We don't just teach skills — we shape careers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                        Join Us on This Journey
                    </h2>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
                        The future is digital, and opportunities are endless for
                        those who are ready. Innodemy is here to ensure that you
                        are prepared, confident, and future-proof.
                    </p>
                    <p className="text-xl font-bold text-primary-foreground">
                        Let's turn your potential into performance.
                    </p>
                </div>
            </section>
        </div>
    );
}
