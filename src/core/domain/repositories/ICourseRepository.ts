/**
 * Course Repository Interface - Domain Layer
 * Defines the contract for course data access
 */
import { Course, CourseLevel, CourseModule } from '../entities/Course';

export interface CourseCreateData {
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: CourseLevel;
  category: string;
  modules: CourseModule[];
  isActive: boolean;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseUpdateData {
  title?: string;
  description?: string;
  price?: number;
  instructor?: string;
  duration?: string;
  level?: CourseLevel;
  category?: string;
  modules?: CourseModule[];
  isActive?: boolean;
  thumbnail?: string;
  updatedAt?: Date;
}

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findActive(): Promise<Course[]>;
  findByCategory(category: string): Promise<Course[]>;
  create(course: CourseCreateData): Promise<Course>;
  update(id: string, course: CourseUpdateData): Promise<Course>;
  delete(id: string): Promise<boolean>;
  activate(id: string): Promise<Course>;
  deactivate(id: string): Promise<Course>;
}

