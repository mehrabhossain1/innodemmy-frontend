"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold text-blue-600">
                                LMS
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 mx-6">
                        <div className="relative w-full max-w-md">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                        >
                            Live Courses
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                                >
                                    More
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href="/blogs" className="w-full">
                                        Blogs
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/career" className="w-full">
                                        Career
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/about" className="w-full">
                                        About Us
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {user ? (
                            // Show user info and actions for logged-in users
                            <div className="flex items-center space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                                        >
                                            <User size={18} />
                                            <span className="text-sm">
                                                {user.name} ({user.role})
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Link
                                                href={
                                                    user.role === "admin"
                                                        ? "/admin/dashboard"
                                                        : "/dashboard"
                                                }
                                                className="w-full"
                                            >
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logout}>
                                            <LogOut
                                                size={16}
                                                className="mr-2"
                                            />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            // Show login button for non-logged-in users
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <div className="relative mb-3">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 w-full"
                            />
                        </div>
                        <Link
                            href="/"
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/live-courses"
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Live Courses
                        </Link>
                        <Link
                            href="/blogs"
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/career"
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Career
                        </Link>
                        <Link
                            href="/about"
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>

                        {user ? (
                            // Show user info and actions for logged-in users
                            <div className="border-t pt-3 mt-3 space-y-2">
                                <div className="px-3 py-2 text-sm text-gray-600">
                                    Logged in as:{" "}
                                    <span className="font-semibold">
                                        {user.name}
                                    </span>
                                </div>
                                <div className="px-3 py-1 text-xs text-gray-500 uppercase">
                                    Role: {user.role}
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Link
                                        href={
                                            user.role === "admin"
                                                ? "/admin/dashboard"
                                                : "/dashboard"
                                        }
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            // Show login button for non-logged-in users
                            <Button
                                asChild
                                variant="outline"
                                className="w-full mt-2"
                            >
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
