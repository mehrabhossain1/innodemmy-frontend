"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo Section */}
                <div>
                    <div className="mb-4">
                        <span className="text-xl font-bold text-blue-600">
                            Logo
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="text-sm text-gray-600">Tagline</span>
                    </div>
                    <div className="flex space-x-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-blue-600">🌐</span>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-pink-600">📸</span>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-red-600">🎥</span>
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-black">🎵</span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-blue-800">💼</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/courses"
                                className="text-blue-600 hover:underline"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className="text-blue-600 hover:underline"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/career"
                                className="text-blue-600 hover:underline"
                            >
                                Career
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/aboutus"
                                className="text-blue-600 hover:underline"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/refund"
                                className="text-blue-600 hover:underline"
                            >
                                Refund Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms"
                                className="text-blue-600 hover:underline"
                            >
                                Terms and Condition
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
                    <p className="mb-2">Email: contact@aiquest.org</p>
                    <p className="mb-2">
                        Address: Panthapath, Dhaka - 1205, Bangladesh
                    </p>
                    <p>Cell: +8801704258972; +880175260272</p>
                </div>

                {/* Secure Payment Section */}
                <div>
                    <div className="mb-4 bg-green-100 p-2 inline-block">
                        <span className="text-green-700 font-semibold">
                            GUARANTEED
                        </span>
                        <br />
                        <span className="text-green-700">SECURE PAYMENT</span>
                        <br />
                        <span className="text-sm text-green-700">
                            No hidden charges required.
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        <span className="text-blue-600">bKash</span>
                        <span className="text-blue-600">Visa</span>
                        <span className="text-blue-600">Mastercard</span>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 text-center border-t border-gray-300 pt-4">
                <p className="text-sm">
                    © 2025 All Rights Reserved to Innodemy
                </p>
            </div>
        </footer>
    );
}
