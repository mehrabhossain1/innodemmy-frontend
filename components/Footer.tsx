"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    MapPin,
    Phone,
    Shield,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
} from "lucide-react";
import logo from "@/assets/Logo.png";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800 border-t-2 border-gray-200 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)",
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Logo & About Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <Link href="/" className="inline-block group">
                                <div className="relative">
                                    <Image
                                        src={logo}
                                        alt="Innodemy"
                                        width={150}
                                        height={40}
                                        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Empowering learners with world-class technology
                                education and career transformation.
                            </p>

                            {/* Social Media Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                    Follow Us
                                </h4>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="#"
                                        className="w-9 h-9 bg-gray-100 hover:bg-primary/10 border border-gray-200 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Facebook className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-9 h-9 bg-gray-100 hover:bg-primary/10 border border-gray-200 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Twitter className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-9 h-9 bg-gray-100 hover:bg-primary/10 border border-gray-200 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-9 h-9 bg-gray-100 hover:bg-primary/10 border border-gray-200 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Instagram className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-9 h-9 bg-gray-100 hover:bg-primary/10 border border-gray-200 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <Youtube className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-6">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/courses"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/career"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Career
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-6">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/aboutus"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/refund-policy"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Refund Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms-and-condition"
                                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Terms and Condition
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-6">
                                Contact
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:Contact@innodemy.com"
                                            className="text-sm text-gray-700 hover:text-primary transition-colors"
                                        >
                                            Contact@innodemy.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                        <MapPin className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            Address
                                        </p>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Panthapath, Dhaka - 1205,
                                            <br />
                                            Bangladesh
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                        <Phone className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+8801704258972"
                                            className="text-sm text-gray-700 hover:text-primary transition-colors block"
                                        >
                                            +880 1704 258972
                                        </a>
                                        <a
                                            href="tel:+880175260272"
                                            className="text-sm text-gray-700 hover:text-primary transition-colors block"
                                        >
                                            +880 1752 60272
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Payment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-gray-200">
                        {/* Trust Badge */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                            <div className="relative bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-5 border-2 border-emerald-500/30">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Guaranteed Secure Payment
                                        </p>
                                        <p className="text-xs text-emerald-600">
                                            No hidden charges required
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 mb-4">
                                Payment Methods
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
                                    bKash
                                </div>
                                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
                                    Visa
                                </div>
                                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
                                    Mastercard
                                </div>
                                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
                                    Nagad
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-200 mt-12">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <p className="text-sm text-gray-600 text-center">
                                © 2025 All Rights Reserved to{" "}
                                <span className="text-primary font-semibold">
                                    Innodemy
                                </span>
                            </p>
                            <div className="flex items-center justify-center gap-6">
                                <Link
                                    href="/privacy-policy"
                                    className="text-xs text-gray-600 hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms-and-condition"
                                    className="text-xs text-gray-600 hover:text-primary transition-colors"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/refund-policy"
                                    className="text-xs text-gray-600 hover:text-primary transition-colors"
                                >
                                    Refund Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
