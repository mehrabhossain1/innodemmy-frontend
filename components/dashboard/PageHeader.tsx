import { useAuth } from "@/lib/hooks/useAuth";
import { BookOpen } from "lucide-react";
import React from "react";

export default function PageHeader() {
    const { user } = useAuth();

    // Get user initials for profile placeholder
    const getUserInitials = () => {
        if (!user?.name) return "ME";
        return user.name
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="bg-blue-100 container mx-auto p-6 mt-6 rounded-lg relative overflow-hidden">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Profile Circle */}
                    <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getUserInitials()}
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Welcome, {user?.name || "Mehrab Hossan Munna"}
                        </h1>
                        <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>0 Courses Enrolled</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 bg-orange-400 rounded-sm flex items-center justify-center">
                                    <span className="text-white text-xs">
                                        📜
                                    </span>
                                </div>
                                <span>0 Certificate</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Illustration */}
                <div className="w-32 h-32 relative">
                    <div className="absolute inset-0 bg-blue-200 rounded-full opacity-50"></div>
                    <div className="absolute inset-2 bg-blue-300 rounded-full opacity-70"></div>
                    <div className="absolute inset-4 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
