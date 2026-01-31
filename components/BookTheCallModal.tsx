"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle } from "lucide-react";

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export default function BookTheCallModal() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email";
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (!phoneRegex.test(formData.phoneNumber.replace(/[\s\-\\$]/g, ""))) newErrors.phoneNumber = "Please enter a valid phone number";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((p) => ({ ...p, [field]: value }));
        if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            // mimic API call
            await new Promise((r) => setTimeout(r, 1200));
            setIsSubmitted(true);
            setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
        } catch (err) {
            // ignore for now
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setIsSubmitted(false), 300);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-xs lg:text-sm font-semibold text-secondary bg-secondary/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-secondary/20 hover:bg-secondary/20 hover:scale-105 transition-all duration-200 cursor-pointer w-full">
                    📞 Free Consultation
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px]">
                {isSubmitted ? (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                        <DialogTitle className="text-2xl mb-2">Thank You!</DialogTitle>
                        <DialogDescription className="text-base">Your consultation request has been submitted successfully. Our team will contact you within 24 hours to schedule your free consultation.</DialogDescription>
                        <div className="mt-6">
                            <Button onClick={handleClose} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                Done
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Book Your Call Now!</DialogTitle>
                            <DialogDescription>Fill out the form below to schedule your free consultation</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label htmlFor="modalFullName">Full Name *</Label>
                            <Input id="modalFullName" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} placeholder="Enter your full name" />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modalEmail">Email Address *</Label>
                            <Input id="modalEmail" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="Enter your email address" />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modalPhone">Phone Number *</Label>
                            <Input id="modalPhone" value={formData.phoneNumber} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} placeholder="Enter your phone number" />
                            {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modalMessage">Write your message (optional)</Label>
                            <Textarea id="modalMessage" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} placeholder="Tell us about your career goals, interests, or any specific questions..." rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-white py-4 text-base font-bold shadow-2xl shadow-secondary/30 hover:shadow-3xl hover:shadow-secondary/40 transform-gpu hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 rounded-xl" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> <span>Scheduling...</span></div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2"><Calendar className="w-5 h-5"/> <span>Schedule Free Consultation</span></div>
                                )}
                            </Button>
                        </div>

                        <p className="text-[10px] lg:text-xs text-muted-foreground text-center">By submitting this form, you agree to our <a href="#" className="text-primary underline">Privacy Policy</a> and <a href="#" className="text-primary underline">Terms of Service</a>.</p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
