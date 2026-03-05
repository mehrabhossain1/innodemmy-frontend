"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, pushToDataLayer } from "@/lib/utils/gtm";
import { useAuth } from "@/lib/hooks/useAuth";

interface GTMContextProps {
    trackEvent: (event: string, data?: Record<string, unknown>) => void;
}

const GTMContext = createContext<GTMContextProps>({
    trackEvent: () => {},
});

export const useGTM = () => useContext(GTMContext);

export function GTMProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    // Track page views on route change
    useEffect(() => {
        if (pathname) {
            trackPageView({
                pageTitle: document.title,
                pagePath: pathname,
                pageType: getPageType(pathname),
                userId: user?._id || undefined,
                userRole: user?.role || "guest",
            });
        }
    }, [pathname, user]);

    // Update user data in data layer when user changes
    useEffect(() => {
        if (user) {
            pushToDataLayer({
                event: "user_data",
                user_id: user._id,
                user_role: user.role,
                user_name: user.name,
                user_email: user.email || undefined,
            });
        }
    }, [user]);

    const trackEvent = (event: string, data?: Record<string, unknown>) => {
        pushToDataLayer({ event, ...data });
    };

    return (
        <GTMContext.Provider value={{ trackEvent }}>
            {children}
        </GTMContext.Provider>
    );
}

/**
 * Helper to determine page type based on pathname
 */
function getPageType(pathname: string): string {
    if (pathname === "/") return "homepage";
    if (pathname.startsWith("/courses/") && pathname.split("/").length > 2)
        return "course_detail";
    if (pathname === "/courses") return "course_listing";
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/blogs/") && pathname.split("/").length > 2)
        return "blog_post";
    if (pathname === "/blogs") return "blog_listing";
    if (pathname.startsWith("/checkout")) return "checkout";
    if (pathname.startsWith("/aboutus")) return "about";
    if (pathname.startsWith("/career")) return "career";
    if (pathname.startsWith("/upcoming-webinar")) return "webinar";
    return "general";
}
