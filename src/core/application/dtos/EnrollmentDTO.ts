/**
 * Enrollment DTOs (Data Transfer Objects) - Application Layer
 */
import { EnrollmentStatus } from '@/src/core/domain/entities/Enrollment';

export interface CreateEnrollmentDTO {
  userId: string;
  courseId: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentProof?: string;
  transactionId?: string;
}

export interface UpdateEnrollmentDTO {
  status?: EnrollmentStatus;
  adminNotes?: string;
  approvedBy?: string;
}

export interface EnrollmentResponseDTO {
  id: string;
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

export interface ApproveEnrollmentDTO {
  adminId: string;
  notes?: string;
}

export interface RejectEnrollmentDTO {
  adminId: string;
  notes?: string;
}
