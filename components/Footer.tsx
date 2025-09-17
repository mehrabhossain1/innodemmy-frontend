"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Shield, Lock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-100 to-gray-200 text-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Logo Section */}
                <div className="lg:col-span-1">
                    <div className="mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Innodemy
                        </span>
                    </div>
                    <div className="mb-6">
                        <span className="text-sm text-gray-600 leading-relaxed">
                            Empowering learners with world-class technology education and career transformation.
                        </span>
                    </div>
                    <div className="flex space-x-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                        >
                            <span className="text-xl">🌐</span>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-pink-600 transition-colors duration-200"
                        >
                            <span className="text-xl">📸</span>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                        >
                            <span className="text-xl">🎥</span>
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-black transition-colors duration-200"
                        >
                            <span className="text-xl">🎵</span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-800 transition-colors duration-200"
                        >
                            <span className="text-xl">💼</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-6">Quick Links</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/courses"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/career"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                Career
                            </Link>
                        </li>
                    </ul>
                    {/* Subtle divider for large screens */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
                </div>

                {/* Company Section */}
                <div className="relative">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-6">Company</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/aboutus"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/refund"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                Refund Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms"
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm"
                            >
                                Terms and Condition
                            </Link>
                        </li>
                    </ul>
                    {/* Subtle divider for large screens */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-6">Contact</h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Mail className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-600">contact@aiquest.org</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Panthapath, Dhaka - 1205, Bangladesh
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Phone className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-600">+8801704258972</p>
                                <p className="text-sm text-gray-600">+880175260272</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="lg:col-span-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-6">Trust & Security</h3>
                    
                    {/* Trust Badge */}
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-800">Guaranteed</p>
                                <p className="text-sm font-semibold text-emerald-800">Secure Payment</p>
                            </div>
                        </div>
                        <p className="text-xs text-emerald-700">
                            No hidden charges required.
                        </p>
                    </div>
                </div>

                {/* Payment Methods Section - Absolute Right Corner */}
                <div className="absolute right-4 top-1/2 transform translate-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2 text-right">Payment Methods</h3>
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
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        © 2025 All Rights Reserved to Innodemy
                    </p>
                </div>
            </div>
        </footer>
    );
}
