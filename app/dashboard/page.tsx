"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardPage() {
    return (
        <div className="min-h-screen">
            {/* Dashboard Header - Full Width */}
            <DashboardHeader />

            {/* Page Header - Full Width, aligned with Dashboard Header */}
            <PageHeader />

            {/* Main Content Layout */}
            <div className="flex container mx-auto mt-6 space-x-6">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Empty State Content */}
                    <div className="flex-1 flex items-center justify-center py-16">
                        <div className="text-center">
                            {/* Illustration */}
                            <div className="mb-6 flex justify-center">
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative">
                                    <div className="w-16 h-20 bg-white rounded-lg shadow-md flex items-center justify-center relative">
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">
                                                🔍
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-8 h-1 bg-gray-300 rounded"></div>
                                            <div className="w-6 h-1 bg-gray-300 rounded"></div>
                                            <div className="w-10 h-1 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg">
                                You have not enrolled in any course
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
