"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CreditCard, Phone, User, Hash, CheckCircle2, Mail } from "lucide-react";

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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        transactionId: "",
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
            paymentMethod: "bkash",
        });
        onClose();
    };

    if (!isOpen) return null;

    // Success Modal
    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Enrollment Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                        আপনার এনরোলমেন্ট সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই আপনার পেমেন্ট যাচাই করে আপনার সাথে যোগাযোগ করব।
                    </p>
                    <Button
                        onClick={handleSuccessClose}
                        className="bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-primary p-3 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-white">
                            Enroll in Course
                        </h2>
                        <p className="text-white/90 text-xs">{courseTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full w-7 h-7 flex items-center justify-center transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Payment Instructions */}
                <div className="bg-primary/5 border-l-4 border-primary p-2 m-3 rounded">
                    <h3 className="font-bold text-primary mb-1 flex items-center gap-1 text-xs">
                        <CreditCard className="w-3 h-3" />
                        Payment Guide
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                        <p>
                            Send <strong>৳{coursePrice.toLocaleString()}</strong> to:
                        </p>
                        <div className="bg-white rounded p-1.5 border border-primary/20">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs">bKash/Nagad:</span>
                                <span className="font-mono bg-primary/10 px-2 py-0.5 rounded text-xs">
                                    01521428597
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-3 space-y-3">
                    {/* Name Field */}
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-gray-700 text-xs font-medium flex items-center gap-1">
                            <User className="w-3 h-3 text-primary" />
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
                            className="h-9 text-sm"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-gray-700 text-xs font-medium flex items-center gap-1">
                            <Mail className="w-3 h-3 text-primary" />
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
                            className="h-9 text-sm"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-1">
                        <Label htmlFor="phone" className="text-gray-700 text-xs font-medium flex items-center gap-1">
                            <Phone className="w-3 h-3 text-primary" />
                            Phone Number <span className="text-red-500">*</span>
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
                            className="h-9 text-sm"
                        />
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-1">
                        <Label className="text-gray-700 text-xs font-medium flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-primary" />
                            Payment Method <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, paymentMethod: "bkash" }))
                                }
                                className={`p-2 rounded border-2 transition text-center ${
                                    formData.paymentMethod === "bkash"
                                        ? "border-pink-500 bg-pink-50"
                                        : "border-gray-200 hover:border-pink-300"
                                }`}
                            >
                                <div className="text-base font-bold text-pink-600">bKash</div>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, paymentMethod: "nagad" }))
                                }
                                className={`p-2 rounded border-2 transition text-center ${
                                    formData.paymentMethod === "nagad"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200 hover:border-orange-300"
                                }`}
                            >
                                <div className="text-base font-bold text-orange-600">Nagad</div>
                            </button>
                        </div>
                    </div>

                    {/* Transaction ID Field */}
                    <div className="space-y-1">
                        <Label htmlFor="transactionId" className="text-gray-700 text-xs font-medium flex items-center gap-1">
                            <Hash className="w-3 h-3 text-primary" />
                            Transaction ID <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="transactionId"
                            name="transactionId"
                            type="text"
                            placeholder="e.g. 9A1B2C3D4E"
                            value={formData.transactionId}
                            onChange={handleChange}
                            required
                            className="h-9 text-sm font-mono"
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-2 py-1.5 rounded text-xs">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-2 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-9 text-xs hover:bg-secondary hover:text-white hover:border-secondary"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold h-9 text-xs"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
