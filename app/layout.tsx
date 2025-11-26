import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import SupportButton from "@/components/SupportButton";

const hindSiliguri = Hind_Siliguri({
    variable: "--font-hind-siliguri",
    subsets: ["latin", "bengali"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Innodemy - Online Learning Platform | Professional Courses & Certifications",
        template: "%s | Innodemy"
    },
    description: "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications, hands-on projects, and industry-recognized skills development.",
    keywords: ["online learning platform", "LMS", "learning management system", "online courses", "professional certification", "skill development", "e-learning", "career training", "distance learning", "online education"],
    authors: [{ name: "Innodemy" }],
    creator: "Innodemy",
    publisher: "Innodemy",
    metadataBase: new URL('https://innodemy.com'),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://innodemy.com",
        siteName: "Innodemy",
        title: "Innodemy - Online Learning Platform | Professional Courses & Certifications",
        description: "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications and hands-on learning.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Innodemy - Online Learning Management System"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Innodemy - Online Learning Platform | Professional Courses & Certifications",
        description: "Innodemy is a comprehensive online learning management system offering expert-led courses across multiple disciplines. Transform your career with professional certifications.",
        images: ["/twitter-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        // Add other verification codes as needed
    }
};

//
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${hindSiliguri.variable} ${hindSiliguri.className} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ConditionalLayout>{children}</ConditionalLayout>
                    <SupportButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
