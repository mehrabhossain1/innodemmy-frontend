"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { User, BookOpen, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

import logo from "@/assets/Logo.png";

export default function DashboardHeader() {
    const { user } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get user initials for profile placeholder
    const getUserInitials = () => {
        if (!user?.name) return "U";
        return user.name
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <header className="bg-background sticky top-0 z-50 shadow-sm border-b border-border px-6 py-4 mb-6">
            <div className="container mx-auto grid grid-cols-3 items-center">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="InnoDemmy Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Middle: Welcome Message */}
                <div className="flex justify-center">
                    <h1 className="text-xl font-semibold text-foreground">
                        Welcome back, {user?.name || "Guest"}!
                    </h1>
                </div>

                {/* Right: User Profile */}
                <div className="flex justify-end relative" ref={dropdownRef}>
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                        >
                            {getUserInitials()}
                        </button>
                    </div>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black bg-opacity-25 z-40"
                                onClick={() => setIsProfileOpen(false)}
                            ></div>

                            {/* Sliding Panel */}
                            <div
                                className={`fixed right-0 top-0 h-full w-80 bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                                    isProfileOpen
                                        ? "translate-x-0"
                                        : "translate-x-full"
                                }`}
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-border">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Profile
                                        </h2>
                                        <button
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* User Info Section */}
                                <div className="p-4 border-b border-border">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                                            {getUserInitials()}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground">
                                                {user?.name ||
                                                    "Mehrab Hossan Munna"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {user?.email ||
                                                    "mehrab.munna@gmail.com"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Items */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="py-2">
                                        <Link
                                            href="/dashboard/profile"
                                            className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent transition-colors"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                        >
                                            <User className="w-5 h-5" />
                                            <span>Profile</span>
                                        </Link>

                                        <Link
                                            href="/dashboard/courses"
                                            className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent transition-colors"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            <span>My Courses</span>
                                        </Link>
                                        <Link
                                            href="/dashboard/courses"
                                            className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent transition-colors"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            <span>My Cart</span>
                                        </Link>
                                        <Link
                                            href="/dashboard/courses"
                                            className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent transition-colors"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            <span>Teach to Innodemmy</span>
                                        </Link>

                                        <div className="border-t border-border mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-3 w-full px-4 py-3 text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span>Log out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
