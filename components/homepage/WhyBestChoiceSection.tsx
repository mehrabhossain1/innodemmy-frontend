import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    DollarSign,
    FolderOpen,
    Users,
    HeadphonesIcon,
    Award,
    LifeBuoy,
    GraduationCap,
    Target,
    Lightbulb,
} from "lucide-react";

const accordionItems = [
    {
        id: "gateway",
        title: "Gateway to Advanced Opportunities",
        content:
            "Innodemy is more than a skill development platform — it's a gateway to advanced research opportunities and career transitions for students and professionals.",
        icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
    },
    {
        id: "comprehensive",
        title: "Comprehensive Career Guidance",
        content:
            "Each course is strategically designed to provide learners with comprehensive guidance, from skill acquisition to career preparation, scholarships, and higher education.",
        icon: <Target className="w-5 h-5 text-blue-600" />,
    },
    {
        id: "beyond-teaching",
        title: "Beyond Teaching - Complete Support",
        content:
            "Innodemy goes beyond teaching — supporting learners throughout their career journey with expert guidance, real-world experience, and practical problem-solving.",
        icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
    },
];

const featureCards = [
    {
        id: "affordable",
        title: "Best learning at affordable prices",
        description:
            "High-quality education accessible to everyone with competitive pricing and flexible payment options.",
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
    },
    {
        id: "project-based",
        title: "Project-based learning",
        description:
            "Learn by doing with hands-on projects that simulate real-world scenarios and build your portfolio.",
        icon: <FolderOpen className="w-8 h-8 text-purple-600" />,
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
    },
    {
        id: "mentors",
        title: "Nation's leading industry mentors panel",
        description:
            "Learn from the best in the industry with our carefully selected panel of expert mentors and instructors.",
        icon: <Users className="w-8 h-8 text-blue-600" />,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
    },
    {
        id: "support",
        title: "Dedicated support sessions with every course",
        description:
            "Get personalized help and guidance through dedicated support sessions included with every course.",
        icon: <HeadphonesIcon className="w-8 h-8 text-orange-600" />,
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
    },
    {
        id: "certificate",
        title: "Certificate awarded upon course completion",
        description:
            "Earn industry-recognized certificates that validate your skills and enhance your professional profile.",
        icon: <Award className="w-8 h-8 text-yellow-600" />,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
    },
    {
        id: "continued-support",
        title: "Continued exclusive support after course completion",
        description:
            "Enjoy ongoing support and access to exclusive resources even after completing your course.",
        icon: <LifeBuoy className="w-8 h-8 text-red-600" />,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
    },
];

export default function WhyBestChoiceSection() {
    return (
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                        Why Innodemy is Your Best Choice
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Discover what makes Innodemy the preferred learning
                        platform for thousands of students and professionals
                        worldwide. We're committed to your success every step of
                        the way.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Accordion */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                            <h3 className="text-2xl font-bold text-foreground mb-6">
                                What Sets Us Apart
                            </h3>

                            <Accordion
                                type="single"
                                collapsible
                                className="space-y-4"
                            >
                                {accordionItems.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        value={item.id}
                                        className="border border-border rounded-2xl px-6 data-[state=open]:border-primary data-[state=open]:bg-accent"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-4">
                                            <div className="flex items-center space-x-3 text-left">
                                                <div className="flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <span className="font-semibold text-foreground">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4 pt-2">
                                            <p className="text-muted-foreground leading-relaxed ml-8">
                                                {item.content}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-primary rounded-2xl p-8 text-primary-foreground shadow-lg">
                            <h4 className="text-xl font-bold mb-2">
                                Ready to Start Your Journey?
                            </h4>
                            <p className="text-primary-foreground/80 mb-4">
                                Join thousands of learners who have transformed
                                their careers with Innodemy.
                            </p>
                            <Button className="bg-background text-foreground hover:bg-background/90 shadow-sm">
                                Explore Courses
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {featureCards.map((card) => (
                            <Card
                                key={card.id}
                                className={`${card.bgColor} ${card.borderColor} border-2 hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-2xl`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        {/* Icon */}
                                        <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            {card.icon}
                                        </div>

                                        {/* Title */}
                                        <h4 className="font-bold text-gray-900 text-sm leading-tight">
                                            {card.title}
                                        </h4>

                                        {/* Description */}
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-16 bg-card rounded-2xl p-8 shadow-lg border border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                                50,000+
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Students Enrolled
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 dark:from-emerald-400 to-teal-600 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                                500+
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Expert Courses
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 dark:from-purple-400 to-pink-600 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                                95%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Success Rate
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 dark:from-orange-400 to-red-600 dark:to-red-400 bg-clip-text text-transparent mb-2">
                                24/7
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Support Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
