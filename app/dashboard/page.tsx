"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardPage() {
    return (
        <div>
            <DashboardHeader />
            <div className="px-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Content
                </h1>
                <p className="mt-2 text-gray-600">
                    Your dashboard content goes here.
                </p>
            </div>
        </div>
    );
}
