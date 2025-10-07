/**
 * Course DTOs (Data Transfer Objects) - Application Layer
 */
import { CourseLevel, CourseModule } from '@/src/core/domain/entities/Course';

export interface CreateCourseDTO {
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: CourseLevel;
  category: string;
  thumbnail?: string;
  modules?: CourseModule[];
}

export interface UpdateCourseDTO {
  title?: string;
  description?: string;
  price?: number;
  instructor?: string;
  duration?: string;
  level?: CourseLevel;
  category?: string;
  thumbnail?: string;
  modules?: CourseModule[];
  isActive?: boolean;
}

export interface CourseResponseDTO {
  id: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
