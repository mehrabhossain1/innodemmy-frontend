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

export interface Course {
    _id?: string;
    title: string;
    description: string;
    thumbnail?: string;
    price?: number; // Course price
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
