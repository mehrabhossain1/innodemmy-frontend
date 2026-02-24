"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    enrollmentsService,
    CreateEnrollmentData,
    UpdateProgressData,
} from "../api/services/enrollments.service";
import { getErrorMessage } from "../api/client";
import { toast } from "sonner";

// ==================== Query Keys ====================
export const enrollmentKeys = {
    all: ["enrollments"] as const,
    lists: () => [...enrollmentKeys.all, "list"] as const,
    myEnrollments: (params?: Record<string, unknown>) =>
        [...enrollmentKeys.lists(), "me", params] as const,
    allEnrollments: (params?: Record<string, unknown>) =>
        [...enrollmentKeys.lists(), "all", params] as const,
    detail: (id: string) => [...enrollmentKeys.all, "detail", id] as const,
    check: (courseId: string) =>
        [...enrollmentKeys.all, "check", courseId] as const,
    stats: () => [...enrollmentKeys.all, "stats"] as const,
};

// ==================== Hooks ====================

/**
 * Get user's enrollments
 */
export function useMyEnrollments(params?: {
    page?: number;
    limit?: number;
    status?: string;
}) {
    return useQuery({
        queryKey: enrollmentKeys.myEnrollments(params),
        queryFn: () => enrollmentsService.getMyEnrollments(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

/**
 * Get all enrollments (Admin only)
 */
export function useAllEnrollments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
    courseId?: string;
}) {
    return useQuery({
        queryKey: enrollmentKeys.allEnrollments(params),
        queryFn: () => enrollmentsService.getAllEnrollments(params),
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Get enrollment by ID
 */
export function useEnrollment(id: string) {
    return useQuery({
        queryKey: enrollmentKeys.detail(id),
        queryFn: () => enrollmentsService.getEnrollmentById(id),
        enabled: !!id,
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Check if user is enrolled in a course
 */
export function useCheckEnrollment(courseId: string) {
    return useQuery({
        queryKey: enrollmentKeys.check(courseId),
        queryFn: () => enrollmentsService.checkEnrollment(courseId),
        enabled: !!courseId,
        staleTime: 1 * 60 * 1000, // 1 minute
    });
}

/**
 * Get enrollment statistics (Admin only)
 */
export function useEnrollmentStats() {
    return useQuery({
        queryKey: enrollmentKeys.stats(),
        queryFn: () => enrollmentsService.getStatistics(),
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Create new enrollment (enroll in course)
 */
export function useCreateEnrollment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEnrollmentData) =>
            enrollmentsService.createEnrollment(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: enrollmentKeys.check(variables.courseId),
            });
            toast.success("Successfully enrolled in course!");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to enroll in course");
        },
    });
}

/**
 * Update enrollment progress
 */
export function useUpdateProgress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            enrollmentId,
            data,
        }: {
            enrollmentId: string;
            data: UpdateProgressData;
        }) => enrollmentsService.updateProgress(enrollmentId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: enrollmentKeys.detail(variables.enrollmentId),
            });
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to update progress");
        },
    });
}

/**
 * Mark enrollment as completed
 */
export function useCompleteEnrollment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (enrollmentId: string) =>
            enrollmentsService.completeEnrollment(enrollmentId),
        onSuccess: (_, enrollmentId) => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: enrollmentKeys.detail(enrollmentId),
            });
            toast.success("Congratulations! Course completed! 🎉");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to complete enrollment");
        },
    });
}

/**
 * Cancel enrollment
 */
export function useCancelEnrollment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (enrollmentId: string) =>
            enrollmentsService.cancelEnrollment(enrollmentId),
        onSuccess: (_, enrollmentId) => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: enrollmentKeys.detail(enrollmentId),
            });
            toast.success("Enrollment cancelled");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to cancel enrollment");
        },
    });
}

/**
 * Delete enrollment (Admin only)
 */
export function useDeleteEnrollment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => enrollmentsService.deleteEnrollment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
            toast.success("Enrollment deleted successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to delete enrollment");
        },
    });
}
