import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { trackAuth } from "@/lib/utils/gtm";

export interface User {
    _id?: string;
    name: string;
    email: string;
    role: "student" | "admin";
    isVerified?: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuthStatus = useCallback(() => {
        try {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (token && userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Track login event in GTM
        trackAuth("login", userData._id);
    };

    const logout = () => {
        const userId = user?._id;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        // Track logout event in GTM
        trackAuth("logout", userId);

        router.push("/");
    };

    return {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };
}
