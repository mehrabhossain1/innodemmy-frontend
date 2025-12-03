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
import Container from "./Container";
import Link from "next/link";

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
        icon: GraduationCap,
    },
    {
        id: "comprehensive",
        title: "Comprehensive Career Guidance",
        content:
            "Each course is strategically designed to provide learners with comprehensive guidance, from skill acquisition to career preparation, scholarships, and higher education.",
        icon: Target,
    },
    {
        id: "beyond-teaching",
        title: "Beyond Teaching - Complete Support",
        content:
            "Innodemy goes beyond teaching — supporting learners throughout their career journey with expert guidance, real-world experience, and practical problem-solving.",
        icon: Lightbulb,
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
            <section className="relative py-8 md:py-10 lg:py-8 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

                <Container>
                    <div className="relative group max-w-2xl mx-auto">
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                        <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl lg:rounded-2xl overflow-hidden">
                            <CardContent className="p-5 md:p-6 lg:p-7">
                                <div className="text-center space-y-3 lg:space-y-4">
                                    {/* Success Icon */}
                                    <div className="relative inline-block">
                                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                            <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                                        </div>
                                        {/* Icon Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-md opacity-50"></div>
                                    </div>

                                    {/* Success Message */}
                                    <div className="space-y-1.5 lg:space-y-2">
                                        <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-foreground">
                                            Thank You!
                                        </h3>
                                        <p className="text-sm lg:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                                            Your consultation request has been
                                            submitted successfully. Our team
                                            will contact you within 24 hours to
                                            schedule your free consultation.
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 px-5 lg:px-6 py-3 lg:py-4 h-auto text-sm lg:text-base font-semibold rounded-lg lg:rounded-xl"
                                    >
                                        Book Another Consultation
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="relative py-8 md:py-10 lg:py-8 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            <Container className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-6 md:mb-7 lg:mb-6">
                    <div className="inline-block mb-2 lg:mb-2">
                        <span className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20">
                            📞 Free Consultation
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-2 lg:mb-2">
                        <span className="text-foreground">Get Your Free</span>{" "}
                        <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                            Consultation
                        </span>
                    </h2>
                    <p className="text-sm md:text-base lg:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Take the first step towards your dream career. Our
                        expert counselors are ready to guide you.
                    </p>
                </div>

                {/* Main Content */}
                <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                    <div className="relative bg-card/50 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border-2 border-border">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Left Side - Accordion */}
                            <div className="space-y-4 lg:space-y-4 p-4 md:p-5 lg:p-6">
                                <div className="space-y-2 lg:space-y-3">
                                    <h3 className="text-lg lg:text-xl font-bold text-foreground">
                                        What Sets Us Apart
                                    </h3>

                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="space-y-2 lg:space-y-2"
                                    >
                                        {accordionItems.map((item) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <AccordionItem
                                                    key={item.id}
                                                    value={item.id}
                                                    className="border-2 border-border rounded-lg lg:rounded-xl px-2.5 lg:px-3 data-[state=open]:border-primary/50 bg-card backdrop-blur-sm transition-all duration-300"
                                                >
                                                    <AccordionTrigger className="hover:no-underline py-2.5 lg:py-2.5">
                                                        <div className="flex items-center space-x-2 lg:space-x-2.5 text-left">
                                                            <div className="flex-shrink-0 p-1.5 lg:p-1.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md lg:rounded-lg">
                                                                <IconComponent className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" />
                                                            </div>
                                                            <span className="font-semibold text-foreground text-xs lg:text-sm">
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pb-2.5 lg:pb-3 pt-1 lg:pt-1">
                                                        <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed ml-7 lg:ml-8">
                                                            {item.content}
                                                        </p>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        })}
                                    </Accordion>
                                </div>

                                {/* Call to Action */}
                                <div className="relative group/cta">
                                    {/* CTA Glow */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/70 rounded-lg lg:rounded-xl opacity-0 group-hover/cta:opacity-20 blur transition-all duration-300"></div>

                                    <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg lg:rounded-xl p-3 lg:p-4 border-2 border-primary/30 backdrop-blur-sm">
                                        <h4 className="text-sm lg:text-base font-bold text-foreground mb-1 lg:mb-1.5">
                                            Ready to Start Your Journey?
                                        </h4>
                                        <p className="text-muted-foreground mb-2.5 lg:mb-3 text-xs lg:text-sm leading-relaxed">
                                            Join thousands of learners who have
                                            transformed their careers with
                                            Innodemy.
                                        </p>
                                        <Link href="/courses">
                                            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0 shadow-lg shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 font-semibold text-sm lg:text-base py-3 lg:py-3.5 h-auto rounded-lg">
                                                Explore Courses
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="p-4 md:p-5 lg:p-6 border-l-0 lg:border-l-2 border-t-2 lg:border-t-0 border-border flex items-center justify-center bg-muted/30">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3 lg:space-y-3 w-full max-w-md"
                                >
                                    <div className="text-center mb-3 lg:mb-3">
                                        <h3 className="text-lg md:text-xl lg:text-xl font-bold text-foreground mb-1 lg:mb-1.5">
                                            Book Your Call Now!
                                        </h3>
                                        <p className="text-xs lg:text-sm text-muted-foreground">
                                            Fill out the form below to schedule
                                            your free consultation
                                        </p>
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-1 lg:space-y-1.5">
                                        <Label
                                            htmlFor="fullName"
                                            className="text-xs lg:text-sm font-medium text-foreground"
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
                                            className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm lg:text-base ${
                                                errors.fullName
                                                    ? "border-red-500 focus:border-red-500"
                                                    : ""
                                            }`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-xs text-red-500">
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1 lg:space-y-1.5">
                                        <Label
                                            htmlFor="email"
                                            className="text-xs lg:text-sm font-medium text-foreground"
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
                                            className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm lg:text-base ${
                                                errors.email
                                                    ? "border-red-500 focus:border-red-500"
                                                    : ""
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-1 lg:space-y-1.5">
                                        <Label
                                            htmlFor="phoneNumber"
                                            className="text-xs lg:text-sm font-medium text-foreground"
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
                                            className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm lg:text-base ${
                                                errors.phoneNumber
                                                    ? "border-red-500 focus:border-red-500"
                                                    : ""
                                            }`}
                                        />
                                        {errors.phoneNumber && (
                                            <p className="text-xs text-red-500">
                                                {errors.phoneNumber}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1 lg:space-y-1.5">
                                        <Label
                                            htmlFor="message"
                                            className="text-xs lg:text-sm font-medium text-foreground"
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
                                            rows={2}
                                            className="resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm lg:text-base"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white py-3 lg:py-3.5 h-auto text-sm lg:text-base font-semibold shadow-lg shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 rounded-lg lg:rounded-xl border-0"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Scheduling...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                                                <span>
                                                    Schedule Free Consultation
                                                </span>
                                            </div>
                                        )}
                                    </Button>

                                    {/* Privacy Note */}
                                    <p className="text-[10px] lg:text-xs text-muted-foreground text-center leading-relaxed">
                                        By submitting this form, you agree to
                                        our{" "}
                                        <a
                                            href="#"
                                            className="text-primary hover:text-primary/80 hover:underline transition-colors"
                                        >
                                            Privacy Policy
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-primary hover:text-primary/80 hover:underline transition-colors"
                                        >
                                            Terms of Service
                                        </a>
                                        .
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
            </Container>
        </section>
    );
}
