"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { getWebinarById } from "@/lib/data/webinars";
import { Webinar } from "@/lib/models";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Eye, User, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthSidebar from "@/components/AuthSidebar";

export default function WebinarDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { user, isLoading } = useAuth();
    const [webinar, setWebinar] = useState<Webinar | null>(null);
    const [showAuthSidebar, setShowAuthSidebar] = useState(false);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

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

    // Close auth sidebar and show success message when user logs in
    useEffect(() => {
        if (user && showAuthSidebar) {
            setShowAuthSidebar(false);
            setJustLoggedIn(true);
            // The component will automatically re-render and show the authenticated view
            router.refresh();

            // Clear the "just logged in" state after 2 seconds
            setTimeout(() => {
                setJustLoggedIn(false);
            }, 2000);
        }
    }, [user, showAuthSidebar, router]);

    // Show loading state while checking authentication or fetching webinar
    if (isLoading || !webinar) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show login prompt if not authenticated
    if (!user) {
        return (
            <>
                <div className="min-h-screen bg-background">
                    {/* Hero Section with Login Prompt */}
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-12 md:py-16">
                        <Container>
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="mb-6 hover:bg-primary/10"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Home
                                </Button>
                            </Link>

                            <div className="max-w-4xl mx-auto">
                                {/* Lock Icon and Message */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                                        <Lock className="w-10 h-10 text-primary" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                        Login Required to Watch This Webinar
                                    </h1>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        This free masterclass is available exclusively for registered users.
                                        Please log in or create a free account to access this content.
                                    </p>
                                </div>

                                {/* Webinar Preview Card */}
                                <div className="bg-card rounded-lg border border-border overflow-hidden shadow-xl">
                                    <div className="grid md:grid-cols-2 gap-6 p-6">
                                        {/* Left: Thumbnail */}
                                        <div className="relative">
                                            <div className="aspect-video rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={webinar.image}
                                                    alt={webinar.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Lock className="w-12 h-12 text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                                                FREE
                                            </div>
                                            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                                {webinar.duration}
                                            </div>
                                        </div>

                                        {/* Right: Info */}
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold line-clamp-2">
                                                {webinar.title}
                                            </h2>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                    <span>by {webinar.instructor}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Date: {webinar.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Eye className="h-4 w-4" />
                                                    <span>{webinar.views.toLocaleString()} views</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {webinar.topics.slice(0, 4).map((topic, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Login Button */}
                                    <div className="p-6 bg-muted/30 border-t border-border">
                                        <Button
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold"
                                            onClick={() => setShowAuthSidebar(true)}
                                        >
                                            <LogIn className="mr-2 h-5 w-5" />
                                            Login to Watch This Free Webinar
                                        </Button>
                                        <p className="text-center text-sm text-muted-foreground mt-3">
                                            Don't have an account? Sign up for free in seconds!
                                        </p>
                                    </div>
                                </div>

                                {/* Benefits Section */}
                                <div className="mt-8 grid md:grid-cols-3 gap-4">
                                    <div className="bg-card rounded-lg p-4 border border-border text-center">
                                        <div className="text-2xl font-bold text-primary mb-2">100% Free</div>
                                        <p className="text-sm text-muted-foreground">
                                            No payment required, just sign up
                                        </p>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 border border-border text-center">
                                        <div className="text-2xl font-bold text-primary mb-2">Expert Teachers</div>
                                        <p className="text-sm text-muted-foreground">
                                            Learn from industry professionals
                                        </p>
                                    </div>
                                    <div className="bg-card rounded-lg p-4 border border-border text-center">
                                        <div className="text-2xl font-bold text-primary mb-2">Lifetime Access</div>
                                        <p className="text-sm text-muted-foreground">
                                            Watch anytime, anywhere
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>

                {/* Auth Sidebar */}
                <AuthSidebar
                    isOpen={showAuthSidebar}
                    onClose={() => setShowAuthSidebar(false)}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Login Success Message */}
            {justLoggedIn && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
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
                        <span className="font-semibold">Login successful! Enjoy the webinar</span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-12 md:py-16">
                <Container>
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="mb-6 hover:bg-primary/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Left: Content */}
                        <div className="space-y-6">
                            <div className="inline-block bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                                FREE WEBINAR
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                {webinar.title}
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {webinar.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span>Date: {webinar.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span>{webinar.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-5 w-5 text-primary" />
                                    <span>{webinar.views.toLocaleString()} views</span>
                                </div>
                            </div>

                            {/* Topics */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">
                                    এই ফ্রি ওয়েবিনারে যা যা শিখবেন:
                                </h3>
                                <div className="space-y-2">
                                    {webinar.topics.map((topic, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                            <span className="text-muted-foreground">
                                                {topic}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Video and Instructor */}
                        <div className="space-y-6">
                            {/* Video Player */}
                            <div className="bg-card rounded-lg overflow-hidden border border-border">
                                <div className="aspect-video bg-black relative">
                                    <iframe
                                        src={webinar.videoUrl}
                                        title={webinar.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
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
                                        <span>Executive - Product Experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Additional Content Section */}
            <Container className="py-12">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Additional Info */}
                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                        <h3 className="font-bold text-xl mb-4">
                            কোর্সফার্ম আপনাকে শেখান দেন শেখার জন্য!
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            আপনি যদি শিখতে চান, ই-কমার্স, এবং প্রভৃতি সেক্টরে কাজ করেন
                            তাহলা প্রথমেই আপনাকে আর্টিফিশিয়াল ইন্টেলিজেন্স এবং মেশিন
                            লার্নিং এর সাথে পেমেন্ট অটোমেশন কিভাবে কাজ করে সেটা জানতে
                            হবে। এই বিনামূল্যের সেশনে আপনি শিখবেন কিভাবে ML ব্যবহার করে
                            পেমেন্ট সিস্টেম আরও নিরাপদ এবং দ্রুত করা যায়।
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-border">
                        <h3 className="font-bold text-2xl mb-3">
                            আরও শিখতে চান?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            আমাদের পূর্ণ কোর্সে এনরোল করুন এবং এক্সপার্ট হয়ে উঠুন!
                        </p>
                        <Link href="/courses">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold"
                            >
                                Browse All Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
