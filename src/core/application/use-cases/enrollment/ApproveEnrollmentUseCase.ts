/**
 * Approve Enrollment Use Case - Application Layer
 * Handles enrollment approval logic
 */
import { IEnrollmentRepository } from '@/src/core/domain/repositories/IEnrollmentRepository';
import { ApproveEnrollmentDTO, EnrollmentResponseDTO } from '../../dtos/EnrollmentDTO';

export class ApproveEnrollmentUseCase {
  constructor(private readonly enrollmentRepository: IEnrollmentRepository) {}

  async execute(enrollmentId: string, approvalData: ApproveEnrollmentDTO): Promise<EnrollmentResponseDTO> {
    // Find enrollment
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    // Approve enrollment using domain logic
    const approvedEnrollment = enrollment.approve(approvalData.adminId, approvalData.notes);

    // Save to repository
    const updatedEnrollment = await this.enrollmentRepository.update(enrollmentId, {
      status: approvedEnrollment.status,
      approvedAt: approvedEnrollment.approvedAt,
      approvedBy: approvedEnrollment.approvedBy,
      adminNotes: approvedEnrollment.adminNotes
    } as any);

    // Map to response DTO
    return {
      id: updatedEnrollment.id,
      userId: updatedEnrollment.userId,
      courseId: updatedEnrollment.courseId,
      status: updatedEnrollment.status,
      paymentAmount: updatedEnrollment.paymentAmount,
      paymentMethod: updatedEnrollment.paymentMethod,
      createdAt: updatedEnrollment.createdAt,
      updatedAt: updatedEnrollment.updatedAt,
      paymentProof: updatedEnrollment.paymentProof,
      transactionId: updatedEnrollment.transactionId,
      adminNotes: updatedEnrollment.adminNotes,
      enrolledAt: updatedEnrollment.enrolledAt,
      approvedAt: updatedEnrollment.approvedAt,
      approvedBy: updatedEnrollment.approvedBy
    };
  }
}
