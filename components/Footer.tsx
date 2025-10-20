"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-muted to-accent text-foreground py-12 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Logo Section */}
                <div className="lg:col-span-1">
                    <div className="mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Innodemy
                        </span>
                    </div>
                    <div className="mb-6">
                        <span className="text-sm text-muted-foreground leading-relaxed">
                            Empowering learners with world-class technology
                            education and career transformation.
                        </span>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/courses"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/career"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Career
                            </Link>
                        </li>
                    </ul>
                    {/* Subtle divider for large screens */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-border"></div>
                </div>

                {/* Company Section */}
                <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
                        Company
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/aboutus"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/privacy-policy"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/refund-policy"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Refund Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms-and-condition"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                            >
                                Terms and Condition
                            </Link>
                        </li>
                    </ul>
                    {/* Subtle divider for large screens */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-border"></div>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
                        Contact
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Contact@innodemy.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Panthapath, Dhaka - 1205, Bangladesh
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    +8801704258972
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    +880175260272
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="lg:col-span-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-6">
                        Trust & Security
                    </h3>

                    {/* Trust Badge */}
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                    Guaranteed
                                </p>
                                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                    Secure Payment
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400">
                            No hidden charges required.
                        </p>
                    </div>
                </div>

                {/* Payment Methods Section - Absolute Right Corner */}
                <div className="absolute right-4 top-1/2 transform translate-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2 text-right">
                        Payment Methods
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-end">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
                            bKash
                        </div>
                        <div className="bg-blue-800 text-white px-3 py-1 rounded-lg text-xs font-medium">
                            Visa
                        </div>
                        <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
                            Mastercard
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-12 pt-8 border-t border-border">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        © 2025 All Rights Reserved to Innodemy
                    </p>
                </div>
            </div>
        </footer>
    );
}
