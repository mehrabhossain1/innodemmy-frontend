"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";

import logo from "@/assets/Logo.png";
import Link from "next/link";

export default function DashboardHeader() {
    const { user } = useAuth();

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

    return (
        <header className=" bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-6">
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
                    <h1 className="text-xl font-semibold text-gray-900">
                        Welcome back, {user?.name || "Guest"}!
                    </h1>
                </div>

                {/* Right: User Profile */}
                <div className="flex justify-end">
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {user?.name || "Guest User"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email || "guest@example.com"}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {getUserInitials()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
