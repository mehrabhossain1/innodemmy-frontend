import { apiClient } from "../client";

// ==================== Types ====================
export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    author: {
        name: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    published: boolean;
    featured: boolean;
    views: number;
    readTime: string;
    createdAt: string;
    updatedAt: string;
}

export interface BlogsResponse {
    success: boolean;
    data: {
        blogs: Blog[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface BlogResponse {
    success: boolean;
    data: Blog;
}

export interface BlogQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: "newest" | "oldest" | "popular";
    featured?: boolean;
    published?: boolean;
}

export interface CreateBlogData {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail: string;
    author: {
        name: string;
        avatar?: string;
    };
    category: string;
    tags?: string[];
    published?: boolean;
    featured?: boolean;
}

// ==================== Service ====================
export const blogsService = {
    /**
     * Get all blogs with filters
     */
    getBlogs: async (params?: BlogQueryParams): Promise<BlogsResponse> => {
        const response = await apiClient.get("/blogs", { params });
        return response.data;
    },

    /**
     * Get blog by ID
     */
    getBlogById: async (id: string): Promise<BlogResponse> => {
        const response = await apiClient.get(`/blogs/${id}`);
        return response.data;
    },

    /**
     * Get blog by slug
     */
    getBlogBySlug: async (slug: string): Promise<BlogResponse> => {
        const response = await apiClient.get(`/blogs/slug/${slug}`);
        return response.data;
    },

    /**
     * Create new blog (Admin only)
     */
    createBlog: async (data: CreateBlogData): Promise<BlogResponse> => {
        const response = await apiClient.post("/blogs", data);
        return response.data;
    },

    /**
     * Update blog (Admin only)
     */
    updateBlog: async (
        id: string,
        data: Partial<CreateBlogData>,
    ): Promise<BlogResponse> => {
        const response = await apiClient.put(`/blogs/${id}`, data);
        return response.data;
    },

    /**
     * Delete blog (Admin only)
     */
    deleteBlog: async (
        id: string,
    ): Promise<{ success: boolean; message: string }> => {
        const response = await apiClient.delete(`/blogs/${id}`);
        return response.data;
    },

    /**
     * Get featured blogs
     */
    getFeaturedBlogs: async (limit: number = 3): Promise<BlogsResponse> => {
        const response = await apiClient.get("/blogs", {
            params: { featured: true, limit },
        });
        return response.data;
    },

    /**
     * Get popular blogs
     */
    getPopularBlogs: async (limit: number = 5): Promise<BlogsResponse> => {
        const response = await apiClient.get("/blogs", {
            params: { sort: "popular", limit },
        });
        return response.data;
    },

    /**
     * Search blogs
     */
    searchBlogs: async (query: string): Promise<BlogsResponse> => {
        const response = await apiClient.get("/blogs", {
            params: { search: query },
        });
        return response.data;
    },

    /**
     * Get blog categories
     */
    getCategories: async (): Promise<{ success: boolean; data: string[] }> => {
        const response = await apiClient.get("/blogs/categories");
        return response.data;
    },

    /**
     * Increment blog views
     */
    incrementViews: async (id: string): Promise<{ success: boolean }> => {
        const response = await apiClient.post(`/blogs/${id}/view`);
        return response.data;
    },
};
