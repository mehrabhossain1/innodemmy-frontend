/**
 * Course Repository Interface - Domain Layer
 * Defines the contract for course data access
 */
import { Course } from '../entities/Course';

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findActive(): Promise<Course[]>;
  findByCategory(category: string): Promise<Course[]>;
  create(course: Omit<Course, 'id'>): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<boolean>;
  activate(id: string): Promise<Course>;
  deactivate(id: string): Promise<Course>;
}

