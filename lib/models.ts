export interface User {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: "student" | "admin";
    isVerified: boolean;
    verificationCode?: string;
    verificationCodeExpiry?: Date;
    resetPasswordCode?: string;
    resetPasswordCodeExpiry?: Date;
    otpAttempts: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface ClassModule {
    classNumber: number;
    moduleTitle: string;
    topics: string[];
    exercises: string[];
}

export interface Course {
    _id?: string;
    title: string;
    description: string;
    category?: string; // Course category
    batchName?: string; // Batch name for the course
    thumbnail?: string;
    price?: number; // Course price
    totalClasses?: number; // Total number of classes in the course
    totalWeeks?: number; // Total duration in weeks
    totalModules?: number; // Total number of modules
    totalProjects?: number; // Total number of projects
    idealFor?: string[]; // Who this course is ideal for (array of strings)
    faq?: FAQ[]; // Frequently Asked Questions
    modules?: ClassModule[]; // Course modules with topics and exercises
    projects?: string[]; // List of project names
    enrolledCount?: number; // Total enrolled students
    createdAt: Date;
    updatedAt: Date;
}

// Enrollment payment method types
export type PaymentMethod = "bkash" | "nagad";

// Enrollment status types
export type EnrollmentStatus = "pending" | "approved" | "rejected";

// Main Enrollment model
export interface Enrollment {
    _id?: string;
    userId: string; // Reference to User
    courseId: string; // Reference to Course
    status: EnrollmentStatus;
    paymentMethod: PaymentMethod;
    transactionId: string;
    amount: number; // Amount paid
    adminNotes?: string; // Admin can add notes when approving/rejecting
    approvedBy?: string; // Admin user ID who approved
    approvedAt?: Date; // When it was approved
    rejectedAt?: Date; // When it was rejected
    createdAt: Date; // When enrollment was requested
    updatedAt: Date;
}

// Extended Enrollment with populated user and course data
export interface EnrollmentWithDetails extends Enrollment {
    user?: {
        _id: string;
        name: string;
        email: string;
    };
    course?: {
        _id: string;
        title: string;
        description: string;
        thumbnail?: string;
    };
}

// Blog model
export interface Blog {
    _id?: string;
    title: string; // Blog post title
    content: string; // Blog post content (HTML from rich text editor)
    date: Date; // Publication date
    minRead: number; // Estimated reading time in minutes
    author?: string; // Optional author name
    thumbnail?: string; // Optional blog thumbnail image
    category?: string; // Optional blog category
    tags?: string[]; // Optional tags for the blog
    published?: boolean; // Whether the blog is published or draft
    createdAt: Date;
    updatedAt: Date;
}
