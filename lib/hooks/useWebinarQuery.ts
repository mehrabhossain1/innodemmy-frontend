"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    webinarRegistrationsService,
    CreateWebinarRegistrationData,
    CreateWebinarData,
} from "../api/services/webinar-registrations.service";
import { getErrorMessage } from "../api/client";
import { toast } from "sonner";

// ==================== Query Keys ====================
export const webinarKeys = {
    all: ["webinars"] as const,
    lists: () => [...webinarKeys.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
        [...webinarKeys.lists(), params] as const,
    detail: (id: string) => [...webinarKeys.all, "detail", id] as const,
    slug: (slug: string) => [...webinarKeys.all, "slug", slug] as const,
    upcoming: () => [...webinarKeys.all, "upcoming"] as const,
};

export const registrationKeys = {
    all: ["registrations"] as const,
    lists: () => [...registrationKeys.all, "list"] as const,
    allRegistrations: (params?: Record<string, unknown>) =>
        [...registrationKeys.lists(), "all", params] as const,
    myRegistrations: () => [...registrationKeys.lists(), "me"] as const,
    detail: (id: string) => [...registrationKeys.all, "detail", id] as const,
    check: (webinarId: string) =>
        [...registrationKeys.all, "check", webinarId] as const,
};

// ==================== Webinar Hooks ====================

/**
 * Get all webinars
 */
export function useWebinars(params?: {
    page?: number;
    limit?: number;
    status?: string;
    featured?: boolean;
}) {
    return useQuery({
        queryKey: webinarKeys.list(params),
        queryFn: () => webinarRegistrationsService.getWebinars(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Get webinar by ID
 */
export function useWebinar(id: string) {
    return useQuery({
        queryKey: webinarKeys.detail(id),
        queryFn: () => webinarRegistrationsService.getWebinarById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get webinar by slug
 */
export function useWebinarBySlug(slug: string) {
    return useQuery({
        queryKey: webinarKeys.slug(slug),
        queryFn: () => webinarRegistrationsService.getWebinarBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Get upcoming webinars
 */
export function useUpcomingWebinars(limit: number = 5) {
    return useQuery({
        queryKey: webinarKeys.upcoming(),
        queryFn: () => webinarRegistrationsService.getUpcomingWebinars(limit),
        staleTime: 3 * 60 * 1000, // 3 minutes
    });
}

/**
 * Create webinar (Admin only)
 */
export function useCreateWebinar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateWebinarData) =>
            webinarRegistrationsService.createWebinar(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: webinarKeys.lists() });
            toast.success("Webinar created successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to create webinar");
        },
    });
}

/**
 * Update webinar (Admin only)
 */
export function useUpdateWebinar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Partial<CreateWebinarData>;
        }) => webinarRegistrationsService.updateWebinar(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: webinarKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: webinarKeys.detail(variables.id),
            });
            toast.success("Webinar updated successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to update webinar");
        },
    });
}

/**
 * Delete webinar (Admin only)
 */
export function useDeleteWebinar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            webinarRegistrationsService.deleteWebinar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: webinarKeys.lists() });
            toast.success("Webinar deleted successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to delete webinar");
        },
    });
}

// ==================== Registration Hooks ====================

/**
 * Get all registrations (Admin only)
 */
export function useAllRegistrations(params?: {
    page?: number;
    limit?: number;
    status?: string;
    webinarId?: string;
}) {
    return useQuery({
        queryKey: registrationKeys.allRegistrations(params),
        queryFn: () => webinarRegistrationsService.getAllRegistrations(params),
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Get user's registrations
 */
export function useMyRegistrations() {
    return useQuery({
        queryKey: registrationKeys.myRegistrations(),
        queryFn: () => webinarRegistrationsService.getMyRegistrations(),
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Get registration by ID
 */
export function useRegistration(id: string) {
    return useQuery({
        queryKey: registrationKeys.detail(id),
        queryFn: () => webinarRegistrationsService.getRegistrationById(id),
        enabled: !!id,
        staleTime: 2 * 60 * 1000,
    });
}

/**
 * Check if user is registered for a webinar
 */
export function useCheckRegistration(webinarId: string) {
    return useQuery({
        queryKey: registrationKeys.check(webinarId),
        queryFn: () => webinarRegistrationsService.checkRegistration(webinarId),
        enabled: !!webinarId,
        staleTime: 1 * 60 * 1000,
    });
}

/**
 * Register for webinar
 */
export function useCreateRegistration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateWebinarRegistrationData) =>
            webinarRegistrationsService.createRegistration(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: registrationKeys.lists(),
            });
            queryClient.invalidateQueries({
                queryKey: registrationKeys.check(variables.webinarId),
            });
            toast.success("Successfully registered for webinar!");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to register for webinar");
        },
    });
}

/**
 * Cancel registration
 */
export function useCancelRegistration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            webinarRegistrationsService.cancelRegistration(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: registrationKeys.lists(),
            });
            toast.success("Registration cancelled");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to cancel registration");
        },
    });
}

/**
 * Mark as attended (Admin only)
 */
export function useMarkAsAttended() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            webinarRegistrationsService.markAsAttended(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: registrationKeys.lists(),
            });
            queryClient.invalidateQueries({
                queryKey: registrationKeys.detail(id),
            });
            toast.success("Marked as attended");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to mark as attended");
        },
    });
}

/**
 * Delete registration (Admin only)
 */
export function useDeleteRegistration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            webinarRegistrationsService.deleteRegistration(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: registrationKeys.lists(),
            });
            toast.success("Registration deleted successfully");
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast.error(message || "Failed to delete registration");
        },
    });
}
