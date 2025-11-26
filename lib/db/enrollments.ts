/**
 * Enrollment database operations
 */
import { ObjectId } from "mongodb";
import { getDatabase } from "./connection";
import { Enrollment } from "../models";

type EnrollmentDocument = Omit<Enrollment, "_id"> & { _id?: ObjectId };

/**
 * Get the enrollments collection
 */
async function getEnrollmentsCollection() {
    const db = await getDatabase();
    return db.collection<EnrollmentDocument>("enrollments");
}

/**
 * Find enrollment by ID
 */
export async function findEnrollmentById(id: string) {
    const collection = await getEnrollmentsCollection();
    const enrollment = await collection.findOne({ _id: new ObjectId(id) });
    return enrollment;
}

/**
 * Get all enrollments
 */
export async function getAllEnrollments() {
    const collection = await getEnrollmentsCollection();
    const enrollments = await collection.find({}).toArray();
    return enrollments;
}

/**
 * Get enrollments by user ID
 */
export async function getEnrollmentsByUserId(userId: string) {
    const collection = await getEnrollmentsCollection();
    const enrollments = await collection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
    return enrollments;
}

/**
 * Get enrollments by course ID
 */
export async function getEnrollmentsByCourseId(courseId: string) {
    const collection = await getEnrollmentsCollection();
    const enrollments = await collection
        .find({ courseId })
        .sort({ createdAt: -1 })
        .toArray();
    return enrollments;
}

/**
 * Get enrollment count by course ID and status
 */
export async function getEnrollmentCountByCourse(
    courseId: string,
    status?: "pending" | "approved" | "rejected"
) {
    const collection = await getEnrollmentsCollection();
    const filter: Record<string, string> = { courseId };
    if (status) {
        filter.status = status;
    }
    const count = await collection.countDocuments(filter);
    return count;
}

/**
 * Get enrollments by status
 */
export async function getEnrollmentsByStatus(
    status: "pending" | "approved" | "rejected"
) {
    const collection = await getEnrollmentsCollection();
    const enrollments = await collection
        .find({ status })
        .sort({ createdAt: -1 })
        .toArray();
    return enrollments;
}

/**
 * Check if enrollment exists for user and course
 */
export async function enrollmentExists(userId: string, courseId: string) {
    const collection = await getEnrollmentsCollection();
    const enrollment = await collection.findOne({ userId, courseId });
    return enrollment;
}

/**
 * Check if user has approved enrollment for course
 */
export async function hasApprovedEnrollment(userId: string, courseId: string) {
    const collection = await getEnrollmentsCollection();
    const count = await collection.countDocuments({
        userId,
        courseId,
        status: "approved",
    });
    return count > 0;
}

/**
 * Create a new enrollment
 */
export async function createEnrollment(
    enrollmentData: Omit<Enrollment, "_id">
) {
    const collection = await getEnrollmentsCollection();
    const result = await collection.insertOne({
        ...enrollmentData,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const enrollment = await collection.findOne({ _id: result.insertedId });
    return enrollment;
}

/**
 * Update an enrollment
 */
export async function updateEnrollment(
    id: string,
    enrollmentData: Partial<Omit<Enrollment, "_id">>
) {
    const collection = await getEnrollmentsCollection();
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...enrollmentData, updatedAt: new Date() } }
    );

    const enrollment = await collection.findOne({ _id: new ObjectId(id) });
    return enrollment;
}

/**
 * Delete an enrollment
 */
export async function deleteEnrollment(id: string) {
    const collection = await getEnrollmentsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}
