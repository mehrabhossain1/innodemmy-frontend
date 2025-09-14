"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
            return;
        }

        if (!isLoading && user && user.role !== "admin") {
            router.push("/dashboard");
            return;
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user || user.role !== "admin") {
        return null; // Will redirect
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    <DashboardHeader />
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;
