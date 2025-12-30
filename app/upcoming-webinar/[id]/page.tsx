"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { getWebinarById, getUpcomingWebinars } from "@/lib/data/webinars";
import { Webinar } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, User, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function UpcomingWebinarDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [webinar, setWebinar] = useState<Webinar | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        qualification: "",
        institution: "",
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

    // Countdown timer for January 11, 2025, 9 PM Bangladesh Time
    useEffect(() => {
        // January 11, 2026, 9 PM Bangladesh Time (UTC+6)
        // Converting to UTC: 9 PM in UTC+6 = 3 PM (15:00) UTC
        const targetDate = new Date("2026-01-11T15:00:00Z").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    // Get related webinars (exclude current webinar)
    const relatedWebinars = useMemo(() => {
        const allWebinars = getUpcomingWebinars();
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
        setErrorMessage("");

        if (!webinar) {
            setErrorMessage("Webinar information not available");
            setIsSubmitting(false);
            return;
        }

        try {
            // Validate phone number
            if (!/^[0-9]{11}$/.test(formData.phone)) {
                setErrorMessage("Phone number must be exactly 11 digits");
                setIsSubmitting(false);
                return;
            }

            // Validate email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                setErrorMessage("Please enter a valid email address");
                setIsSubmitting(false);
                return;
            }

            const response = await fetch("/api/webinar-registrations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    webinarId: webinar.id,
                    ...formData,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || "Registration failed");
                setIsSubmitting(false);
                return;
            }

            // Success
            setShowSuccess(true);
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                qualification: "",
                institution: "",
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 w-fit">
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
                                    <span>11th January, 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <span>
                                        9:00 PM - 11:00 PM (Bangladesh Time)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM9 7h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z" />
                                    </svg>
                                    <span>Platform: Zoom</span>
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
                            {webinar.id !==
                                "higher-studies-abroad-scholarship" && (
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
                            )}

                            {/* What You'll Learn Section */}
                            {webinar.id ===
                                "higher-studies-abroad-scholarship" && (
                                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                                    <h3 className="font-bold text-xl mb-4">
                                        কী কী শিখতে পারবেন এই ওয়েবিনারে?
                                    </h3>

                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                আপনার জন্য কোন দেশ সেরা হবে?
                                                যুক্তরাষ্ট্র (USA), কানাডা,
                                                যুক্তরাজ্য (UK), অস্ট্রেলিয়া,
                                                জাপান ও কোরিয়ার মতো জনপ্রিয়
                                                দেশগুলোর সুযোগ-সুবিধা সম্পর্কে
                                                আলোচনা।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                একাডেমিক রেজাল্ট কেমন হতে হবে
                                                এবং IELTS, TOEFL কিংবা GRE-র মতো
                                                পরীক্ষাগুলোর প্রস্তুতি কীভাবে
                                                নেবেন।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                বিভিন্ন ধরনের স্কলারশিপ
                                                (Full-fund/Partial) পাওয়ার
                                                উপায়।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                কীভাবে একটি শক্তিশালী SOP, LOR
                                                এবং প্রফেশনাল CV তৈরি করবেন। সেই
                                                সাথে সহ-শিক্ষা কার্যক্রম
                                                (Extracurricular) ও রিসার্চ
                                                পেপারের গুরুত্ব।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                সঠিক সময়ে সঠিক প্রফেসরের সাথে
                                                যোগাযোগের কৌশল এবং আবেদনের
                                                উপযুক্ত সময় নির্ধারণ।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                বিদেশের বিশ্ববিদ্যালয়ে বর্তমান
                                                ছাত্র বা অ্যালুমনাইদের সাথে
                                                কীভাবে যোগাযোগ স্থাপন করবেন এবং
                                                কেনো প্রয়োজন?
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Why Study Abroad Section */}
                            {webinar.id ===
                                "higher-studies-abroad-scholarship" && (
                                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                                    <h3 className="font-bold text-xl mb-4">
                                        কেন Abroad থেকে উচ্চশিক্ষা গ্রহণ করবেন?
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        উচ্চশিক্ষা শুধুমাত্র একটি ডিগ্রির জন্য
                                        নয়, বরং এটি আপনার জীবন আমূল বদলে
                                        দেওয়ার একটি প্রক্রিয়া:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                বিদেশের ডিগ্রি আপনাকে বিশ্বের
                                                নামী-দামী কোম্পানিগুলোতে কাজ
                                                করার সুযোগ করে দেয়। আন্তর্জাতিক
                                                কর্মপরিবেশে নিজেকে খাপ খাইয়ে
                                                নিতে এটি সহায়ক।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                বিদেশের বিশ্ববিদ্যালয়গুলো
                                                আধুনিক ল্যাবরেটরি, লাইব্রেরি এবং
                                                উন্নত প্রযুক্তি ব্যবহারের সুযোগ
                                                দেয়, যা উচ্চমানের গবেষণার জন্য
                                                অপরিহার্য।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                সম্পূর্ণ ভিন্ন একটি পরিবেশে
                                                বসবাসের মাধ্যমে আপনার মধ্যে
                                                স্বনির্ভরতা গড়ে ওঠে। ভিন্ন
                                                ভিন্ন সংস্কৃতির মানুষের সাথে
                                                মেলামেশার ফলে আপনার দৃষ্টিভঙ্গি
                                                প্রসারিত হয়।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                বিশ্বের বিভিন্ন প্রান্তের মেধাবী
                                                শিক্ষার্থীদের সাথে কাজ করার ফলে
                                                একটি শক্তিশালী প্রফেশনাল
                                                নেটওয়ার্ক তৈরি হয়, যা সারাজীবন
                                                কাজে লাগে।
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent font-bold mt-1">
                                                •
                                            </span>
                                            <span className="text-muted-foreground">
                                                প্রায় সকল দেশেই পড়াশোনা শেষে
                                                কাজের অনুমতির (Work Permit)
                                                পাশাপাশি স্থায়ীভাবে বসবাসের
                                                সুযোগ থাকে, যা আপনার ভবিষ্যৎ
                                                জীবনকে আর্থিকভাবে সচ্ছল ও নিরাপদ
                                                করে।
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
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

                            {/* Instructor Card */}
                            <div className="bg-card rounded-xl border-2 border-accent p-6 shadow-lg">
                                {/* Header */}
                                <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-accent">
                                    <div className="p-2 rounded-lg bg-accent">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-accent uppercase tracking-wide">
                                        Instructor
                                    </span>
                                </div>

                                <div className="flex items-start gap-4">
                                    {webinar.instructorImage && (
                                        <div className="relative flex-shrink-0">
                                            <Image
                                                src={webinar.instructorImage}
                                                alt={webinar.instructor}
                                                width={80}
                                                height={80}
                                                className="rounded-full object-cover border-3 border-accent shadow-md"
                                            />
                                            {/* Verified badge */}
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-background">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-foreground leading-tight">
                                            {webinar.instructor}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {webinar.instructorBio}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Countdown Timer */}
                            <div className="relative bg-gradient-to-br from-accent via-primary to-accent rounded-xl p-[3px] shadow-2xl animate-pulse">
                                <div className="bg-background rounded-[10px] p-6">
                                    <div className="text-center mb-5">
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2">
                                            <svg
                                                className="w-4 h-4 animate-bounce"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Limited Seats Available
                                        </div>
                                        <h3 className="font-bold text-xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                            Register for Free
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2.5">
                                        {[
                                            {
                                                value: countdown.days
                                                    .toString()
                                                    .padStart(2, "0"),
                                                label: "Days",
                                            },
                                            {
                                                value: countdown.hours
                                                    .toString()
                                                    .padStart(2, "0"),
                                                label: "Hrs",
                                            },
                                            {
                                                value: countdown.minutes
                                                    .toString()
                                                    .padStart(2, "0"),
                                                label: "Min",
                                            },
                                            {
                                                value: countdown.seconds
                                                    .toString()
                                                    .padStart(2, "0"),
                                                label: "Sec",
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="relative bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur rounded-lg p-3 text-center shadow-lg hover:scale-105 transition-transform border border-accent/30"
                                            >
                                                <div className="text-3xl font-black bg-gradient-to-br from-accent via-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
                                                    {item.value}
                                                </div>
                                                <div className="text-xs font-bold text-accent uppercase mt-1 tracking-wider">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-accent/20">
                                        <p className="text-xs text-center font-semibold flex items-center justify-center gap-1.5">
                                            <Users className="h-4 w-4 text-accent animate-pulse" />
                                            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                                726+ students have successfully
                                                enrolled!
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <div className="bg-card rounded-lg border border-border p-6">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Error Message */}
                                    {errorMessage && (
                                        <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div>
                                        <Label
                                            htmlFor="fullName"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            আপনার নাম
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
                                            আপনার ইমেইল
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
                                            আপনার ফোন নম্বর
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

                                    <div>
                                        <Label
                                            htmlFor="qualification"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            বর্তমান শিক্ষাগত যোগ্যতা
                                        </Label>
                                        <Input
                                            id="qualification"
                                            name="qualification"
                                            type="text"
                                            placeholder="HSC / BSc in EEE Final Year / Master's in Social Science"
                                            value={formData.qualification}
                                            onChange={handleInputChange}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="institution"
                                            className="text-sm font-medium mb-1.5 block"
                                        >
                                            শিক্ষা প্রতিষ্ঠান অথবা অফিসের নাম
                                        </Label>
                                        <Input
                                            id="institution"
                                            name="institution"
                                            type="text"
                                            placeholder="Your Institution or Office Name"
                                            value={formData.institution}
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
