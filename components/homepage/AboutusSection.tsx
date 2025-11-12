import Container from "../Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Target, Clock } from "lucide-react";

export default function AboutusSection() {
    const stats = [
        {
            count: "৫০,০০০+",
            label: "শিক্ষার্থী নথিভুক্ত",
            icon: Users,
        },
        {
            count: "৫০০+",
            label: "বিশেষজ্ঞ কোর্স",
            icon: BookOpen,
        },
        {
            count: "৯৫%",
            label: "সফলতার হার",
            icon: Target,
        },
        {
            count: "২৪/৭",
            label: "সহায়তা উপলব্ধ",
            icon: Clock,
        },
    ];

    return (
        <section className="relative w-full bg-background py-16">
            <Container>
                {/* Statistics Card */}
                <div className="mb-16">
                    <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center space-y-2"
                                >
                                    <div className="flex justify-center mb-3">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <stat.icon className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>
                                    <div className="text-4xl font-bold text-foreground">
                                        {stat.count}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* About Content Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side - Text Content */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                            <h2 className="text-4xl font-bold text-foreground">
                                About{" "}
                                <span className="text-secondary">Inno</span>
                                <span className="text-accent">Demy</span>
                            </h2>

                            <p className="text-base text-muted-foreground leading-relaxed">
                                InnoDemy is a future-focused learning platform
                                that connects ambitious learners with the skills
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
                                shaping the next wave of technology and
                                discovery.
                            </p>

                            <p className="text-base text-muted-foreground leading-relaxed">
                                At InnoDemy, learning goes beyond theory. Each
                                course combines hands-on projects, industry case
                                studies, and research-backed insights to help
                                learners think critically, experiment boldly,
                                and apply knowledge with confidence. We turn
                                curiosity into capability empowering
                                professionals who don&apos;t just follow trends,
                                but create them.
                            </p>

                            <div className="pt-4">
                                <Button
                                    size="lg"
                                    className="font-semibold shadow-lg hover:shadow-xl"
                                >
                                    Learn More About Us →
                                </Button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative h-[300px] lg:h-auto bg-muted">
                            <Image
                                src="https://img.freepik.com/free-vector/e-learning-infographic-set_1284-16836.jpg"
                                alt="E-learning infographic"
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
