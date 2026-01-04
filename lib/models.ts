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
    slug: string;
    description: string;
    thumbnail: string;
    courseVideoUrl: string;
    courseStartDate: Date;
    category: string;
    batchName: string;
    price: number;
    totalLiveClasses: number;
    totalWeeks: number;
    totalModules: number;
    totalProjects: number;
    totalExercises: number;
    //
    idealFor?: string[];
    faq?: FAQ[];
    modules?: ClassModule[];
    projects?: string[];
    createdAt?: Date;
    updatedAt?: Date;
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

// Webinar model
export interface Webinar {
    id: string; // Unique identifier for the webinar
    title: string; // Webinar title
    description: string; // Detailed description
    image: string; // Thumbnail image URL
    videoUrl: string; // Video URL (YouTube, Vimeo, etc.)
    duration: string; // Duration in format like "2h 30m"
    instructor: string; // Instructor name
    instructorBio?: string; // Instructor biography
    instructorImage?: string; // Instructor profile image
    views: number; // Number of views
    topics: string[]; // Topics covered in the webinar
    date: string; // Webinar date
    language?: string; // Language of the webinar
    category?: string; // Webinar category
    published?: boolean; // Whether the webinar is published
    isUpcoming?: boolean; // Whether this is an upcoming webinar (shows only in upcoming section)
    learningPoints?: {
        title: string;
        points: string[];
    }; // Optional learning points section
    whyStudyAbroad?: {
        title: string;
        points: string[];
    }; // Optional why study abroad section
    createdAt?: Date;
    updatedAt?: Date;
}

// Webinar Registration model
export interface WebinarRegistration {
    _id?: string;
    webinarId: string; // Reference to the webinar
    fullName: string;
    email: string;
    phone: string;
    qualification: string;
    institution: string;
    createdAt: Date;
    updatedAt: Date;
}

// Extended WebinarRegistration with webinar details
export interface WebinarRegistrationWithDetails extends WebinarRegistration {
    webinar?: {
        id: string;
        title: string;
        date: string;
    };
}
