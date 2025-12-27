"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { getWebinarById, getAllWebinars } from "@/lib/data/webinars";
import { Webinar } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, Eye, User, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function UpcomingWebinarDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [webinar, setWebinar] = useState<Webinar | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        // Load webinar data
        if (params.id && typeof params.id === "string") {
            const webinarData = getWebinarById(params.id);
            if (webinarData) {
                setWebinar(webinarData);
            } else {
                router.push("/");
            }
        }
    }, [params.id, router]);

    // Get related webinars (exclude current webinar)
    const relatedWebinars = useMemo(() => {
        const allWebinars = getAllWebinars();
        return allWebinars.filter((w) => w.id !== webinar?.id).slice(0, 3);
    }, [webinar]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ fullName: "", email: "", phone: "" });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 1500);
    };

    // Show loading state while fetching webinar
    if (!webinar) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-1">
                                    Registration Successful!
                                </h3>
                                <p className="text-sm text-white/90">
                                    Your registration has been completed
                                    successfully. You will receive detailed
                                    information via email shortly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-background py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <Link href="/upcoming-webinar">
                        <Button
                            variant="ghost"
                            className="mb-6 hover:bg-accent/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Upcoming Webinars
                        </Button>
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left: Content - 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 w-fit">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                UPCOMING WEBINAR
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                {webinar.title}
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {webinar.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-accent" />
                                    <span>Coming Soon</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <span>{webinar.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-accent" />
                                    <span>
                                        726+ students have successfully enrolled
                                        in this course!
                                    </span>
                                </div>
                            </div>

                            {/* Topics */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">
                                    What you'll learn in this free webinar:
                                </h3>
                                <div className="space-y-2">
                                    {webinar.topics.map((topic, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                                            <span className="text-muted-foreground">
                                                {topic}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Registration Form & Instructor - 1 column */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Thumbnail with Countdown */}
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src={webinar.image}
                                    alt={webinar.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Badges */}
                                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    UPCOMING
                                </div>
                                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                    {webinar.duration}
                                </div>
                            </div>

                            {/* Countdown Timer */}
                            <div className="bg-card rounded-lg border border-border p-4">
                                <h3 className="text-center font-bold text-lg mb-3">
                                    Register for Free
                                </h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { value: "00", label: "Days" },
                                        { value: "00", label: "Hrs" },
                                        { value: "00", label: "Min" },
                                        { value: "00", label: "Sec" },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-2 text-center border border-accent/20"
                                        >
                                            <div className="text-2xl font-bold text-accent">
                                                {item.value}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {item.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                    <Users className="h-3 w-3 inline mr-1" />
                                    726+ students have successfully enrolled!
                                </p>
                            </div>

                            {/* Registration Form */}
                            <div className="bg-card rounded-lg border border-border p-6">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label
                                            htmlFor="fullName"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            Your Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            Your Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="example@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            Your Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="01234567890"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold text-base shadow-lg"
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Register Now"}
                                    </Button>
                                </form>
                            </div>

                            {/* Instructor Card */}
                            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                                <div className="text-sm text-muted-foreground border-b border-border pb-2">
                                    Instructor
                                </div>

                                <div className="flex items-start gap-4">
                                    {webinar.instructorImage && (
                                        <Image
                                            src={webinar.instructorImage}
                                            alt={webinar.instructor}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover"
                                        />
                                    )}
                                    <div className="space-y-2 flex-1">
                                        <h3 className="font-bold text-xl">
                                            {webinar.instructor}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {webinar.instructorBio}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>
                                            Executive - Product Experience
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Content Section */}
            <div className="container mx-auto px-4 max-w-7xl py-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Related Webinars */}
                    {relatedWebinars.length > 0 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-2">
                                    Related Upcoming Webinars
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedWebinars.map((relatedWebinar) => (
                                    <UpcomingWebinarCard
                                        key={relatedWebinar.id}
                                        webinar={relatedWebinar}
                                    />
                                ))}
                            </div>
                            <div className="text-center pt-4">
                                <Link href="/upcoming-webinar">
                                    <Button variant="outline" size="lg">
                                        View All Upcoming Webinars
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 border-t border-border mt-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <div className="text-center max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold mb-4">
                                    Want to Learn More?
                                </h2>
                                <p className="text-muted-foreground mb-6 text-lg">
                                    Explore our full courses and take your
                                    skills to the next level with comprehensive
                                    learning programs.
                                </p>
                                <Link href="/courses">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white"
                                    >
                                        Browse All Courses
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// UpcomingWebinarCard Component
function UpcomingWebinarCard({ webinar }: { webinar: Webinar }) {
    return (
        <Link href={`/upcoming-webinar/${webinar.id}`}>
            <Card className="group relative bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full">
                <div className="relative">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <Image
                            src={webinar.image}
                            alt={webinar.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            UPCOMING
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {webinar.duration}
                        </div>
                    </div>
                </div>

                <CardContent className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-3 group-hover:text-accent transition-colors">
                        {webinar.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                        {webinar.instructorImage && (
                            <Image
                                src={webinar.instructorImage}
                                alt={webinar.instructor}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                                {webinar.instructor}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Instructor
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Coming Soon</span>
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                        {webinar.topics.slice(0, 3).map((topic, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium"
                            >
                                {topic}
                            </span>
                        ))}
                        {webinar.topics.length > 3 && (
                            <span className="text-xs bg-gray-100 dark:bg-muted text-muted-foreground px-2 py-1 rounded-md font-medium">
                                +{webinar.topics.length - 3} more
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
