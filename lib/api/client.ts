import axios, { AxiosError } from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://innodemmy-backend-app.onrender.com/api/v1";

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        // Only add token for client-side requests
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; error?: string }>) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        }

        // Handle network errors
        if (!error.response) {
            console.error("Network error:", error.message);
        }

        return Promise.reject(error);
    },
);

// Helper function to get error message
export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message
        );
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};
