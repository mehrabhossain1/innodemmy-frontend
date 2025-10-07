/**
 * Get Enrollments Use Case - Application Layer
 * Retrieves enrollments from the system
 */
import { IEnrollmentRepository } from '@/src/core/domain/repositories/IEnrollmentRepository';
import { EnrollmentResponseDTO } from '../../dtos/EnrollmentDTO';

export class GetEnrollmentsUseCase {
  constructor(private readonly enrollmentRepository: IEnrollmentRepository) {}

  async execute(userId?: string): Promise<EnrollmentResponseDTO[]> {
    const enrollments = userId
      ? await this.enrollmentRepository.findByUserId(userId)
      : await this.enrollmentRepository.findAll();

    return enrollments.map(enrollment => ({
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      paymentAmount: enrollment.paymentAmount,
      paymentMethod: enrollment.paymentMethod,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt,
      paymentProof: enrollment.paymentProof,
      transactionId: enrollment.transactionId,
      adminNotes: enrollment.adminNotes,
      enrolledAt: enrollment.enrolledAt,
      approvedAt: enrollment.approvedAt,
      approvedBy: enrollment.approvedBy
    }));
  }
}
