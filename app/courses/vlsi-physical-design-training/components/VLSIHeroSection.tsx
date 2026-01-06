"use client";
import { Video, Play, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseHighlights from "./CourseHighlights";

interface VLSIHeroSectionProps {
    courseData: {
        title: string;
        description: string;
        price: number;
        originalPrice: number;
        thumbnailUrl?: string;
        checkoutLink?: string;
        videoLabel: string;
        enrollButtonTextShort: string;
        liveCourseLabel: string;
        rating?: number;
        totalRatings?: number;
    };
    onVideoClick: () => void;
    onEnrollClick?: () => void;
}

const ENROLLMENT_PHONE = "01521428597";

export default function VLSIHeroSection({
    courseData,
    onVideoClick,
    onEnrollClick,
}: VLSIHeroSectionProps) {
    // Generate consistent rating values
    const displayRating = courseData.rating || 4.6;
    const displayTotalRatings = courseData.totalRatings || 95;

    const handleWhatsAppClick = () => {
        const message = `Hi, I'm interested in enrolling in "${courseData.title}". Can you help me with the enrollment process?`;
        const whatsappUrl = `https://wa.me/88${ENROLLMENT_PHONE}?text=${encodeURIComponent(
            message
        )}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleShareClick = async () => {
        const shareData = {
            title: courseData.title,
            text: `Check out this course: ${courseData.title}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy URL to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert("Course link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-white dark:from-primary/20 dark:via-secondary/20 dark:to-gray-900">
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Course Info - 2 columns */}
                    <div className="lg:col-span-2">
                        {/* Live Course Badge */}
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded text-sm font-semibold mb-3">
                            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></div>
                            {courseData.liveCourseLabel}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {courseData.title}
                        </h1>

                        {/* Rating Section */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(displayRating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-300 text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-bold text-foreground">
                                {displayRating.toFixed(1)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                ({displayTotalRatings} ratings)
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6 w-full">
                            <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-line text-justify">
                                {courseData.description}
                            </div>
                        </div>

                        {/* Course Highlights */}
                        <CourseHighlights />
                    </div>

                    {/* Right: Video & Enrollment - 1 column */}
                    <div className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
                        {/* Video Thumbnail */}
                        <div
                            className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-4 group cursor-pointer border border-gray-100 dark:border-gray-700"
                            onClick={onVideoClick}
                        >
                            <Image
                                src={
                                    courseData.thumbnailUrl ||
                                    "/placeholder-course.jpg"
                                }
                                alt={courseData.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    <Play className="w-12 h-12 text-primary fill-primary" />
                                </div>
                            </div>
                            {/* Video Corner Label */}
                            <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                <span className="text-xs font-bold">
                                    {courseData.videoLabel}
                                </span>
                            </div>
                        </div>

                        {/* Enrollment Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                            {/* Pricing Section */}
                            <div className="bg-gradient-to-br from-primary/8 via-primary/5 to-white dark:from-primary/10 dark:via-primary/5 dark:to-gray-800 p-5 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                ৳
                                                {courseData.price.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                                                ৳
                                                {courseData.originalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-md text-xs font-semibold">
                                            <span>
                                                {Math.round(
                                                    ((courseData.originalPrice -
                                                        courseData.price) /
                                                        courseData.originalPrice) *
                                                        100
                                                )}
                                                % OFF
                                            </span>
                                        </div>
                                    </div>
                                    <button className="bg-primary dark:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 dark:hover:bg-primary transition-all duration-200 shadow-sm hover:shadow-md">
                                        📋 Coupon
                                    </button>
                                </div>

                                {/* Enrollment Button */}
                                {onEnrollClick ? (
                                    <Button
                                        onClick={onEnrollClick}
                                        className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/95 hover:via-primary hover:to-primary text-white font-bold py-4 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        {courseData.enrollButtonTextShort}
                                    </Button>
                                ) : courseData.checkoutLink ? (
                                    <Link href={courseData.checkoutLink}>
                                        <Button className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/95 hover:via-primary hover:to-primary text-white font-bold py-4 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                                            {courseData.enrollButtonTextShort}
                                        </Button>
                                    </Link>
                                ) : null}

                                {/* Free Consultation Badge */}
                                <div className="flex justify-center mt-3">
                                    <Button
                                        onClick={() => {
                                            const element =
                                                document.getElementById(
                                                    "book-call"
                                                );
                                            if (element) {
                                                element.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "center",
                                                });
                                            }
                                        }}
                                        className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20 hover:bg-secondary/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                                    >
                                        📞 Free Consultation
                                    </Button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleShareClick}
                                        className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg py-3 transition-all duration-200 hover:shadow-sm"
                                    >
                                        <svg
                                            className="w-5 h-5 text-primary dark:text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                        </svg>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            Share
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="flex items-center justify-center gap-2 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg py-3 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span className="text-sm font-semibold">
                                            WhatsApp
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
