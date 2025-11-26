"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Users,
    Heart,
    Zap,
    Award,
    BookOpen,
    Coffee,
    Laptop,
    TrendingUp,
    Globe,
    Shield,
    Target,
    Rocket,
} from "lucide-react";
import Link from "next/link";

interface JobListing {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
}

const jobListings: JobListing[] = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote / Dhaka, Bangladesh",
        type: "Full-time",
        salary: "$50k - $80k",
        description:
            "We're looking for an experienced frontend developer to build amazing learning experiences with React and Next.js.",
        requirements: [
            "5+ years of React/Next.js experience",
            "Strong TypeScript skills",
            "Experience with UI/UX design principles",
            "Passion for education technology",
        ],
    },
    {
        id: "2",
        title: "Backend Engineer",
        department: "Engineering",
        location: "Remote / Dhaka, Bangladesh",
        type: "Full-time",
        salary: "$45k - $75k",
        description:
            "Join our backend team to build scalable APIs and services that power our learning platform.",
        requirements: [
            "3+ years with Node.js and databases",
            "Experience with MongoDB and PostgreSQL",
            "Knowledge of microservices architecture",
            "Strong problem-solving skills",
        ],
    },
    {
        id: "3",
        title: "Course Content Creator",
        department: "Content",
        location: "Hybrid / Dhaka, Bangladesh",
        type: "Full-time",
        salary: "$35k - $55k",
        description:
            "Create engaging course content and curriculum for programming and technology courses.",
        requirements: [
            "Expert in programming (Python/JavaScript/React)",
            "Previous teaching or content creation experience",
            "Excellent communication skills",
            "Passion for education",
        ],
    },
    {
        id: "4",
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote / Dhaka, Bangladesh",
        type: "Full-time",
        salary: "$40k - $65k",
        description:
            "Design intuitive and beautiful interfaces that make learning enjoyable for thousands of students.",
        requirements: [
            "3+ years of UI/UX design experience",
            "Proficiency in Figma and design systems",
            "Strong portfolio of product design work",
            "Understanding of accessibility standards",
        ],
    },
    {
        id: "5",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$55k - $85k",
        description:
            "Maintain and improve our cloud infrastructure, CI/CD pipelines, and deployment processes.",
        requirements: [
            "Experience with AWS/GCP/Azure",
            "Strong Docker and Kubernetes knowledge",
            "CI/CD pipeline experience",
            "Infrastructure as Code (Terraform/CloudFormation)",
        ],
    },
    {
        id: "6",
        title: "Marketing Manager",
        department: "Marketing",
        location: "Hybrid / Dhaka, Bangladesh",
        type: "Full-time",
        salary: "$40k - $60k",
        description:
            "Lead our marketing efforts to reach more students and grow our community.",
        requirements: [
            "5+ years in digital marketing",
            "Experience with EdTech or SaaS marketing",
            "Strong analytical and creative skills",
            "Knowledge of SEO, content marketing, and social media",
        ],
    },
];

const benefits = [
    {
        icon: <Laptop className="w-6 h-6" />,
        title: "Remote First",
        description:
            "Work from anywhere in the world with flexible hours that suit your lifestyle.",
    },
    {
        icon: <Heart className="w-6 h-6" />,
        title: "Health Insurance",
        description:
            "Comprehensive health coverage for you and your family members.",
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Learning Budget",
        description:
            "$2000 annual budget for courses, books, and conferences to keep growing.",
    },
    {
        icon: <Coffee className="w-6 h-6" />,
        title: "Unlimited PTO",
        description:
            "Take time off when you need it. We trust you to manage your time.",
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Performance Bonuses",
        description:
            "Quarterly bonuses based on individual and company performance.",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Team Retreats",
        description:
            "Annual company retreats to connect with the team in person.",
    },
];

const values = [
    {
        icon: <Target className="w-8 h-8" />,
        title: "Student First",
        description:
            "Everything we do is centered around creating the best learning experience for our students.",
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "Innovation",
        description:
            "We embrace new technologies and methods to continuously improve education.",
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Collaboration",
        description:
            "We believe great things happen when diverse minds work together.",
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Growth Mindset",
        description:
            "We encourage continuous learning and personal development for everyone.",
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Transparency",
        description:
            "We operate with honesty and openness in all our communications.",
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Diversity",
        description:
            "We celebrate differences and create an inclusive environment for all.",
    },
];

export default function CareerPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#226481] to-[#1a4f63] text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-6 bg-[#e9ae30] text-white hover:bg-[#d19d28] text-lg px-6 py-2">
                            We&apos;re Hiring!
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Join Us in Transforming
                            <span className="block text-[#e9ae30]">
                                Education Technology
                            </span>
                        </h1>
                        <p className="text-xl mb-8 text-white/90 leading-relaxed">
                            Help millions of students worldwide achieve their
                            dreams through accessible, high-quality education.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#e9ae30] hover:bg-[#d19d28] text-white font-semibold text-lg px-8 py-6"
                            asChild
                        >
                            <a href="#open-positions">View Open Positions</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-card border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-[#226481] mb-2">
                                50+
                            </div>
                            <div className="text-muted-foreground">
                                Team Members
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#226481] mb-2">
                                15+
                            </div>
                            <div className="text-muted-foreground">
                                Countries
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#226481] mb-2">
                                100k+
                            </div>
                            <div className="text-muted-foreground">
                                Students
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#226481] mb-2">
                                4.8★
                            </div>
                            <div className="text-muted-foreground">
                                Average Rating
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Our Values
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            These core principles guide everything we do at
                            Innodemy
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#226481] to-[#e9ae30] rounded-xl flex items-center justify-center text-white mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Benefits & Perks
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            We take care of our team so they can focus on doing
                            their best work
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-[#226481]/10 rounded-lg flex items-center justify-center text-[#226481] mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section
                id="open-positions"
                className="py-20 bg-background scroll-mt-20"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Open Positions
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Find your perfect role and join our mission to make
                            education accessible to everyone
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto space-y-6">
                        {jobListings.map((job) => (
                            <div
                                key={job.id}
                                className="bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-[#226481]"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#226481] to-[#e9ae30] rounded-lg flex items-center justify-center text-white shrink-0">
                                                <Briefcase className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-1">
                                                    {job.title}
                                                </h3>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {job.department}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-4">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                {job.salary}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-2">
                                                Key Requirements:
                                            </p>
                                            <ul className="space-y-1">
                                                {job.requirements.map(
                                                    (req, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                                        >
                                                            <Zap className="w-4 h-4 text-[#e9ae30] shrink-0 mt-0.5" />
                                                            {req}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <Button
                                            className="bg-[#226481] hover:bg-[#1a4f63] text-white w-full md:w-auto"
                                            asChild
                                        >
                                            <Link
                                                href={`mailto:careers@innodemy.com?subject=Application for ${job.title}`}
                                            >
                                                Apply Now
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#226481] to-[#1a4f63] text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Don&apos;t See the Right Role?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            We&apos;re always looking for talented people to
                            join our team. Send us your resume and let&apos;s
                            talk about how you can contribute to our mission.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#e9ae30] hover:bg-[#d19d28] text-white font-semibold text-lg px-8"
                            asChild
                        >
                            <Link href="mailto:careers@innodemy.com">
                                Send Your Resume
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
