import { apiClient } from "../client";
import { Course } from "@/lib/models";

// ==================== Types ====================
export interface CoursesResponse {
    success: boolean;
    data: {
        courses: Course[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface CourseResponse {
    success: boolean;
    data: Course;
}

export interface CourseQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    level?: string;
    sort?: "newest" | "oldest" | "popular" | "price-low" | "price-high";
    featured?: boolean;
}

export interface CreateCourseData {
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    thumbnail?: string;
    price: number;
    discountedPrice?: number;
    duration?: string;
    level?: "Beginner" | "Intermediate" | "Advanced";
    category?: string;
    tags?: string[];
    featured?: boolean;
    published?: boolean;
    instructor?: {
        name: string;
        title?: string;
        avatar?: string;
        bio?: string;
    };
    modules?: unknown[];
    whatYouWillLearn?: string[];
    requirements?: string[];
    targetAudience?: string[];
}

// ==================== Service ====================
export const coursesService = {
    /**
     * Get all courses with filters
     */
    getCourses: async (
        params?: CourseQueryParams,
    ): Promise<CoursesResponse> => {
        const response = await apiClient.get("/courses", { params });
        return response.data;
    },

    /**
     * Get course by ID
     */
    getCourseById: async (id: string): Promise<CourseResponse> => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data;
    },

    /**
     * Get course by slug
     */
    getCourseBySlug: async (slug: string): Promise<CourseResponse> => {
        const response = await apiClient.get(`/courses/slug/${slug}`);
        return response.data;
    },

    /**
     * Create new course (Admin only)
     */
    createCourse: async (data: CreateCourseData): Promise<CourseResponse> => {
        const response = await apiClient.post("/courses", data);
        return response.data;
    },

    /**
     * Update course (Admin only)
     */
    updateCourse: async (
        id: string,
        data: Partial<CreateCourseData>,
    ): Promise<CourseResponse> => {
        const response = await apiClient.put(`/courses/${id}`, data);
        return response.data;
    },

    /**
     * Delete course (Admin only)
     */
    deleteCourse: async (
        id: string,
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.delete(`/courses/${id}`);
        return response.data;
    },

    /**
     * Get featured courses
     */
    getFeaturedCourses: async (): Promise<CoursesResponse> => {
        const response = await apiClient.get("/courses", {
            params: { featured: true },
        });
        return response.data;
    },

    /**
     * Get popular courses
     */
    getPopularCourses: async (limit: number = 6): Promise<CoursesResponse> => {
        const response = await apiClient.get("/courses", {
            params: { sort: "popular", limit },
        });
        return response.data;
    },

    /**
     * Search courses
     */
    searchCourses: async (query: string): Promise<CoursesResponse> => {
        const response = await apiClient.get("/courses", {
            params: { search: query },
        });
        return response.data;
    },

    /**
     * Get course categories
     */
    getCategories: async (): Promise<{ success: boolean; data: string[] }> => {
        const response = await apiClient.get("/courses/categories");
        return response.data;
    },
};
