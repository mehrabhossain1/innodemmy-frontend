"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function DashboardHeader({
    title,
    subtitle,
}: DashboardHeaderProps) {
    const pathname = usePathname();
    const { user } = useAuth();

    // Auto-generate title based on pathname if not provided
    const getPageTitle = () => {
        if (title) return title;

        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        if (pathname === "/dashboard") return "Dashboard";
        if (pathname === "/admin/dashboard") return "Admin Dashboard";

        // Capitalize and format the last segment
        return lastSegment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const getPageSubtitle = () => {
        if (subtitle) return subtitle;

        if (pathname === "/dashboard") return `Welcome back, ${user?.name}!`;
        if (pathname === "/admin/dashboard")
            return "Manage your platform from here";

        return undefined;
    };

    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
                {getPageTitle()}
            </h1>
            {getPageSubtitle() && (
                <p className="mt-2 text-gray-600">{getPageSubtitle()}</p>
            )}
        </div>
    );
}
