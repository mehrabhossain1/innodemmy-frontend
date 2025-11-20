"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Shield } from "lucide-react";
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
                                        href="https://www.youtube.com/channel/UC2sX_PtHHB4VJSauxtC8xbg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 bg-[#FF0000]/10 hover:bg-[#FF0000] border border-[#FF0000]/30 hover:border-[#FF0000] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="YouTube"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#FF0000] group-hover:text-white transition-colors"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/innodemy360/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/30 hover:border-[#1877F2] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="Facebook"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/inno_demy360/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 bg-gradient-to-br from-[#833AB4]/10 via-[#E1306C]/10 to-[#F77737]/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] border border-[#E1306C]/30 hover:border-[#E1306C] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#E1306C] group-hover:text-white transition-colors"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/innodemy360/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 bg-[#0A66C2]/10 hover:bg-[#0A66C2] border border-[#0A66C2]/30 hover:border-[#0A66C2] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#0A66C2] group-hover:text-white transition-colors"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
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
