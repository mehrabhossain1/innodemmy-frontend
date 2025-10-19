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
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from '../db/enrollments';
import { findCourseById } from '../db/courses';

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
  status: 'pending' | 'approved' | 'rejected'
) {
  return getEnrollmentsByStatus(status);
}

/**
 * Get enrollment by ID
 */
export async function getEnrollmentById(id: string) {
  const enrollment = await findEnrollmentById(id);
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  return enrollment;
}

/**
 * Create a new enrollment
 */
export async function createNewEnrollment(data: {
  userId: string;
  courseId: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentProof?: string;
  transactionId?: string;
}) {
  // Validate input
  if (!data.userId || !data.courseId) {
    throw new Error('User ID and Course ID are required');
  }

  if (data.paymentAmount <= 0) {
    throw new Error('Payment amount must be greater than 0');
  }

  // Check if course exists
  const course = await findCourseById(data.courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Check if user already enrolled
  const exists = await enrollmentExists(data.userId, data.courseId);
  if (exists) {
    throw new Error('User already enrolled in this course');
  }

  // Create enrollment
  return createEnrollment({
    userId: data.userId,
    courseId: data.courseId,
    status: 'pending',
    paymentAmount: data.paymentAmount,
    paymentMethod: data.paymentMethod,
    paymentProof: data.paymentProof,
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
    throw new Error('Enrollment not found');
  }

  // Update to approved status
  return updateEnrollment(enrollmentId, {
    status: 'approved',
    adminNotes: notes,
    approvedAt: new Date(),
    approvedBy: adminId,
    enrolledAt: new Date(),
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
    throw new Error('Enrollment not found');
  }

  // Update to rejected status
  return updateEnrollment(enrollmentId, {
    status: 'rejected',
    adminNotes: notes,
    approvedBy: adminId,
  });
}

/**
 * Delete an enrollment
 */
export async function deleteEnrollmentById(id: string) {
  const deleted = await deleteEnrollment(id);
  if (!deleted) {
    throw new Error('Enrollment not found');
  }
  return deleted;
}
