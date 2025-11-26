/**
 * Enrollment management service
 * Handles enrollment CRUD and approval operations
 */
import {
    getAllEnrollments,
    getEnrollmentsByUserId,
    getEnrollmentsByCourseId,
    getEnrollmentsByStatus,
    findEnrollmentById,
    enrollmentExists,
    hasApprovedEnrollment,
    getEnrollmentCountByCourse,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
} from "../db/enrollments";
import { findCourseById } from "../db/courses";

/**
 * Get all enrollments
 */
export async function listAllEnrollments() {
    return getAllEnrollments();
}

/**
 * Get enrollments by user ID
 */
export async function listEnrollmentsByUser(userId: string) {
    return getEnrollmentsByUserId(userId);
}

/**
 * Get enrollments by course ID
 */
export async function listEnrollmentsByCourse(courseId: string) {
    return getEnrollmentsByCourseId(courseId);
}

/**
 * Get enrollments by status
 */
export async function listEnrollmentsByStatus(
    status: "pending" | "approved" | "rejected"
) {
    return getEnrollmentsByStatus(status);
}

/**
 * Get enrollment by ID
 */
export async function getEnrollmentById(id: string) {
    const enrollment = await findEnrollmentById(id);
    if (!enrollment) {
        throw new Error("Enrollment not found");
    }
    return enrollment;
}

/**
 * Create a new enrollment
 */
export async function createNewEnrollment(data: {
    userId: string;
    courseId: string;
    amount: number;
    paymentMethod: "bkash" | "nagad";
    transactionId: string;
}) {
    // Validate input
    if (!data.userId || !data.courseId) {
        throw new Error("User ID and Course ID are required");
    }

    if (!data.transactionId || data.transactionId.trim() === "") {
        throw new Error("Transaction ID is required");
    }

    if (data.amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    // Check if course exists
    const course = await findCourseById(data.courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    // Check if user already has enrollment (any status)
    const existingEnrollment = await enrollmentExists(
        data.userId,
        data.courseId
    );
    if (existingEnrollment) {
        if (existingEnrollment.status === "pending") {
            throw new Error(
                "You already have a pending enrollment request for this course"
            );
        } else if (existingEnrollment.status === "approved") {
            throw new Error("You are already enrolled in this course");
        } else if (existingEnrollment.status === "rejected") {
            throw new Error(
                "Your previous enrollment was rejected. Please contact support."
            );
        }
    }

    // Create enrollment with pending status
    return createEnrollment({
        userId: data.userId,
        courseId: data.courseId,
        status: "pending",
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

/**
 * Approve an enrollment
 */
export async function approveEnrollment(
    enrollmentId: string,
    adminId: string,
    notes?: string
) {
    // Find enrollment
    const enrollment = await findEnrollmentById(enrollmentId);
    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    if (enrollment.status === "approved") {
        throw new Error("Enrollment already approved");
    }

    // Update to approved status
    return updateEnrollment(enrollmentId, {
        status: "approved",
        adminNotes: notes,
        approvedAt: new Date(),
        approvedBy: adminId,
    });
}

/**
 * Reject an enrollment
 */
export async function rejectEnrollment(
    enrollmentId: string,
    adminId: string,
    notes?: string
) {
    // Find enrollment
    const enrollment = await findEnrollmentById(enrollmentId);
    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    if (enrollment.status === "rejected") {
        throw new Error("Enrollment already rejected");
    }

    // Update to rejected status
    return updateEnrollment(enrollmentId, {
        status: "rejected",
        adminNotes: notes,
        rejectedAt: new Date(),
        approvedBy: adminId, // Track who rejected it
    });
}

/**
 * Check if user has access to course
 */
export async function userHasAccess(userId: string, courseId: string) {
    return hasApprovedEnrollment(userId, courseId);
}

/**
 * Get enrollment statistics for a course
 */
export async function getCourseEnrollmentStats(courseId: string) {
    const [total, pending, approved, rejected] = await Promise.all([
        getEnrollmentCountByCourse(courseId),
        getEnrollmentCountByCourse(courseId, "pending"),
        getEnrollmentCountByCourse(courseId, "approved"),
        getEnrollmentCountByCourse(courseId, "rejected"),
    ]);

    return { total, pending, approved, rejected };
}

/**
 * Delete an enrollment
 */
export async function deleteEnrollmentById(id: string) {
    const deleted = await deleteEnrollment(id);
    if (!deleted) {
        throw new Error("Enrollment not found");
    }
    return deleted;
}
