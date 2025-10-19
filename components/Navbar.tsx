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
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthSidebar from "@/components/AuthSidebar";

import logo from "@/assets/Logo.png";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthSidebarOpen, setIsAuthSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="bg-background shadow-md sticky top-0 z-50 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src={logo}
                                alt="InnoDemmy Logo"
                                className="h-8 w-auto"
                            />
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
                            className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg hover:scale-105"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg hover:scale-105"
                        >
                            All Courses
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg hover:scale-105"
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
                                    <Link href="/aboutus" className="w-full">
                                        About Us
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/terms-and-condition" className="w-full">
                                        Terms & Conditions
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/refund-policy" className="w-full">
                                        Refund Policy
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/privacy-policy" className="w-full">
                                        Privacy Policy
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ThemeToggle />

                        {user ? (
                            // Show user info and actions for logged-in users
                            <div className="flex items-center space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-200 ease-out hover:bg-accent rounded-lg hover:scale-105"
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
                            <Button onClick={() => setIsAuthSidebarOpen(true)}>
                                Login
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
                <div className="md:hidden bg-background border-t border-border">
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
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Theme
                            </span>
                            <ThemeToggle />
                        </div>
                        <Link
                            href="/"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            All Courses
                        </Link>
                        <Link
                            href="/blogs"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/career"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Career
                        </Link>
                        <Link
                            href="/aboutus"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/terms-and-condition"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Terms & Conditions
                        </Link>
                        <Link
                            href="/refund-policy"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Refund Policy
                        </Link>
                        <Link
                            href="/privacy-policy"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-all duration-200 ease-out hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Privacy Policy
                        </Link>

                        {user ? (
                            // Show user info and actions for logged-in users
                            <div className="border-t border-border pt-3 mt-3 space-y-2">
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    Logged in as:{" "}
                                    <span className="font-semibold text-foreground">
                                        {user.name}
                                    </span>
                                </div>
                                <div className="px-3 py-1 text-xs text-muted-foreground uppercase">
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
                                variant="outline"
                                className="w-full mt-2"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsAuthSidebarOpen(true);
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Auth Sidebar */}
            <AuthSidebar
                isOpen={isAuthSidebarOpen}
                onClose={() => setIsAuthSidebarOpen(false)}
            />
        </nav>
    );
}
