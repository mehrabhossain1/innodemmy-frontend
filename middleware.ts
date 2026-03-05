import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname } = request.nextUrl;

    // ── Security Headers ─────────────────────────────────────────────
    // Prevent MIME-type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");

    // Prevent clickjacking
    response.headers.set("X-Frame-Options", "DENY");

    // XSS protection (legacy browsers)
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // Control referrer information
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Restrict permissions/features
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    );

    // Strict Transport Security (1 year, include subdomains)
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload",
    );

    // Content Security Policy
    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https: http:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.mongodb.net",
            "frame-src 'self' https://www.youtube.com https://youtube.com https://player.vimeo.com",
            "media-src 'self' https: blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
        ].join("; "),
    );

    // ── Block suspicious API requests ────────────────────────────────
    if (pathname.startsWith("/api/")) {
        // Block requests with suspiciously large bodies (already handled by Next.js, but add header)
        response.headers.set("X-Request-Id", crypto.randomUUID());

        // Prevent caching of API responses
        response.headers.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
    }

    return response;
}

export const config = {
    matcher: [
        // Match all routes except static files and _next internals
        "/((?!_next/static|_next/image|favicon.ico|images|icons|logo|courses|instructors|blogs).*)",
    ],
};
