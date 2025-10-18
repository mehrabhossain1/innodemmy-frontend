"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    CheckCircle,
    Calendar,
    GraduationCap,
    Target,
    Lightbulb,
} from "lucide-react";

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
}

const accordionItems = [
    {
        id: "gateway",
        title: "Gateway to Advanced Opportunities",
        content:
            "Innodemy is more than a skill development platform — it's a gateway to advanced research opportunities and career transitions for students and professionals.",
        icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
    },
    {
        id: "comprehensive",
        title: "Comprehensive Career Guidance",
        content:
            "Each course is strategically designed to provide learners with comprehensive guidance, from skill acquisition to career preparation, scholarships, and higher education.",
        icon: <Target className="w-5 h-5 text-blue-600" />,
    },
    {
        id: "beyond-teaching",
        title: "Beyond Teaching - Complete Support",
        content:
            "Innodemy goes beyond teaching — supporting learners throughout their career journey with expert guidance, real-world experience, and practical problem-solving.",
        icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
    },
];

export default function BookTheCallCard() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Phone number validation
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (
            !phoneRegex.test(formData.phoneNumber.replace(/[\s\-$$$$]/g, ""))
        ) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            // Reset form after successful submission
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                message: "",
            });
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            Thank You!
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Your consultation request has been submitted
                            successfully. Our team will contact you within 24
                            hours to schedule your free consultation.
                        </p>
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                            className="mt-4"
                        >
                            Book Another Consultation
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full container mx-auto border shadow-lg mt-20 rounded-2xl">
            <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Side - Accordion */}
                    <div className="space-y-4 p-6">
                        <div className="rounded-xl p-6 border">
                            <h3 className="text-xl font-bold text-foreground mb-4">
                                What Sets Us Apart
                            </h3>

                            <Accordion
                                type="single"
                                collapsible
                                className="space-y-3"
                            >
                                {accordionItems.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        value={item.id}
                                        className="border rounded-xl px-4 data-[state=open]:border-primary"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-3">
                                            <div className="flex items-center space-x-3 text-left">
                                                <div className="flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <span className="font-semibold text-foreground text-sm">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-3 pt-1">
                                            <p className="text-muted-foreground text-sm leading-relaxed ml-8">
                                                {item.content}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-primary rounded-xl p-6 text-primary-foreground shadow">
                            <h4 className="text-lg font-bold mb-1">
                                Ready to Start Your Journey?
                            </h4>
                            <p className="text-primary-foreground/80 mb-3 text-sm">
                                Join thousands of learners who have transformed
                                their careers with Innodemy.
                            </p>
                            <Button className="bg-background text-foreground hover:bg-background/90 shadow-sm">
                                Explore Courses
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="p-6 border-l rounded-r-2xl flex items-center justify-center">
                        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                            <div className="text-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    Get Your Free Consultation Today!
                                </h3>
                                <p className="text-xs text-gray-600">
                                    Fill out the form below to schedule your
                                    free consultation
                                </p>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-1">
                                <Label
                                    htmlFor="fullName"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Full Name *
                                </Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fullName",
                                            e.target.value
                                        )
                                    }
                                    className={`${
                                        errors.fullName
                                            ? "border-red-500 focus:border-red-500"
                                            : ""
                                    }`}
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-red-600">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email Address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className={`${
                                        errors.email
                                            ? "border-red-500 focus:border-red-500"
                                            : ""
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <Label
                                    htmlFor="phoneNumber"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Phone Number *
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={formData.phoneNumber}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "phoneNumber",
                                            e.target.value
                                        )
                                    }
                                    className={`${
                                        errors.phoneNumber
                                            ? "border-red-500 focus:border-red-500"
                                            : ""
                                    }`}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-xs text-red-600">
                                        {errors.phoneNumber}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-1">
                                <Label
                                    htmlFor="message"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Write your message (optional)
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your career goals, interests, or any specific questions..."
                                    value={formData.message}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "message",
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 h-auto text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 ease-out"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Scheduling...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Schedule Now</span>
                                    </div>
                                )}
                            </Button>

                            {/* Privacy Note */}
                            <p className="text-xs text-gray-500 text-center">
                                By submitting this form, you agree to our{" "}
                                <a
                                    href="#"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Terms of Service
                                </a>
                                .
                            </p>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
