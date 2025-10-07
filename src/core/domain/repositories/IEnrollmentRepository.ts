/**
 * Enrollment Repository Interface - Domain Layer
 * Defines the contract for enrollment data access
 */
import { Enrollment, EnrollmentStatus } from '../entities/Enrollment';

export interface EnrollmentCreateData {
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  paymentAmount: number;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  paymentProof?: string;
  transactionId?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface EnrollmentUpdateData {
  userId?: string;
  courseId?: string;
  status?: EnrollmentStatus;
  paymentAmount?: number;
  paymentMethod?: string;
  updatedAt?: Date;
  paymentProof?: string;
  transactionId?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface IEnrollmentRepository {
  findById(id: string): Promise<Enrollment | null>;
  findAll(): Promise<Enrollment[]>;
  findByUserId(userId: string): Promise<Enrollment[]>;
  findByCourseId(courseId: string): Promise<Enrollment[]>;
  findByStatus(status: EnrollmentStatus): Promise<Enrollment[]>;
  create(enrollment: EnrollmentCreateData): Promise<Enrollment>;
  update(id: string, enrollment: EnrollmentUpdateData): Promise<Enrollment>;
  delete(id: string): Promise<boolean>;
  existsForUserAndCourse(userId: string, courseId: string): Promise<boolean>;
}

