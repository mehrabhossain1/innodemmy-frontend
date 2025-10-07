/**
 * Get All Courses Use Case - Application Layer
 * Retrieves courses from the system
 */
import { ICourseRepository } from '@/src/core/domain/repositories/ICourseRepository';
import { CourseResponseDTO } from '../../dtos/CourseDTO';

export class GetAllCoursesUseCase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(activeOnly: boolean = false): Promise<CourseResponseDTO[]> {
    const courses = activeOnly 
      ? await this.courseRepository.findActive()
      : await this.courseRepository.findAll();

    return courses.map(course => ({
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
    }));
  }
}
