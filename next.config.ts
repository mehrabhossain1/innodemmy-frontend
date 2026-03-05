import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Remove X-Powered-By header to avoid exposing Next.js
    poweredByHeader: false,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    // Security: limit API request body size (1MB default, blocks huge payloads)
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
};

export default nextConfig;
