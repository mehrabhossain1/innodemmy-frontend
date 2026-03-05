// Google Tag Manager Data Layer Types

// Base event interface
interface GTMEvent {
    event: string;
    [key: string]: unknown;
}

// Page view event
interface PageViewEvent extends GTMEvent {
    event: "page_view";
    page: {
        title: string;
        path: string;
        type: string;
    };
    user: {
        id: string;
        role: string;
    };
}

// Ecommerce events (GA4 Enhanced Ecommerce)
interface EcommerceItem {
    item_id: string;
    item_name: string;
    item_category: string;
    price: number;
    discount?: number;
    item_brand?: string;
    quantity: number;
}

interface ViewItemEvent extends GTMEvent {
    event: "view_item";
    ecommerce: {
        currency: string;
        value: number;
        items: EcommerceItem[];
    };
}

interface AddToCartEvent extends GTMEvent {
    event: "add_to_cart";
    ecommerce: {
        currency: string;
        value: number;
        items: EcommerceItem[];
    };
}

interface BeginCheckoutEvent extends GTMEvent {
    event: "begin_checkout";
    ecommerce: {
        currency: string;
        value: number;
        items: EcommerceItem[];
    };
}

interface PurchaseEvent extends GTMEvent {
    event: "purchase";
    ecommerce: {
        transaction_id: string;
        value: number;
        currency: string;
        items: EcommerceItem[];
    };
}

// Authentication events
interface AuthEvent extends GTMEvent {
    event: "login" | "signup" | "logout";
    user_id?: string;
    timestamp: string;
}

// User action event
interface UserActionEvent extends GTMEvent {
    event: "user_action";
    action: string;
}

// Blog view event
interface BlogViewEvent extends GTMEvent {
    event: "blog_view";
    blog: {
        id: string;
        title: string;
        category: string;
        author: string;
    };
}

// Webinar registration event
interface WebinarRegistrationEvent extends GTMEvent {
    event: "webinar_registration";
    webinar: {
        id: string;
        title: string;
        date: string;
    };
}

// Union type of all possible data layer events
type DataLayerEvent =
    | PageViewEvent
    | ViewItemEvent
    | AddToCartEvent
    | BeginCheckoutEvent
    | PurchaseEvent
    | AuthEvent
    | UserActionEvent
    | BlogViewEvent
    | WebinarRegistrationEvent
    | GTMEvent;

// Extend Window interface
interface Window {
    dataLayer: DataLayerEvent[];
}
