/**
 * Enrollment Repository Interface - Domain Layer
 * Defines the contract for enrollment data access
 */
import { Enrollment, EnrollmentStatus } from '../entities/Enrollment';

export interface IEnrollmentRepository {
  findById(id: string): Promise<Enrollment | null>;
  findAll(): Promise<Enrollment[]>;
  findByUserId(userId: string): Promise<Enrollment[]>;
  findByCourseId(courseId: string): Promise<Enrollment[]>;
  findByStatus(status: EnrollmentStatus): Promise<Enrollment[]>;
  create(enrollment: Omit<Enrollment, 'id'>): Promise<Enrollment>;
  update(id: string, enrollment: Partial<Enrollment>): Promise<Enrollment>;
  delete(id: string): Promise<boolean>;
  existsForUserAndCourse(userId: string, courseId: string): Promise<boolean>;
}

