"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    blogsService,
    BlogQueryParams,
    CreateBlogData,
} from "../api/services/blogs.service";
import { getErrorMessage } from "../api/client";
import { toast } from "sonner";

// ==================== Query Keys ====================
export const blogKeys = {
    all: ["blogs"] as const,
    lists: () => [...blogKeys.all, "list"] as const,
    list: (params?: BlogQueryParams) => [...blogKeys.lists(), params] as const,
    details: () => [...blogKeys.all, "detail"] as const,
    detail: (id: string) => [...blogKeys.details(), id] as const,
    slug: (slug: string) => [...blogKeys.all, "slug", slug] as const,
    featured: () => [...blogKeys.all, "featured"] as const,
    popular: () => [...blogKeys.all, "popular"] as const,
    categories: () => [...blogKeys.all, "categories"] as const,
};

// ==================== Hooks ====================

/**
 * Get all blogs with filters
 */
export function useBlogs(params?: BlogQueryParams) {
    return useQuery({
        queryKey: blogKeys.list(params),
        queryFn: () => blogsService.getBlogs(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Get blog by ID
 */
export function useBlog(id: string) {
    return useQuery({
        queryKey: blogKeys.detail(id),
        queryFn: () => blogsService.getBlogById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get blog by slug
 */
export function useBlogBySlug(slug: string) {
    return useQuery({
        queryKey: blogKeys.slug(slug),
        queryFn: () => blogsService.getBlogBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get featured blogs
 */
export function useFeaturedBlogs(limit: number = 3) {
    return useQuery({
        queryKey: blogKeys.featured(),
        queryFn: () => blogsService.getFeaturedBlogs(limit),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

/**
 * Get popular blogs
 */
export function usePopularBlogs(limit: number = 5) {
    return useQuery({
        queryKey: blogKeys.popular(),
        queryFn: () => blogsService.getPopularBlogs(limit),
        staleTime: 10 * 60 * 1000,
    });
}

/**
 * Search blogs
 */
export function useSearchBlogs(query: string) {
    return useQuery({
        queryKey: [...blogKeys.lists(), "search", query],
        queryFn: () => blogsService.searchBlogs(query),
        enabled: query.length > 0,
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Get blog categories
 */
export function useBlogCategories() {
    return useQuery({
        queryKey: blogKeys.categories(),
        queryFn: () => blogsService.getCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
}

/**
 * Create new blog (Admin only)
 */
export function useCreateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBlogData) => blogsService.createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
            toast.success("Blog created successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to create blog");
        },
    });
}

/**
 * Update blog (Admin only)
 */
export function useUpdateBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Partial<CreateBlogData>;
        }) => blogsService.updateBlog(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: blogKeys.detail(variables.id),
            });
            toast.success("Blog updated successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to update blog");
        },
    });
}

/**
 * Delete blog (Admin only)
 */
export function useDeleteBlog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => blogsService.deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
            toast.success("Blog deleted successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to delete blog");
        },
    });
}

/**
 * Increment blog views
 */
export function useIncrementBlogViews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => blogsService.incrementViews(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
        },
    });
}
