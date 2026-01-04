import { Webinar } from "@/lib/models";
import { COURSE_CATEGORIES } from "@/lib/constants/categories";

export const webinars: Webinar[] = [
    {
        id: "higher-studies-abroad-scholarship",
        title: "Webinar on Higher Studies Abroad with Scholarship",
        description:
            "বিদেশে পড়ার ইচ্ছা সবার থাকলেও সঠিক তথ্যের অভাবে অনেকেই পিছিয়ে পড়েন। তাই আমরা সাজিয়েছি এই বিশেষ সেশন, যেখানে বিশ্বের নামী-দামী বিশ্ববিদ্যালয়ে স্কলারশিপ পাওয়ার সিক্রেট এবং স্কলারশিপ পাওয়ার জন্য একটি শক্তিশালী প্রোফাইল তৈরির আদ্যোপান্ত শেয়ার করা হবে যাতে কোনো দ্বিধা ছাড়াই আপনি আপনার গ্লোবাল ক্যারিয়ারের পথে পা বাড়াতে পারেন",
        image: "/upcoming-webinar/higher-studies.jpeg",
        videoUrl: "https://zoom.us/j/placeholder",
        duration: "2h",
        instructor: "Kazi Mejbaul Islam",
        instructorBio:
            "PhD in ECE candidate - University of Florida | Research Scholar, SRC Research Scholars Program | Graduate Research Assistant, RISING Lab at The University of Florida | MS, Computer Science, Florida State University",
        instructorImage: "/instructors/Kazi-Mejbaul-Islam.jpeg",
        views: 0,
        topics: [
            "Scholarship Opportunities",
            "SOP & LOR Writing",
            "University Selection",
            "IELTS/TOEFL/GRE",
            "Profile Building",
            "Study Abroad",
        ],
        date: "11th January, 2026",
        language: "Bengali",
        category: COURSE_CATEGORIES.PROGRAMMING,
        published: true,
        isUpcoming: true,
        learningPoints: {
            title: "কী কী শিখতে পারবেন এই ওয়েবিনারে?",
            points: [
                "আপনার জন্য কোন দেশ সেরা হবে? যুক্তরাষ্ট্র (USA), কানাডা, যুক্তরাজ্য (UK), অস্ট্রেলিয়া, জাপান ও কোরিয়ার মতো জনপ্রিয় দেশগুলোর সুযোগ-সুবিধা সম্পর্কে আলোচনা।",
                "একাডেমিক রেজাল্ট কেমন হতে হবে এবং IELTS, TOEFL কিংবা GRE-র মতো পরীক্ষাগুলোর প্রস্তুতি কীভাবে নেবেন।",
                "বিভিন্ন ধরনের স্কলারশিপ (Full-fund/Partial) পাওয়ার উপায়।",
                "কীভাবে একটি শক্তিশালী SOP, LOR এবং প্রফেশনাল CV তৈরি করবেন। সেই সাথে সহ-শিক্ষা কার্যক্রম (Extracurricular) ও রিসার্চ পেপারের গুরুত্ব।",
                "সঠিক সময়ে সঠিক প্রফেসরের সাথে যোগাযোগের কৌশল এবং আবেদনের উপযুক্ত সময় নির্ধারণ।",
                "বিদেশের বিশ্ববিদ্যালয়ে বর্তমান ছাত্র বা অ্যালুমনাইদের সাথে কীভাবে যোগাযোগ স্থাপন করবেন এবং কেনো প্রয়োজন?",
            ],
        },
        whyStudyAbroad: {
            title: "কেন Abroad থেকে উচ্চশিক্ষা গ্রহণ করবেন?",
            points: [
                "বিদেশের ডিগ্রি আপনাকে বিশ্বের নামী-দামী কোম্পানিগুলোতে কাজ করার সুযোগ করে দেয়। আন্তর্জাতিক কর্মপরিবেশে নিজেকে খাপ খাইয়ে নিতে এটি সহায়ক।",
                "বিদেশের বিশ্ববিদ্যালয়গুলো আধুনিক ল্যাবরেটরি, লাইব্রেরি এবং উন্নত প্রযুক্তি ব্যবহারের সুযোগ দেয়, যা উচ্চমানের গবেষণার জন্য অপরিহার্য।",
                "সম্পূর্ণ ভিন্ন একটি পরিবেশে বসবাসের মাধ্যমে আপনার মধ্যে স্বনির্ভরতা গড়ে ওঠে। ভিন্ন ভিন্ন সংস্কৃতির মানুষের সাথে মেলামেশার ফলে আপনার দৃষ্টিভঙ্গি প্রসারিত হয়।",
                "বিশ্বের বিভিন্ন প্রান্তের মেধাবী শিক্ষার্থীদের সাথে কাজ করার ফলে একটি শক্তিশালী প্রফেশনাল নেটওয়ার্ক তৈরি হয়, যা সারাজীবন কাজে লাগে।",
                "প্রায় সকল দেশেই পড়াশোনা শেষে কাজের অনুমতির (Work Permit) পাশাপাশি স্থায়ীভাবে বসবাসের সুযোগ থাকে, যা আপনার ভবিষ্যৎ জীবনকে আর্থিকভাবে সচ্ছল ও নিরাপদ করে।",
            ],
        },
    },
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

export function getRegularWebinars(): Webinar[] {
    return webinars.filter(
        (webinar) => webinar.published && !webinar.isUpcoming
    );
}

export function getUpcomingWebinars(): Webinar[] {
    return webinars.filter(
        (webinar) => webinar.published && webinar.isUpcoming
    );
}
