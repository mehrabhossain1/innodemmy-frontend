/**
 * Create Course Use Case - Application Layer
 * Handles course creation logic
 */
import { ICourseRepository } from '@/src/core/domain/repositories/ICourseRepository';
import { CreateCourseDTO, CourseResponseDTO } from '../../dtos/CourseDTO';

export class CreateCourseUseCase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(courseData: CreateCourseDTO): Promise<CourseResponseDTO> {
    // Validate input
    if (!courseData.title || !courseData.description || !courseData.instructor) {
      throw new Error('Title, description, and instructor are required');
    }

    if (courseData.price < 0) {
      throw new Error('Price must be a positive number');
    }

    // Create course
    const course = await this.courseRepository.create({
      ...courseData,
      modules: courseData.modules || [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any);

    // Map to response DTO
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      category: course.category,
      modules: course.modules,
      isActive: course.isActive,
      thumbnail: course.thumbnail,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    };
  }
}
