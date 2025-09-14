"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalLayout({
    children,
}: ConditionalLayoutProps) {
    const pathname = usePathname();

    // Check if current page is a dashboard page
    const isDashboardPage =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/admin/dashboard");

    if (isDashboardPage) {
        // For dashboard pages, render without Navbar and Footer
        return <>{children}</>;
    }

    // For other pages, render with Navbar and Footer
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
