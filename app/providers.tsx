"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { useState, type ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    // Create a client instance for React Query
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Stale time: how long data is considered fresh (default: 0)
                        staleTime: 60 * 1000, // 1 minute

                        // Cache time: how long inactive data stays in cache (default: 5 minutes)
                        gcTime: 5 * 60 * 1000, // 5 minutes

                        // Refetch on window focus (default: true)
                        refetchOnWindowFocus: false,

                        // Refetch on reconnect (default: true)
                        refetchOnReconnect: true,

                        // Retry failed requests (default: 3)
                        retry: 1,

                        // Retry delay (default: exponential backoff)
                        retryDelay: (attemptIndex) =>
                            Math.min(1000 * 2 ** attemptIndex, 30000),
                    },
                    mutations: {
                        // Retry failed mutations
                        retry: 0,

                        // Error handling for mutations
                        onError: (error) => {
                            console.error("Mutation error:", error);
                        },
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}

                {/* Toast notifications */}
                <Toaster
                    position="top-right"
                    richColors
                    closeButton
                    duration={4000}
                    toastOptions={{
                        style: {
                            background: "var(--background)",
                            color: "var(--foreground)",
                            border: "1px solid var(--border)",
                        },
                    }}
                />

                {/* React Query DevTools (only in development) */}
                {process.env.NODE_ENV === "development" && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </NextThemesProvider>
        </QueryClientProvider>
    );
}
