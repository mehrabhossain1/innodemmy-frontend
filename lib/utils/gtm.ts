/**
 * Google Tag Manager Utility Functions
 * Centralized GTM data layer management with type safety
 */

const isDevelopment = process.env.NODE_ENV === "development";

interface PageViewData {
    pageTitle: string;
    pagePath: string;
    pageType?: string;
    userId?: string;
    userRole?: string;
    [key: string]: unknown;
}

interface CourseData {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    category: string;
    instructor?: string;
}

interface PurchaseData {
    transactionId: string;
    value: number;
    items: Array<{
        id: string;
        name: string;
        category: string;
        price: number;
    }>;
}

/**
 * Push data to GTM data layer
 * In development mode, logs to console instead
 */
export const pushToDataLayer = (data: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    if (isDevelopment) {
        console.log("[GTM Data Layer]", data);
        return;
    }

    if (window.dataLayer) {
        try {
            window.dataLayer.push(data);
        } catch (error) {
            console.error("[GTM Error]", error);
        }
    }
};

/**
 * Track page views with context
 */
export const trackPageView = (data: PageViewData) => {
    pushToDataLayer({
        event: "page_view",
        page: {
            title: data.pageTitle,
            path: data.pagePath,
            type: data.pageType || "general",
        },
        user: {
            id: data.userId || "anonymous",
            role: data.userRole || "guest",
        },
    });
};

/**
 * Track course views with Enhanced Ecommerce (GA4)
 */
export const trackCourseView = (course: CourseData) => {
    pushToDataLayer({
        event: "view_item",
        ecommerce: {
            currency: "BDT",
            value: course.price,
            items: [
                {
                    item_id: course.id,
                    item_name: course.name,
                    item_category: course.category,
                    price: course.price,
                    discount: course.originalPrice - course.price,
                    item_brand: course.instructor || "Innodemy",
                    quantity: 1,
                },
            ],
        },
    });
};

/**
 * Track enrollment start (Add to Cart)
 */
export const trackEnrollmentStart = (course: {
    id: string;
    name: string;
    price: number;
    category: string;
}) => {
    pushToDataLayer({
        event: "add_to_cart",
        ecommerce: {
            currency: "BDT",
            value: course.price,
            items: [
                {
                    item_id: course.id,
                    item_name: course.name,
                    item_category: course.category,
                    price: course.price,
                    quantity: 1,
                },
            ],
        },
    });
};

/**
 * Track checkout begin
 */
export const trackCheckoutBegin = (course: {
    id: string;
    name: string;
    price: number;
    category: string;
}) => {
    pushToDataLayer({
        event: "begin_checkout",
        ecommerce: {
            currency: "BDT",
            value: course.price,
            items: [
                {
                    item_id: course.id,
                    item_name: course.name,
                    item_category: course.category,
                    price: course.price,
                    quantity: 1,
                },
            ],
        },
    });
};

/**
 * Track successful purchase
 */
export const trackPurchase = (purchase: PurchaseData) => {
    pushToDataLayer({
        event: "purchase",
        ecommerce: {
            transaction_id: purchase.transactionId,
            value: purchase.value,
            currency: "BDT",
            items: purchase.items.map((item) => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                price: item.price,
                quantity: 1,
            })),
        },
    });
};

/**
 * Track user actions (button clicks, form submissions, etc.)
 */
export const trackUserAction = (
    action: string,
    data?: Record<string, unknown>,
) => {
    pushToDataLayer({
        event: "user_action",
        action,
        ...data,
    });
};

/**
 * Track authentication events
 */
export const trackAuth = (
    event: "login" | "signup" | "logout",
    userId?: string,
) => {
    pushToDataLayer({
        event,
        user_id: userId,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track blog post views
 */
export const trackBlogView = (blog: {
    id: string;
    title: string;
    category: string;
    author: string;
}) => {
    pushToDataLayer({
        event: "blog_view",
        blog: {
            id: blog.id,
            title: blog.title,
            category: blog.category,
            author: blog.author,
        },
    });
};

/**
 * Track webinar registrations
 */
export const trackWebinarRegistration = (webinar: {
    id: string;
    title: string;
    date: string;
}) => {
    pushToDataLayer({
        event: "webinar_registration",
        webinar: {
            id: webinar.id,
            title: webinar.title,
            date: webinar.date,
        },
    });
};
