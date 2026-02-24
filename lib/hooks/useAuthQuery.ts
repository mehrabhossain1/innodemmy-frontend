"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    authService,
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    UserResponse,
} from "../api/services/auth.service";
import { getErrorMessage } from "../api/client";
import { toast } from "sonner";

// ==================== Query Keys ====================
export const authKeys = {
    all: ["auth"] as const,
    user: () => [...authKeys.all, "user"] as const,
};

// ==================== Hooks ====================

/**
 * Hook for user login
 */
export function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: authService.login,
        onSuccess: (data) => {
            // Store token and user in localStorage
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Update query cache
            queryClient.setQueryData(authKeys.user(), data);

            // Show success message
            toast.success("Login successful!");

            // Redirect based on role
            setTimeout(() => {
                if (data.data.user.role === "admin") {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/dashboard");
                }
            }, 500);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Login failed");
        },
    });
}

/**
 * Hook for user registration
 */
export function useRegister() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, RegisterRequest>({
        mutationFn: authService.register,
        onSuccess: (data) => {
            // Store token and user in localStorage
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Update query cache
            queryClient.setQueryData(authKeys.user(), data);

            // Show success message
            toast.success("Registration successful!");

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/dashboard");
            }, 500);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Registration failed");
        },
    });
}

/**
 * Hook for user logout
 */
export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<void, Error>({
        mutationFn: authService.logout,
        onSuccess: () => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Clear all queries
            queryClient.clear();

            // Show success message
            toast.success("Logged out successfully");

            // Redirect to homepage
            router.push("/");
        },
        onError: () => {
            // Even if API fails, clear local data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            queryClient.clear();
            router.push("/");
        },
    });
}

/**
 * Hook to get current authenticated user
 */
export function useCurrentUser() {
    return useQuery<UserResponse, Error>({
        queryKey: authKeys.user(),
        queryFn: authService.getCurrentUser,
        enabled:
            typeof window !== "undefined" && !!localStorage.getItem("token"),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook for changing password
 */
export function useChangePassword() {
    return useMutation({
        mutationFn: authService.changePassword,
        onSuccess: (data) => {
            toast.success(data.message || "Password changed successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to change password");
        },
    });
}

/**
 * Hook for forgot password
 */
export function useForgotPassword() {
    return useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: (data) => {
            toast.success(data.message || "Password reset email sent");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to send reset email");
        },
    });
}

/**
 * Hook for reset password
 */
export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: (data) => {
            toast.success(data.message || "Password reset successfully");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to reset password");
        },
    });
}
