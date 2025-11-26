"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, CreditCard, Globe, Shield } from "lucide-react";

interface Course {
    _id: string;
    title: string;
    thumbnail?: string;
    price?: number;
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isLoading } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("bkash");
    const [phoneNumber, setPhoneNumber] = useState("");

    const courseId = searchParams.get("course");

    useEffect(() => {
        async function fetchCourse() {
            if (!courseId) {
                router.push("/courses");
                return;
            }

            try {
                const response = await fetch(`/api/courses/${courseId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data.course);
                } else {
                    router.push("/courses");
                }
            } catch (error) {
                console.error("Failed to fetch course:", error);
                router.push("/courses");
            } finally {
                setLoading(false);
            }
        }

        fetchCourse();
    }, [courseId, router]);

    const handlePayment = async () => {
        if (!course || !user) return;

        // Here you would integrate with actual payment gateway
        alert(`Payment processing for ${course.title}. Phone: ${phoneNumber}`);

        // After successful payment, redirect to dashboard
        // router.push("/dashboard");
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!course || !user) {
        return null;
    }

    const originalPrice = course.price ? Math.round(course.price * 1.6) : 0;
    const discount = originalPrice - (course.price || 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            {/* Header */}
            <div className="bg-white dark:bg-card border-b border-border sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <Link href={`/courses/${course._id}`}>
                        <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-accent">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Course
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Payment Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Details Card */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Course Details</h2>
                                <div className="flex gap-4">
                                    {course.thumbnail && (
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={course.thumbnail}
                                                alt={course.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                                        <div className="flex gap-2">
                                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                                ✓ Lifetime Access
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    {/* bKash */}
                                    <div className="space-y-4">
                                        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                            paymentMethod === "bkash"
                                                ? "border-primary bg-primary/5"
                                                : "border-gray-200 dark:border-border hover:border-primary/50"
                                        }`}>
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="bkash" id="bkash" />
                                                <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">bKash Payment</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-8 px-3 bg-pink-600 text-white rounded flex items-center text-sm font-bold">
                                                                bKash
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>
                                        </div>

                                        {/* Card Payment (India) */}
                                        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                            paymentMethod === "card-india"
                                                ? "border-primary bg-primary/5"
                                                : "border-gray-200 dark:border-border hover:border-primary/50"
                                        }`}>
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="card-india" id="card-india" />
                                                <Label htmlFor="card-india" className="flex-1 cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">Pay from India (Card)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>
                                        </div>

                                        {/* Card Payment (International) */}
                                        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                            paymentMethod === "card-international"
                                                ? "border-primary bg-primary/5"
                                                : "border-gray-200 dark:border-border hover:border-primary/50"
                                        }`}>
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="card-international" id="card-international" />
                                                <Label htmlFor="card-international" className="flex-1 cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">Pay Internationally (Card)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </RadioGroup>

                                {/* Phone Input (for bKash) */}
                                {paymentMethod === "bkash" && (
                                    <div className="mt-6 p-4 bg-gray-50 dark:bg-muted rounded-lg border border-gray-200 dark:border-border">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Phone className="h-5 w-5 text-primary mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium mb-1">
                                                    Please call to confirm your purchase
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Contact: <span className="font-semibold text-primary">+880 1704 258972</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    (Monday to Sunday, 10 AM - 10 PM)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Your Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+880 1XXXXXXXXX"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="bg-white dark:bg-background"
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Payment Summary</h2>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Course Price:</span>
                                        <span className="font-medium">৳ {originalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 font-medium flex items-center gap-1">
                                            <span className="text-lg">✓</span> Discount:
                                        </span>
                                        <span className="text-green-600 font-medium">- ৳ {discount.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-bold">Total Amount:</span>
                                            <span className="font-bold text-xl text-primary">৳ {(course.price || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Proceed Button */}
                                <Button
                                    onClick={handlePayment}
                                    disabled={paymentMethod === "bkash" && !phoneNumber}
                                    className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold py-6 text-base"
                                >
                                    Proceed to Payment
                                </Button>

                                {/* Security Badge */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    <span>Secure Payment</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
