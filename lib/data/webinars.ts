import { Webinar } from "@/lib/models";
import { COURSE_CATEGORIES } from "@/lib/constants/categories";

export const webinars: Webinar[] = [
    {
        id: "web-development-fundamentals",
        title: "Web Development Fundamentals: From Zero to Hero",
        description:
            "আপনি যদি শিখতে চান, ই-কমার্স, এবং প্রভৃতি সেক্টরে কাজ করেন তাহলে প্রথমেই আপনাকে ওয়েব ডেভেলপমেন্ট শেখার নৌশিল শুরু করতে হবে। এই বিনামূল্যের মাস্টারক্লাসে আপনি শিখবেন HTML, CSS, এবং JavaScript এর মৌলিক ধারণা এবং কিভাবে আপনি একটি রেসপন্সিভ ওয়েবসাইট তৈরি করবেন।",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2h 30m",
        instructor: "Rubayet Alam",
        instructorBio:
            "Executive - Product Experience with 8+ years in web development",
        instructorImage:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        views: 15420,
        topics: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        date: "11/11",
        language: "Bengali",
        category: COURSE_CATEGORIES.PROGRAMMING,
        published: true,
    },
    {
        id: "python-data-analysis",
        title: "Python for Data Analysis: Getting Started with Pandas",
        description:
            "ডেটা সায়েন্স এবং মেশিন লার্নিং এর জগতে প্রবেশ করতে চান? এই মাস্টারক্লাসে আমরা Python এবং Pandas ব্যবহার করে ডেটা এনালাইসিস শেখাবো। শিখবেন কিভাবে বড় ডেটাসেট থেকে মূল্যবান তথ্য বের করা যায়।",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "1h 45m",
        instructor: "Dr. Michael Chen",
        instructorBio: "Data Science Expert with PhD in Computer Science",
        instructorImage:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        views: 12350,
        topics: ["Python", "Pandas", "Data Analysis", "NumPy"],
        date: "11/15",
        language: "English",
        category: COURSE_CATEGORIES.DATA_SCIENCE_AI,
        published: true,
    },
    {
        id: "ui-ux-principles",
        title: "UI/UX Design Principles: Creating User-Centric Interfaces",
        description:
            "ব্যবহারকারী-কেন্দ্রিক ডিজাইন শিখুন এই ফ্রি মাস্টারক্লাসে। জানুন কিভাবে Design Thinking প্রয়োগ করে সুন্দর এবং কার্যকর ইন্টারফেস তৈরি করা যায়। Figma ব্যবহার করে প্রোটোটাইপ তৈরির টিপস এবং ট্রিকস শিখুন।",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2h 15m",
        instructor: "Emma Rodriguez",
        instructorBio: "Senior UX Designer at a Fortune 500 company",
        instructorImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        views: 18920,
        topics: ["Design Thinking", "Figma", "User Research", "Prototyping"],
        date: "11/20",
        language: "Bengali",
        category: COURSE_CATEGORIES.PROGRAMMING,
        published: true,
    },
    {
        id: "payment-automation-machine-learning",
        title: "Free Webinar On Payment Automation with Machine Learning",
        description:
            "আপনি যদি শিখতে চান, ই-কমার্স, এবং প্রভৃতি সেক্টরে কাজ করেন তাহলা প্রথমেই আপনাকে আর্টিফিশিয়াল ইন্টেলিজেন্স এবং মেশিন লার্নিং এর সাথে পেমেন্ট অটোমেশন কিভাবে কাজ করে সেটা জানতে হবে। এই বিনামূল্যের সেশনে আপনি শিখবেন কিভাবে ML ব্যবহার করে পেমেন্ট সিস্টেম আরও নিরাপদ এবং দ্রুত করা যায়।",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "60 mins",
        instructor: "Rubayet Alam",
        instructorBio:
            "Executive - Product Experience specializing in fintech and ML applications",
        instructorImage:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        views: 8540,
        topics: [
            "Time Series Analysis",
            "Transaction Fraud Detection",
            "Real-time AI integration",
            "NLP in Large Language Models",
        ],
        date: "11/11",
        language: "Bengali",
        category: COURSE_CATEGORIES.DATA_SCIENCE_AI,
        published: true,
    },
];

export function getWebinarById(id: string): Webinar | undefined {
    return webinars.find((webinar) => webinar.id === id);
}

export function getAllWebinars(): Webinar[] {
    return webinars.filter((webinar) => webinar.published);
}
