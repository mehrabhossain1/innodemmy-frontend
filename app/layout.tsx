import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GTMProvider } from "@/lib/contexts/GTMContext";
import SupportButton from "@/components/SupportButton";

const hindSiliguri = Hind_Siliguri({
    variable: "--font-hind-siliguri",
    subsets: ["latin", "bengali"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Innodemy - Learn Beyond Limits",
        template: "%s | Innodemy",
    },
    description:
        "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications, hands-on projects, and industry-recognized skills development.",
    keywords: [
        "online learning platform",
        "LMS",
        "learning management system",
        "online courses",
        "professional certification",
        "skill development",
        "e-learning",
        "career training",
        "distance learning",
        "online education",
    ],
    authors: [{ name: "Innodemy" }],
    creator: "Innodemy",
    publisher: "Innodemy",
    metadataBase: new URL("https://innodemy.com"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://innodemy.com",
        siteName: "Innodemy",
        title: "Innodemy - Online Learning Platform | Professional Courses & Certifications",
        description:
            "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications and hands-on learning.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Innodemy - Online Learning Management System",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Innodemy - Online Learning Platform | Professional Courses & Certifications",
        description:
            "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications.",
        images: ["/twitter-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        // Add other verification codes as needed
    },
};

//
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Initialize Data Layer BEFORE GTM */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                                'originalLocation': document.location.protocol + '//' + 
                                    document.location.hostname + 
                                    document.location.pathname + 
                                    document.location.search
                            });
                        `,
                    }}
                />

                {/* Google Tag Manager */}
                {gtmId && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${gtmId}');
                            `,
                        }}
                    />
                )}
                {/* End Google Tag Manager */}
            </head>
            <body
                className={`${hindSiliguri.variable} ${hindSiliguri.className} antialiased`}
                suppressHydrationWarning
            >
                {/* Google Tag Manager (noscript) */}
                {gtmId && (
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        />
                    </noscript>
                )}
                {/* End Google Tag Manager (noscript) */}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <GTMProvider>
                        <ConditionalLayout>{children}</ConditionalLayout>
                        <SupportButton />
                    </GTMProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
