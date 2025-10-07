/**
 * Create Enrollment Use Case - Application Layer
 * Handles enrollment creation logic
 */
import { IEnrollmentRepository } from '@/src/core/domain/repositories/IEnrollmentRepository';
import { ICourseRepository } from '@/src/core/domain/repositories/ICourseRepository';
import { CreateEnrollmentDTO, EnrollmentResponseDTO } from '../../dtos/EnrollmentDTO';
import { EnrollmentStatus } from '@/src/core/domain/entities/Enrollment';

export class CreateEnrollmentUseCase {
  constructor(
    private readonly enrollmentRepository: IEnrollmentRepository,
    private readonly courseRepository: ICourseRepository
  ) {}

  async execute(enrollmentData: CreateEnrollmentDTO): Promise<EnrollmentResponseDTO> {
    // Validate input
    if (!enrollmentData.userId || !enrollmentData.courseId) {
      throw new Error('User ID and Course ID are required');
    }

    if (enrollmentData.paymentAmount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }

    // Check if course exists
    const course = await this.courseRepository.findById(enrollmentData.courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // Check if user already enrolled
    const existingEnrollment = await this.enrollmentRepository.existsForUserAndCourse(
      enrollmentData.userId,
      enrollmentData.courseId
    );

    if (existingEnrollment) {
      throw new Error('User already enrolled in this course');
    }

    // Create enrollment
    const enrollment = await this.enrollmentRepository.create({
      ...enrollmentData,
      status: EnrollmentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any);

    // Map to response DTO
    return {
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
    };
  }
}
