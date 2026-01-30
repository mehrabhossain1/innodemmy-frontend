"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    X,
    CreditCard,
    Phone,
    User,
    Hash,
    CheckCircle2,
    Mail,
    LogIn,
    UserPlus,
} from "lucide-react";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    coursePrice: number;
    courseId?: string;
}

export default function EnrollmentModal({
    isOpen,
    onClose,
    courseTitle,
    coursePrice,
    courseId,
}: EnrollmentModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        transactionId: "",
        paymentNumberLastDigits: "",
        paymentMethod: "bkash" as "bkash" | "nagad",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/enrollments/public", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    courseId,
                    courseTitle,
                    amount: coursePrice,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccess(true);
            } else {
                setErrorMessage(data.error || "Failed to submit enrollment");
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            transactionId: "",
            paymentNumberLastDigits: "",
            paymentMethod: "bkash",
        });
        onClose();
    };

    if (!isOpen) return null;

    // Success Modal
    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-8 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Enrollment Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                        আপনার এনরোলমেন্ট সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই
                        আপনার পেমেন্ট যাচাই করে আপনার সাথে যোগাযোগ করব।
                    </p>

                    {/* Login/Signup Prompt */}
                    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 border-2 border-primary/20 dark:border-primary/30 rounded-lg p-6 mb-6">
                        <p className="text-base text-gray-700 dark:text-gray-300 mb-4 font-medium">
                            <strong className="text-primary">Next Step:</strong> Create an account or
                            login to access your enrolled courses and track your
                            progress.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => {
                                    handleSuccessClose();
                                    // Redirect to home page with login intent
                                    router.push("/?auth=login");
                                }}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white text-base h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <LogIn className="w-5 h-5 mr-2" />
                                Login
                            </Button>
                            <Button
                                onClick={() => {
                                    handleSuccessClose();
                                    // Redirect to home page with signup intent
                                    router.push("/?auth=signup");
                                }}
                                className="flex-1 bg-secondary hover:bg-secondary/90 text-white text-base h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <UserPlus className="w-5 h-5 mr-2" />
                                Sign Up
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={handleSuccessClose}
                        variant="outline"
                        className="w-full h-11 text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/90 p-6 flex items-center justify-between rounded-t-xl z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            Enroll in Course
                        </h2>
                        <p className="text-white/90 text-sm">{courseTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Payment Instructions */}
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 border-l-4 border-primary p-5 m-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-base">
                        <CreditCard className="w-5 h-5" />
                        Payment Guide
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <p className="text-base">
                            Send{" "}
                            <strong className="text-primary text-lg">৳{coursePrice.toLocaleString()}</strong> to:
                        </p>
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 border-primary/30 dark:border-primary/40 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-base text-gray-800 dark:text-gray-200">
                                    bKash/Nagad:
                                </span>
                                <span className="font-mono bg-primary/20 dark:bg-primary/30 px-4 py-2 rounded-lg text-base font-bold text-primary border border-primary/30">
                                    01521428597
                                </span>
                            </div>
                        </div>
                        <p className="mt-3 pt-3 border-t border-primary/20 dark:border-primary/30 text-base">
                            After payment, knock us on WhatsApp:{" "}
                            <strong className="font-mono text-primary">01521428597</strong>
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="px-6 pb-6 pt-2 space-y-5"
                >
                    {/* Name Field - Full Width */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex items-center gap-2"
                        >
                            <User className="w-4 h-4 text-primary" />
                            Your Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-11 text-base px-4"
                        />
                    </div>

                    {/* Email and Phone - 2 Column Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-primary" />
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="h-11 text-base px-4"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-primary" />
                                Phone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="01XXXXXXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                pattern="^01[0-9]{9}$"
                                className="h-11 text-base px-4"
                            />
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            Payment Method{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        paymentMethod: "bkash",
                                    }))
                                }
                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center hover:scale-[1.02] ${
                                    formData.paymentMethod === "bkash"
                                        ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30 shadow-md shadow-pink-500/20"
                                        : "border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-400 bg-white dark:bg-gray-700"
                                }`}
                            >
                                <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                                    bKash
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        paymentMethod: "nagad",
                                    }))
                                }
                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center hover:scale-[1.02] ${
                                    formData.paymentMethod === "nagad"
                                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md shadow-orange-500/20"
                                        : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700"
                                }`}
                            >
                                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                    Nagad
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Transaction ID and Last 4 Digits - 2 Column Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Transaction ID Field */}
                        <div className="space-y-1">
                            <Label
                                htmlFor="transactionId"
                                className="text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center gap-1"
                            >
                                <Hash className="w-3 h-3 text-primary" />
                                Transaction ID{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="transactionId"
                                name="transactionId"
                                type="text"
                                placeholder="e.g. 9A1B2C3D4E"
                                value={formData.transactionId}
                                onChange={handleChange}
                                required
                                className="h-8 text-sm font-mono"
                            />
                        </div>

                        {/* Payment Number Last 4 Digits Field */}
                        <div className="space-y-1">
                            <Label
                                htmlFor="paymentNumberLastDigits"
                                className="text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center gap-1"
                            >
                                <Phone className="w-3 h-3 text-primary" />
                                Last 4 Digits{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="paymentNumberLastDigits"
                                name="paymentNumberLastDigits"
                                type="text"
                                placeholder="1234"
                                value={formData.paymentNumberLastDigits}
                                onChange={handleChange}
                                required
                                pattern="^[0-9]{4}$"
                                maxLength={4}
                                className="h-8 text-sm font-mono"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                        Enter the last 4 digits of the number you used for
                        payment
                    </p>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 text-base font-semibold hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit Enrollment"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
