"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CreditCard, Phone, User, Hash, CheckCircle2 } from "lucide-react";

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
        phone: "",
        transactionId: "",
        paymentMethod: "bkash" as "bkash" | "nagad",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
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
                setSubmitStatus("success");
                // Reset form after 2 seconds and close modal
                setTimeout(() => {
                    setFormData({
                        name: "",
                        phone: "",
                        transactionId: "",
                        paymentMethod: "bkash",
                    });
                    setSubmitStatus("idle");
                    onClose();
                }, 2000);
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Failed to submit enrollment");
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            setSubmitStatus("error");
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

    if (!isOpen) return null;

    // Success State
    if (submitStatus === "success") {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Enrollment Submitted!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        আপনার এনরোলমেন্ট সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই আপনার পেমেন্ট যাচাই করে আপনার সাথে যোগাযোগ করব।
                    </p>
                    <p className="text-sm text-gray-500">
                        This modal will close automatically...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between border-b border-white/20">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            Enroll in Course
                        </h2>
                        <p className="text-white/90 text-sm">{courseTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-6 rounded-lg">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        পেমেন্ট গাইড
                    </h3>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>
                            <strong>১.</strong> নিচের যেকোনো নম্বরে{" "}
                            <strong>৳{coursePrice.toLocaleString()}</strong> টাকা পাঠান:
                        </p>
                        <div className="bg-white rounded-lg p-3 space-y-2 border border-blue-200">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">bKash (Personal):</span>
                                <span className="font-mono bg-blue-100 px-3 py-1 rounded">
                                    01704-258972
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Nagad (Personal):</span>
                                <span className="font-mono bg-blue-100 px-3 py-1 rounded">
                                    01704-258972
                                </span>
                            </div>
                        </div>
                        <p>
                            <strong>২.</strong> পেমেন্ট সম্পন্ন হওয়ার পর আপনার তথ্য এবং ট্রানজেকশন আইডি দিয়ে নিচের ফর্মটি পূরণ করুন।
                        </p>
                        <p>
                            <strong>৩.</strong> আমরা ২৪ ঘন্টার মধ্যে আপনার পেমেন্ট যাচাই করে কোর্সে এক্সেস দিয়ে দেব।
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-semibold flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            আপনার নাম <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="আপনার পুরো নাম লিখুন"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border-gray-300 focus:border-primary focus:ring-primary h-12"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-semibold flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            মোবাইল নম্বর <span className="text-red-500">*</span>
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
                            className="border-gray-300 focus:border-primary focus:ring-primary h-12"
                        />
                        <p className="text-xs text-gray-500">
                            উদাহরণ: 01712345678
                        </p>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            পেমেন্ট মেথড <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, paymentMethod: "bkash" }))
                                }
                                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                    formData.paymentMethod === "bkash"
                                        ? "border-pink-500 bg-pink-50"
                                        : "border-gray-200 hover:border-pink-300"
                                }`}
                            >
                                <div className="text-2xl font-bold text-pink-600">bKash</div>
                                <div className="text-xs text-gray-600">Personal Account</div>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, paymentMethod: "nagad" }))
                                }
                                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                    formData.paymentMethod === "nagad"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200 hover:border-orange-300"
                                }`}
                            >
                                <div className="text-2xl font-bold text-orange-600">Nagad</div>
                                <div className="text-xs text-gray-600">Personal Account</div>
                            </button>
                        </div>
                    </div>

                    {/* Transaction ID Field */}
                    <div className="space-y-2">
                        <Label htmlFor="transactionId" className="text-gray-700 font-semibold flex items-center gap-2">
                            <Hash className="w-4 h-4 text-primary" />
                            ট্রানজেকশন আইডি <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="transactionId"
                            name="transactionId"
                            type="text"
                            placeholder="যেমন: 9A1B2C3D4E"
                            value={formData.transactionId}
                            onChange={handleChange}
                            required
                            className="border-gray-300 focus:border-primary focus:ring-primary h-12 font-mono"
                        />
                        <p className="text-xs text-gray-500">
                            আপনার পেমেন্ট কনফার্মেশন মেসেজে যে ট্রানজেকশন আইডি রয়েছে তা লিখুন
                        </p>
                    </div>

                    {/* Error Message */}
                    {submitStatus === "error" && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold h-12 shadow-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
