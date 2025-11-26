"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Home,
    BookOpen,
    Users,
    Settings,
    LogOut,
    User,
    Menu,
    X,
    BarChart3,
    GraduationCap,
    FileText,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const studentNavItems = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
        { href: "/dashboard/profile", label: "Profile", icon: User },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const adminNavItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: Home },
        { href: "/admin/enrollments", label: "Enrollments", icon: GraduationCap },
        { href: "/admin/courses", label: "Courses", icon: BookOpen },
        { href: "/admin/blogs", label: "Blogs", icon: FileText },
    ];

    const navItems = user?.role === "admin" ? adminNavItems : studentNavItems;

    const isActive = (href: string) => {
        if (href === "/dashboard" && pathname === "/dashboard") return true;
        if (href === "/admin/dashboard" && pathname === "/admin/dashboard")
            return true;
        return (
            pathname.startsWith(href) &&
            href !== "/dashboard" &&
            href !== "/admin/dashboard"
        );
    };

    return (
        <div
            className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
                isCollapsed ? "w-16" : "w-64"
            } min-h-screen flex flex-col`}
        >
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <Link href="/">
                            <span className="text-xl font-bold text-primary">
                                LMS Dashboard
                            </span>
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
                    >
                        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </Button>
                </div>
            </div>

            {/* User Info */}
            {user && (
                <div className="p-4 border-b border-sidebar-border">
                    {isCollapsed ? (
                        <div className="flex justify-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                <User size={16} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                <User size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                        isActive(item.href)
                                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    }`}
                                >
                                    <Icon size={20} />
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-sidebar-border">
                {isCollapsed ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2"
                    >
                        <LogOut size={20} />
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <LogOut size={16} className="mr-3" />
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
}
