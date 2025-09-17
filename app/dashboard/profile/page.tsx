"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
    ChevronRight,
    User,
    BookOpen,
    ShoppingCart,
    GraduationCap,
    LogOut,
} from "lucide-react";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        Please log in
                    </h2>
                    <p className="text-gray-600">
                        You need to be logged in to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    // Generate initials from user name
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const menuItems = [
        {
            id: "profile",
            label: "Profile",
            icon: User,
            active: true,
            onClick: () => {},
        },
        {
            id: "learning",
            label: "My Learning",
            icon: BookOpen,
            active: false,
            onClick: () => router.push("/dashboard/courses"),
        },
        {
            id: "cart",
            label: "My Cart",
            icon: ShoppingCart,
            active: false,
            onClick: () => {},
        },
        {
            id: "teach",
            label: "Teach to Innodemmy",
            icon: GraduationCap,
            active: false,
            onClick: () => {},
        },
        {
            id: "logout",
            label: "Logout",
            icon: LogOut,
            active: false,
            onClick: handleLogout,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
                {/* Profile Header */}
                <div className="text-center pt-8 pb-6">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">
                            {getInitials(user.name)}
                        </span>
                    </div>

                    {/* User Info */}
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Menu Items */}
                <div className="px-4 pb-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={item.onClick}
                                className={`w-full flex items-center justify-between p-3 mb-2 rounded-lg transition-colors ${
                                    item.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </div>
                                {item.id !== "logout" && (
                                    <ChevronRight
                                        size={16}
                                        className={
                                            item.active
                                                ? "text-white"
                                                : "text-gray-400"
                                        }
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
