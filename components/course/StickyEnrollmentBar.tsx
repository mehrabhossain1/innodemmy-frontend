"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface StickyEnrollmentBarProps {
    price: number;
    originalPrice: number;
    currency?: string;
    promoLabel?: string;
    enrollButtonText?: string;
    checkoutLink?: string;
    showPromo?: boolean;
    // Optional custom button slot for complex enrollment logic
    customButton?: ReactNode;
    // Optional callback for enrollment click (takes precedence over checkoutLink)
    onEnrollClick?: () => void;
}

export default function StickyEnrollmentBar({
    price,
    originalPrice,
    currency = "৳",
    promoLabel = "প্রোমো অ্যাপ্লাইড",
    enrollButtonText = "ব্যাচে ভর্তি হোন →",
    checkoutLink,
    showPromo = true,
    customButton,
    onEnrollClick,
}: StickyEnrollmentBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    {/* Price Section */}
                    <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {currency}
                                {price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                {currency}
                                {originalPrice.toLocaleString()}
                            </span>
                        </div>
                        {showPromo && (
                            <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded inline-block w-fit mt-1 border border-green-200 dark:border-green-800">
                                {promoLabel}
                            </span>
                        )}
                    </div>

                    {/* Enrollment Button */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                        {customButton ? (
                            customButton
                        ) : onEnrollClick ? (
                            <Button
                                onClick={onEnrollClick}
                                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-5 text-base whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200 shadow-secondary/20"
                            >
                                {enrollButtonText}
                            </Button>
                        ) : checkoutLink ? (
                            <Link
                                href={checkoutLink}
                                className="block w-full sm:w-auto"
                            >
                                <Button className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-5 text-base whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200 shadow-secondary/20">
                                    {enrollButtonText}
                                </Button>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
