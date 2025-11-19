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
import {
    Search,
    Menu,
    X,
    LogOut,
    ChevronDown,
    Code,
    Cpu,
    TrendingUp,
    Palette,
    GraduationCap,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthSidebar from "@/components/AuthSidebar";

import logo from "@/assets/Logo.png";

const courseCategories = [
    {
        id: "web",
        name: "Web Development",
        icon: Code,
        count: "12 Courses",
        color: "text-blue-500",
    },
    {
        id: "data",
        name: "Data Science",
        icon: Cpu,
        count: "8 Courses",
        color: "text-purple-500",
    },
    {
        id: "business",
        name: "Business & Marketing",
        icon: TrendingUp,
        count: "6 Courses",
        color: "text-orange-500",
    },
    {
        id: "design",
        name: "Product & Design",
        icon: Palette,
        count: "4 Courses",
        color: "text-pink-500",
    },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthSidebarOpen, setIsAuthSidebarOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white dark:bg-background shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={logo}
                                alt="InnoDemmy Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {/* Courses Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsCoursesOpen(true)}
                            onMouseLeave={() => setIsCoursesOpen(false)}
                        >
                            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-accent">
                                All Courses
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        isCoursesOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Mega Menu Dropdown */}
                            {isCoursesOpen && (
                                <div className="absolute left-0 top-full mt-1 w-[800px] bg-white dark:bg-card rounded-lg shadow-xl border border-gray-200 dark:border-border p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Left: Categories */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-4 px-2">
                                                Course Categories
                                            </h3>
                                            <div className="space-y-1">
                                                {courseCategories.map(
                                                    (category) => (
                                                        <Link
                                                            key={category.id}
                                                            href={`/courses?category=${category.id}`}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-accent transition-colors group"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <div className="w-10 h-10 bg-gray-100 dark:bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                                    <category.icon
                                                                        className={`h-5 w-5 ${category.color}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-muted-foreground">
                                                                    {
                                                                        category.count
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Right: Featured/Popular */}
                                        <div className="border-l border-gray-200 dark:border-border pl-6">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-foreground mb-4">
                                                Featured Courses
                                            </h3>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/courses"
                                                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-accent transition-colors group"
                                                >
                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors mb-1">
                                                        Full Stack Web
                                                        Development
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-muted-foreground">
                                                        JavaScript, React,
                                                        Node.js
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/courses"
                                                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-accent transition-colors group"
                                                >
                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors mb-1">
                                                        Data Science with Python
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-muted-foreground">
                                                        Python, Django, React
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/courses"
                                                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-accent transition-colors group"
                                                >
                                                    <div className="text-sm font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors mb-1">
                                                        App Development with
                                                        Flutter
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-muted-foreground">
                                                        Flutter, Dart, AI
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* View All Button */}
                                            <Link
                                                href="/courses"
                                                className="mt-4 block w-full"
                                            >
                                                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
                                                    View All Courses
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/webinar"
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-accent"
                        >
                            Free Webinar
                        </Link>
                        <Link
                            href="/blogs"
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-accent"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/aboutus"
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-foreground hover:text-primary transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-accent"
                        >
                            About Us
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {/* Search Bar */}
                        <div className="relative w-64">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 h-9 bg-gray-50 dark:bg-muted border-gray-200 dark:border-border focus:border-primary"
                            />
                        </div>

                        <ThemeToggle />

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center space-x-2 text-gray-700 dark:text-foreground hover:text-primary"
                                    >
                                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium">
                                            {user.name}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                        Role:{" "}
                                        <span className="font-medium text-foreground">
                                            {user.role}
                                        </span>
                                    </div>
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
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="text-red-600"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsAuthSidebarOpen(true)}
                                    className="text-gray-700 dark:text-foreground hover:text-primary"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => setIsAuthSidebarOpen(true)}
                                    className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
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
                <div className="lg:hidden bg-white dark:bg-background border-t border-gray-200 dark:border-border">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {/* Search */}
                        <div className="relative mb-3">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 w-full"
                            />
                        </div>

                        <div className="flex items-center justify-between mb-3 px-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Theme
                            </span>
                            <ThemeToggle />
                        </div>

                        <Link
                            href="/courses"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors hover:bg-gray-50 dark:hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            All Courses
                        </Link>
                        <Link
                            href="/webinar"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors hover:bg-gray-50 dark:hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Free Webinar
                        </Link>
                        <Link
                            href="/blogs"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors hover:bg-gray-50 dark:hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/aboutus"
                            className="block text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors hover:bg-gray-50 dark:hover:bg-accent rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>

                        {user ? (
                            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3 space-y-2">
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
                                    className="w-full text-red-600"
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
                            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsAuthSidebarOpen(true);
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsAuthSidebarOpen(true);
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </div>
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
