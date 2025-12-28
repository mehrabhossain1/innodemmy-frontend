"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { getWebinarById, getRegularWebinars } from "@/lib/data/webinars";
import { Webinar } from "@/lib/models";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Eye,
    User,
    Lock,
    LogIn,
    Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthSidebar from "@/components/AuthSidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function WebinarDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
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

    // Get related webinars (exclude current webinar)
    const relatedWebinars = useMemo(() => {
        const allWebinars = getRegularWebinars();
        return allWebinars.filter((w) => w.id !== webinar?.id).slice(0, 3);
    }, [webinar]);

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
                        <span className="font-semibold">
                            Login successful! Enjoy the webinar
                        </span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="mb-6 hover:bg-primary/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left: Content - 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
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
                                    <span>
                                        {webinar.views.toLocaleString()} views
                                    </span>
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

                        {/* Right: Video & Instructor - 1 column */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Video Player */}
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl bg-black">
                                {user ? (
                                    <iframe
                                        src={webinar.videoUrl}
                                        title={webinar.title}
                                        className="w-full h-full absolute inset-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <>
                                        <Image
                                            src={webinar.image}
                                            alt={webinar.title}
                                            fill
                                            className="object-cover absolute inset-0"
                                        />
                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold z-10">
                                            FREE
                                        </div>
                                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold z-10">
                                            {webinar.duration}
                                        </div>
                                        {/* Login Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85 flex items-center justify-center z-[5]">
                                            <div className="text-center space-y-4 px-6 py-4 w-full max-w-[280px]">
                                                {/* Lock Icon with Glow */}
                                                <div className="relative inline-block mb-1">
                                                    <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full"></div>
                                                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/40">
                                                        <Lock className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>

                                                {/* Text */}
                                                <div className="space-y-1.5">
                                                    <h3 className="text-white font-bold text-lg">
                                                        Login Required
                                                    </h3>
                                                    <p className="text-white/70 text-xs leading-relaxed">
                                                        Please log in or create
                                                        a free account to watch
                                                        this webinar
                                                    </p>
                                                </div>

                                                {/* Button */}
                                                <Button
                                                    className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 text-sm py-2 h-auto"
                                                    onClick={() =>
                                                        setShowAuthSidebar(true)
                                                    }
                                                >
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    Login to Watch
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
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
                                    Related Masterclass
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedWebinars.map((relatedWebinar) => (
                                    <WebinarCard
                                        key={relatedWebinar.id}
                                        webinar={relatedWebinar}
                                    />
                                ))}
                            </div>
                            <div className="text-center pt-4">
                                <Link href="/webinar">
                                    <Button variant="outline" size="lg">
                                        View All Masterclass
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border mt-16">
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
                                        className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                                    >
                                        Browse All Courses
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth Sidebar */}
            <AuthSidebar
                isOpen={showAuthSidebar}
                onClose={() => setShowAuthSidebar(false)}
            />
        </div>
    );
}

// WebinarCard Component
function WebinarCard({ webinar }: { webinar: Webinar }) {
    return (
        <Link href={`/webinar/${webinar.id}`}>
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

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold">
                            FREE
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {webinar.duration}
                        </div>
                    </div>
                </div>

                <CardContent className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
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
                            <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{webinar.views.toLocaleString()} views</span>
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                        {webinar.topics.slice(0, 3).map((topic, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
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
