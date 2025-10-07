/**
 * Legacy Model Adapter - Infrastructure Layer
 * Converts between clean architecture entities/DTOs and legacy models
 * This ensures backward compatibility with existing frontend code
 */
import { User as LegacyUser, Course as LegacyCourse, Enrollment as LegacyEnrollment } from '@/lib/models';
import { UserResponseDTO } from '@/src/core/application/dtos/UserDTO';
import { CourseResponseDTO } from '@/src/core/application/dtos/CourseDTO';
import { EnrollmentResponseDTO } from '@/src/core/application/dtos/EnrollmentDTO';

/**
 * Adapters for converting DTOs to legacy models for API responses
 */
export class LegacyModelAdapter {
  /**
   * Convert UserResponseDTO to legacy User format
   */
  static userToLegacy(dto: UserResponseDTO): Omit<LegacyUser, 'password'> {
    return {
      _id: dto.id,
      email: dto.email,
      name: dto.name,
      role: dto.role,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    };
  }

  /**
   * Convert array of UserResponseDTO to legacy format
   */
  static usersToLegacy(dtos: UserResponseDTO[]): Omit<LegacyUser, 'password'>[] {
    return dtos.map(dto => this.userToLegacy(dto));
  }

  /**
   * Convert CourseResponseDTO to legacy Course format
   */
  static courseToLegacy(dto: CourseResponseDTO): LegacyCourse {
    return {
      _id: dto.id,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      instructor: dto.instructor,
      duration: dto.duration,
      level: dto.level,
      category: dto.category,
      modules: dto.modules,
      isActive: dto.isActive,
      thumbnail: dto.thumbnail,
      createdAt: dto.createdAt!,
      updatedAt: dto.updatedAt!
    };
  }

  /**
   * Convert array of CourseResponseDTO to legacy format
   */
  static coursesToLegacy(dtos: CourseResponseDTO[]): LegacyCourse[] {
    return dtos.map(dto => this.courseToLegacy(dto));
  }

  /**
   * Convert EnrollmentResponseDTO to legacy Enrollment format
   */
  static enrollmentToLegacy(dto: EnrollmentResponseDTO): LegacyEnrollment {
    return {
      _id: dto.id,
      userId: dto.userId,
      courseId: dto.courseId,
      status: dto.status,
      paymentAmount: dto.paymentAmount,
      paymentMethod: dto.paymentMethod,
      paymentProof: dto.paymentProof,
      transactionId: dto.transactionId,
      adminNotes: dto.adminNotes,
      enrolledAt: dto.enrolledAt,
      approvedAt: dto.approvedAt,
      approvedBy: dto.approvedBy,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    };
  }

  /**
   * Convert array of EnrollmentResponseDTO to legacy format
   */
  static enrollmentsToLegacy(dtos: EnrollmentResponseDTO[]): LegacyEnrollment[] {
    return dtos.map(dto => this.enrollmentToLegacy(dto));
  }
}
