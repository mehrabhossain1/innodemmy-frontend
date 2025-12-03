"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Shield } from "lucide-react";
import logo from "@/assets/Logo.png";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 border-t-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Logo & About Section */}
                        <div className="lg:col-span-1 space-y-4">
                            <Link href="/" className="inline-block group">
                                <div className="relative">
                                    <Image
                                        src={logo}
                                        alt="Innodemy"
                                        className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                A leading students training platform
                            </p>

                            {/* Social Media Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                                    Follow Us
                                </h4>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="https://www.youtube.com/channel/UC2sX_PtHHB4VJSauxtC8xbg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-[#FF0000]/10 hover:bg-[#FF0000] border border-[#FF0000]/30 hover:border-[#FF0000] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="YouTube"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-[#FF0000] group-hover:text-white transition-colors"
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
                                        className="w-8 h-8 bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/30 hover:border-[#1877F2] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="Facebook"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-[#1877F2] group-hover:text-white transition-colors"
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
                                        className="w-8 h-8 bg-gradient-to-br from-[#833AB4]/10 via-[#E1306C]/10 to-[#F77737]/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] border border-[#E1306C]/30 hover:border-[#E1306C] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-[#E1306C] group-hover:text-white transition-colors"
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
                                        className="w-8 h-8 bg-[#0A66C2]/10 hover:bg-[#0A66C2] border border-[#0A66C2]/30 hover:border-[#0A66C2] rounded-lg flex items-center justify-center transition-all duration-300 group"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-[#0A66C2] group-hover:text-white transition-colors"
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
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-white mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/courses"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/career"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Career
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-white mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/aboutus"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/refund-policy"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Refund Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms-and-condition"
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                        Terms and Condition
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-white mb-4">
                                Contact
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/30 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                                        <Mail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:Contact@innodemy.com"
                                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                                        >
                                            Contact@innodemy.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/30 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                                        <MapPin className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                                            Address
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Panthapath, Dhaka - 1205,
                                            <br />
                                            Bangladesh
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 group">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/30 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                                        <Phone className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+8801805208858"
                                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors block"
                                        >
                                            +880 1805 208858
                                        </a>
                                        <a
                                            href="tel:+8801805208859"
                                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors block"
                                        >
                                            +880 1805 208859
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Payment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        {/* Trust Badge */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                            <div className="relative bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 rounded-xl p-4 border-2 border-emerald-500/30 dark:border-emerald-500/40">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                                            Guaranteed Secure Payment
                                        </p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                            No hidden charges required
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                                We Accept
                            </h4>
                            <div className="flex flex-wrap items-center gap-2">
                                {/* bKash */}
                                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-md border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#E2136E] font-bold text-base">
                                            bKash
                                        </span>
                                    </div>
                                </div>
                                {/* Nagad */}
                                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-md border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#EE4023] font-bold text-base">
                                            Nagad
                                        </span>
                                    </div>
                                </div>
                                {/* Visa */}
                                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-md border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <svg
                                        className="h-5 w-auto"
                                        viewBox="0 0 48 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.8 14.5L21.9 1.5H25.3L23.2 14.5H19.8Z"
                                            fill="#00579F"
                                        />
                                        <path
                                            d="M35.6 1.8C34.9 1.6 33.8 1.3 32.5 1.3C29 1.3 26.5 3.2 26.5 5.8C26.5 7.7 28.2 8.7 29.5 9.3C30.9 9.9 31.3 10.3 31.3 10.8C31.3 11.6 30.3 12 29.4 12C28.1 12 27.4 11.8 26.3 11.3L25.9 11.1L25.4 14C26.2 14.4 27.7 14.7 29.3 14.7C33.1 14.7 35.5 12.9 35.5 10.1C35.5 8.6 34.4 7.5 32.2 6.6C31 6.1 30.3 5.7 30.3 5.2C30.3 4.7 30.9 4.2 32.1 4.2C33.1 4.2 33.9 4.4 34.5 4.6L34.8 4.7L35.6 1.8Z"
                                            fill="#00579F"
                                        />
                                        <path
                                            d="M40.8 9.8C41.1 9 42.1 6.4 42.1 6.4C42.1 6.4 42.3 5.8 42.4 5.5L42.6 6.5C42.6 6.5 43.2 9.3 43.3 9.8H40.8ZM44.7 1.5H42C41.3 1.5 40.7 1.7 40.4 2.4L35.5 14.5H39.3L40.1 12.5H44.7C44.8 13 45.2 14.5 45.2 14.5H48.5L45.6 1.5H44.7Z"
                                            fill="#00579F"
                                        />
                                        <path
                                            d="M16.8 1.5L13.2 10.5L12.8 8.5C12.1 6.3 10.1 3.9 7.9 2.7L10.9 14.5H14.8L20.7 1.5H16.8Z"
                                            fill="#00579F"
                                        />
                                        <path
                                            d="M9.4 1.5H3.5L3.4 1.8C7.7 2.8 10.7 5.5 12 8.5L10.7 2.4C10.5 1.7 9.9 1.5 9.4 1.5Z"
                                            fill="#FAA61A"
                                        />
                                    </svg>
                                </div>
                                {/* Mastercard */}
                                <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-md border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <svg
                                        className="h-5 w-auto"
                                        viewBox="0 0 48 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="18"
                                            cy="15"
                                            r="12"
                                            fill="#EB001B"
                                        />
                                        <circle
                                            cx="30"
                                            cy="15"
                                            r="12"
                                            fill="#F79E1B"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M24 22.5C26.4853 20.5357 28 17.4853 28 14C28 10.5147 26.4853 7.46429 24 5.5C21.5147 7.46429 20 10.5147 20 14C20 17.4853 21.5147 20.5357 24 22.5Z"
                                            fill="#FF5F00"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                © 2025 All Rights Reserved to{" "}
                                <span className="text-primary font-semibold">
                                    Innodemy
                                </span>
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link
                                    href="/privacy-policy"
                                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms-and-condition"
                                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/refund-policy"
                                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
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
