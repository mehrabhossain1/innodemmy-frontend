import { apiClient } from "../client";

// ==================== Types ====================
export interface WebinarRegistration {
    _id: string;
    name: string;
    email: string;
    phone: string;
    webinarId: string;
    status: "registered" | "attended" | "cancelled";
    registeredAt: string;
    attendedAt?: string;
    webinar?: unknown; // Populated webinar data
}

export interface Webinar {
    _id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    instructor: {
        name: string;
        title: string;
        avatar?: string;
    };
    date: string;
    time: string;
    duration: string;
    zoomLink?: string;
    recordingLink?: string;
    featured: boolean;
    status: "upcoming" | "live" | "completed";
    maxParticipants?: number;
    registeredCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface WebinarRegistrationsResponse {
    success: boolean;
    data: {
        registrations: WebinarRegistration[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface WebinarRegistrationResponse {
    success: boolean;
    data: WebinarRegistration;
}

export interface WebinarsResponse {
    success: boolean;
    data: {
        webinars: Webinar[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface WebinarResponse {
    success: boolean;
    data: Webinar;
}

export interface CreateWebinarRegistrationData {
    name: string;
    email: string;
    phone: string;
    webinarId: string;
}

export interface CreateWebinarData {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    instructor: {
        name: string;
        title: string;
        avatar?: string;
    };
    date: string;
    time: string;
    duration: string;
    zoomLink?: string;
    featured?: boolean;
    maxParticipants?: number;
}

// ==================== Service ====================
export const webinarRegistrationsService = {
    /**
     * Get all webinar registrations (Admin only)
     */
    getAllRegistrations: async (params?: {
        page?: number;
        limit?: number;
        status?: string;
        webinarId?: string;
    }): Promise<WebinarRegistrationsResponse> => {
        const response = await apiClient.get("/webinar-registrations", {
            params,
        });
        return response.data;
    },

    /**
     * Get user's registrations
     */
    getMyRegistrations: async (): Promise<WebinarRegistrationsResponse> => {
        const response = await apiClient.get("/webinar-registrations/me");
        return response.data;
    },

    /**
     * Get registration by ID
     */
    getRegistrationById: async (
        id: string,
    ): Promise<WebinarRegistrationResponse> => {
        const response = await apiClient.get(`/webinar-registrations/${id}`);
        return response.data;
    },

    /**
     * Check if user is registered for a webinar
     */
    checkRegistration: async (
        webinarId: string,
    ): Promise<{
        success: boolean;
        data: { registered: boolean; registration?: WebinarRegistration };
    }> => {
        const response = await apiClient.get(
            `/webinar-registrations/check/${webinarId}`,
        );
        return response.data;
    },

    /**
     * Register for webinar
     */
    createRegistration: async (
        data: CreateWebinarRegistrationData,
    ): Promise<WebinarRegistrationResponse> => {
        const response = await apiClient.post("/webinar-registrations", data);
        return response.data;
    },

    /**
     * Cancel registration
     */
    cancelRegistration: async (
        id: string,
    ): Promise<WebinarRegistrationResponse> => {
        const response = await apiClient.put(
            `/webinar-registrations/${id}/cancel`,
        );
        return response.data;
    },

    /**
     * Mark as attended (Admin only)
     */
    markAsAttended: async (
        id: string,
    ): Promise<WebinarRegistrationResponse> => {
        const response = await apiClient.put(
            `/webinar-registrations/${id}/attend`,
        );
        return response.data;
    },

    /**
     * Delete registration (Admin only)
     */
    deleteRegistration: async (
        id: string,
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.delete(`/webinar-registrations/${id}`);
        return response.data;
    },

    // ==================== Webinar Management ====================

    /**
     * Get all webinars
     */
    getWebinars: async (params?: {
        page?: number;
        limit?: number;
        status?: string;
        featured?: boolean;
    }): Promise<WebinarsResponse> => {
        const response = await apiClient.get("/webinars", { params });
        return response.data;
    },

    /**
     * Get webinar by ID
     */
    getWebinarById: async (id: string): Promise<WebinarResponse> => {
        const response = await apiClient.get(`/webinars/${id}`);
        return response.data;
    },

    /**
     * Get webinar by slug
     */
    getWebinarBySlug: async (slug: string): Promise<WebinarResponse> => {
        const response = await apiClient.get(`/webinars/slug/${slug}`);
        return response.data;
    },

    /**
     * Get upcoming webinars
     */
    getUpcomingWebinars: async (
        limit: number = 5,
    ): Promise<WebinarsResponse> => {
        const response = await apiClient.get("/webinars", {
            params: { status: "upcoming", limit },
        });
        return response.data;
    },

    /**
     * Create webinar (Admin only)
     */
    createWebinar: async (
        data: CreateWebinarData,
    ): Promise<WebinarResponse> => {
        const response = await apiClient.post("/webinars", data);
        return response.data;
    },

    /**
     * Update webinar (Admin only)
     */
    updateWebinar: async (
        id: string,
        data: Partial<CreateWebinarData>,
    ): Promise<WebinarResponse> => {
        const response = await apiClient.put(`/webinars/${id}`, data);
        return response.data;
    },

    /**
     * Delete webinar (Admin only)
     */
    deleteWebinar: async (
        id: string,
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.delete(`/webinars/${id}`);
        return response.data;
    },
};
