import { apiClient } from "../client";

// ==================== Types ====================
export interface LoginRequest {
    identifier: string; // email or phone
    password: string;
}

export interface RegisterRequest {
    name: string;
    email?: string;
    phone?: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    data: {
        user: {
            _id: string;
            name: string;
            email?: string;
            phone?: string;
            role: "student" | "admin";
            createdAt: string;
            updatedAt: string;
        };
        token: string;
    };
    message?: string;
}

export interface UserResponse {
    success: boolean;
    data: {
        _id: string;
        name: string;
        email?: string;
        phone?: string;
        role: "student" | "admin";
        createdAt: string;
        updatedAt: string;
    };
}

// ==================== Service ====================
export const authService = {
    /**
     * Login with email or phone
     */
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post("/auth/signin", data);
        return response.data;
    },

    /**
     * Register new user
     */
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post("/auth/signup", data);
        return response.data;
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<void> => {
        await apiClient.post("/auth/logout");
    },

    /**
     * Get current authenticated user
     */
    getCurrentUser: async (): Promise<UserResponse> => {
        const response = await apiClient.get("/auth/me");
        return response.data;
    },

    /**
     * Refresh auth token
     */
    refreshToken: async (): Promise<AuthResponse> => {
        const response = await apiClient.post("/auth/refresh");
        return response.data;
    },

    /**
     * Change password
     */
    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.put("/auth/change-password", data);
        return response.data;
    },

    /**
     * Request password reset
     */
    forgotPassword: async (data: {
        email: string;
    }): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post("/auth/forgot-password", data);
        return response.data;
    },

    /**
     * Reset password with token
     */
    resetPassword: async (data: {
        token: string;
        newPassword: string;
    }): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.post("/auth/reset-password", data);
        return response.data;
    },
};
