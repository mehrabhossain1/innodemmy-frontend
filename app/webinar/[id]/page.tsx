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
                                    {user ? (
                                        <iframe
                                            src={webinar.videoUrl}
                                            title={webinar.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <>
                                            <Image
                                                src={webinar.image}
                                                alt={webinar.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Login Overlay */}
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                                                <div className="text-center space-y-4 p-6">
                                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-2">
                                                        <Lock className="w-8 h-8 text-white" />
                                                    </div>
                                                    <h3 className="text-white font-bold text-xl">
                                                        Login Required
                                                    </h3>
                                                    <p className="text-white/80 text-sm max-w-xs">
                                                        Please log in or create a free account to watch this webinar
                                                    </p>
                                                    <Button
                                                        size="lg"
                                                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold mt-4"
                                                        onClick={() => setShowAuthSidebar(true)}
                                                    >
                                                        <LogIn className="mr-2 h-5 w-5" />
                                                        Login to Watch
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
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

            {/* Auth Sidebar */}
            <AuthSidebar
                isOpen={showAuthSidebar}
                onClose={() => setShowAuthSidebar(false)}
            />
        </div>
    );
}
