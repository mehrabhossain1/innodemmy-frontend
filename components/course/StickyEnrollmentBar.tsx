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
}: StickyEnrollmentBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Price Section */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                {currency}
                                {price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                {currency}
                                {originalPrice.toLocaleString()}
                            </span>
                        </div>
                        {showPromo && (
                            <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded inline-block w-fit mt-1">
                                {promoLabel}
                            </span>
                        )}
                    </div>

                    {/* Enrollment Button */}
                    <div className="flex-shrink-0">
                        {customButton ? (
                            customButton
                        ) : checkoutLink ? (
                            <Link href={checkoutLink}>
                                <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-5 text-base whitespace-nowrap shadow-lg shadow-secondary/20">
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
