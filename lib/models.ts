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
    createdAt: Date;
    updatedAt: Date;
}

export interface Enrollment {
    _id?: string;
    userId: string;
    courseId: string;
    status: "pending" | "approved" | "rejected";
    paymentProof?: string;
    paymentAmount: number;
    paymentMethod: string;
    transactionId?: string;
    adminNotes?: string;
    enrolledAt?: Date;
    approvedAt?: Date;
    approvedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface EnrollmentRequest {
    _id?: string;
    userId: string;
    courseId: string;
    paymentProof: string;
    paymentAmount: number;
    paymentMethod: string;
    transactionId?: string;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
    updatedAt: Date;
}
