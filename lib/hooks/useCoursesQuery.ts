"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    coursesService,
    CourseQueryParams,
    CreateCourseData,
} from "../api/services/courses.service";
import { getErrorMessage } from "../api/client";
import { toast } from "sonner";

// ==================== Query Keys ====================
export const courseKeys = {
    all: ["courses"] as const,
    lists: () => [...courseKeys.all, "list"] as const,
    list: (params?: CourseQueryParams) =>
        [...courseKeys.lists(), params] as const,
    details: () => [...courseKeys.all, "detail"] as const,
    detail: (id: string) => [...courseKeys.details(), id] as const,
    slug: (slug: string) => [...courseKeys.all, "slug", slug] as const,
    featured: () => [...courseKeys.all, "featured"] as const,
    popular: () => [...courseKeys.all, "popular"] as const,
    categories: () => [...courseKeys.all, "categories"] as const,
};

// ==================== Hooks ====================

/**
 * Get all courses with filters
 */
export function useCourses(params?: CourseQueryParams) {
    return useQuery({
        queryKey: courseKeys.list(params),
        queryFn: () => coursesService.getCourses(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Get course by ID
 */
export function useCourse(id: string) {
    return useQuery({
        queryKey: courseKeys.detail(id),
        queryFn: () => coursesService.getCourseById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get course by slug
 */
export function useCourseBySlug(slug: string) {
    return useQuery({
        queryKey: courseKeys.slug(slug),
        queryFn: () => coursesService.getCourseBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get featured courses
 */
export function useFeaturedCourses() {
    return useQuery({
        queryKey: courseKeys.featured(),
        queryFn: () => coursesService.getFeaturedCourses(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

/**
 * Get popular courses
 */
export function usePopularCourses(limit: number = 6) {
    return useQuery({
        queryKey: courseKeys.popular(),
        queryFn: () => coursesService.getPopularCourses(limit),
        staleTime: 10 * 60 * 1000,
    });
}

/**
 * Search courses
 */
export function useSearchCourses(query: string) {
    return useQuery({
        queryKey: [...courseKeys.lists(), "search", query],
        queryFn: () => coursesService.searchCourses(query),
        enabled: query.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

/**
 * Get course categories
 */
export function useCourseCategories() {
    return useQuery({
        queryKey: courseKeys.categories(),
        queryFn: () => coursesService.getCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
}

/**
 * Create new course (Admin only)
 */
export function useCreateCourse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCourseData) =>
            coursesService.createCourse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
            toast.success("Course created successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to create course");
        },
    });
}

/**
 * Update course (Admin only)
 */
export function useUpdateCourse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Partial<CreateCourseData>;
        }) => coursesService.updateCourse(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: courseKeys.detail(variables.id),
            });
            toast.success("Course updated successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to update course");
        },
    });
}

/**
 * Delete course (Admin only)
 */
export function useDeleteCourse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => coursesService.deleteCourse(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
            toast.success("Course deleted successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to delete course");
        },
    });
}
