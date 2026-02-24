import { apiClient } from "../client";

// ==================== Types ====================
export interface Enrollment {
    _id: string;
    userId: string;
    courseId: string;
    status: "active" | "completed" | "cancelled";
    progress: number;
    enrolledAt: string;
    completedAt?: string;
    lastAccessedAt?: string;
    course?: unknown; // Populated course data
    user?: unknown; // Populated user data
}

export interface EnrollmentsResponse {
    success: boolean;
    data: {
        enrollments: Enrollment[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface EnrollmentResponse {
    success: boolean;
    data: Enrollment;
}

export interface CreateEnrollmentData {
    courseId: string;
    paymentId?: string;
    paymentMethod?: string;
    amount?: number;
}

export interface UpdateProgressData {
    progress: number;
    lastAccessedAt?: string;
}

// ==================== Service ====================
export const enrollmentsService = {
    /**
     * Get user's enrollments
     */
    getMyEnrollments: async (params?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<EnrollmentsResponse> => {
        const response = await apiClient.get("/enrollments/me", { params });
        return response.data;
    },

    /**
     * Get all enrollments (Admin only)
     */
    getAllEnrollments: async (params?: {
        page?: number;
        limit?: number;
        status?: string;
        userId?: string;
        courseId?: string;
    }): Promise<EnrollmentsResponse> => {
        const response = await apiClient.get("/enrollments", { params });
        return response.data;
    },

    /**
     * Get enrollment by ID
     */
    getEnrollmentById: async (id: string): Promise<EnrollmentResponse> => {
        const response = await apiClient.get(`/enrollments/${id}`);
        return response.data;
    },

    /**
     * Check if user is enrolled in a course
     */
    checkEnrollment: async (
        courseId: string,
    ): Promise<{
        success: boolean;
        data: { enrolled: boolean; enrollment?: Enrollment };
    }> => {
        const response = await apiClient.get(`/enrollments/check/${courseId}`);
        return response.data;
    },

    /**
     * Create new enrollment (enroll in course)
     */
    createEnrollment: async (
        data: CreateEnrollmentData,
    ): Promise<EnrollmentResponse> => {
        const response = await apiClient.post("/enrollments", data);
        return response.data;
    },

    /**
     * Update enrollment progress
     */
    updateProgress: async (
        enrollmentId: string,
        data: UpdateProgressData,
    ): Promise<EnrollmentResponse> => {
        const response = await apiClient.put(
            `/enrollments/${enrollmentId}/progress`,
            data,
        );
        return response.data;
    },

    /**
     * Mark enrollment as completed
     */
    completeEnrollment: async (
        enrollmentId: string,
    ): Promise<EnrollmentResponse> => {
        const response = await apiClient.put(
            `/enrollments/${enrollmentId}/complete`,
        );
        return response.data;
    },

    /**
     * Cancel enrollment
     */
    cancelEnrollment: async (
        enrollmentId: string,
    ): Promise<EnrollmentResponse> => {
        const response = await apiClient.put(
            `/enrollments/${enrollmentId}/cancel`,
        );
        return response.data;
    },

    /**
     * Delete enrollment (Admin only)
     */
    deleteEnrollment: async (
        id: string,
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.delete(`/enrollments/${id}`);
        return response.data;
    },

    /**
     * Get enrollment statistics (Admin only)
     */
    getStatistics: async (): Promise<{
        success: boolean;
        data: {
            total: number;
            active: number;
            completed: number;
            cancelled: number;
        };
    }> => {
        const response = await apiClient.get("/enrollments/stats");
        return response.data;
    },
};
