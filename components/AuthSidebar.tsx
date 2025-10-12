"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface AuthSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthSidebar({ isOpen, onClose }: AuthSidebarProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        // Login logic will be implemented here
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your register logic here
        // Register logic will be implemented here
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9C15 9.55 14.95 10.05 14.85 10.5C14.85 10.5 14.85 10.5 14.85 10.5L21 11V9ZM3 9V11L9.15 10.5C9.05 10.05 9 9.55 9 9V6.5L3 7V9ZM12 8C8.13 8 5 11.13 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 11.13 15.87 8 12 8Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">
                                {activeTab === "login" ? "লগইন করুন" : "নতুন অ্যাকাউন্ট"}
                            </h2>
                            <p className="text-sm text-muted-foreground">Innodemy এ স্বাগতম</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-foreground" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-4 text-center font-semibold transition-colors ${
                            activeTab === "login"
                                ? "text-primary border-b-2 border-primary bg-accent/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        }`}
                    >
                        লগইন
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`flex-1 py-4 text-center font-semibold transition-colors ${
                            activeTab === "register"
                                ? "text-primary border-b-2 border-primary bg-accent/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        }`}
                    >
                        নতুন একাউন্ট
                    </button>
                </div>

                {/* Welcome Image Section */}
                <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15.5V15.5H12V17H17V12ZM6.5 7H9V8.5H6.5V7ZM6.5 9.5H9V11H6.5V9.5ZM6.5 12H9V13.5H6.5V12Z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">শেখা শুরু করুন</h3>
                            <p className="text-sm text-muted-foreground">বিশেষজ্ঞদের সাথে আপনার দক্ষতা বৃদ্ধি করুন</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-220px)]">
                    {activeTab === "login" ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="login-email" className="text-foreground">
                                    ইমেইল বা ফোন নম্বর
                                </Label>
                                <Input
                                    id="login-email"
                                    type="text"
                                    placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, email: e.target.value })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="login-password" className="text-foreground">
                                    পাসওয়ার্ড
                                </Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, password: e.target.value })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                            >
                                প্রবেশ করুন →
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <Link
                                    href="/forgot-password"
                                    className="text-primary hover:underline"
                                    onClick={onClose}
                                >
                                    পাসওয়ার্ড ভুলে গেছেন?
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("register")}
                                    className="text-primary hover:underline"
                                >
                                    নতুন একাউন্ট তৈরি করুন
                                </button>
                            </div>

                            <div className="pt-6 border-t border-border">
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <div className="flex-1 h-px bg-border"></div>
                                    <span className="text-sm text-muted-foreground px-3">অথবা</span>
                                    <div className="flex-1 h-px bg-border"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 hover:bg-red-50 dark:hover:bg-red-950"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 hover:bg-blue-50 dark:hover:bg-blue-950"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                            />
                                        </svg>
                                        Facebook
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="register-name" className="text-foreground">
                                    পূর্ণ নাম
                                </Label>
                                <Input
                                    id="register-name"
                                    type="text"
                                    placeholder="আপনার পূর্ণ নাম লিখুন"
                                    value={registerData.name}
                                    onChange={(e) =>
                                        setRegisterData({ ...registerData, name: e.target.value })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-email" className="text-foreground">
                                    ইমেইল বা ফোন নম্বর
                                </Label>
                                <Input
                                    id="register-email"
                                    type="text"
                                    placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন"
                                    value={registerData.email}
                                    onChange={(e) =>
                                        setRegisterData({ ...registerData, email: e.target.value })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-password" className="text-foreground">
                                    পাসওয়ার্ড
                                </Label>
                                <Input
                                    id="register-password"
                                    type="password"
                                    placeholder="একটি শক্তিশালী পাসওয়ার্ড লিখুন"
                                    value={registerData.password}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password" className="text-foreground">
                                    পাসওয়ার্ড নিশ্চিত করুন
                                </Label>
                                <Input
                                    id="register-confirm-password"
                                    type="password"
                                    placeholder="পাসওয়ার্ড আবার লিখুন"
                                    value={registerData.confirmPassword}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="h-12"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                            >
                                একাউন্ট তৈরি করুন →
                            </Button>

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">
                                    ইতিমধ্যে একাউন্ট আছে?{" "}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("login")}
                                    className="text-primary hover:underline font-semibold"
                                >
                                    লগইন করুন
                                </button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center">
                                একাউন্ট তৈরি করে আপনি আমাদের{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    শর্তাবলী
                                </Link>{" "}
                                এবং{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    গোপনীয়তা নীতি
                                </Link>{" "}
                                সম্মত হচ্ছেন।
                            </p>
                        </form>
                    )}
                </div>

                {/* Footer Note */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-border">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9C15 9.55 14.95 10.05 14.85 10.5C14.85 10.5 14.85 10.5 14.85 10.5L21 11V9ZM3 9V11L9.15 10.5C9.05 10.05 9 9.55 9 9V6.5L3 7V9ZM12 8C8.13 8 5 11.13 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 11.13 15.87 8 12 8Z"/>
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-foreground">Innodemy</span>
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                        সাহায্যের প্রয়োজন? যোগাযোগ করুন:{" "}
                        <a href="tel:+8801704258972" className="text-primary hover:underline font-medium">
                            +880 1704 258972
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

