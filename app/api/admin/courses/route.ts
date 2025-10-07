import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/src/core/infrastructure/middleware/AuthMiddleware';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { CourseLevel } from '@/src/core/domain/entities/Course';

export const GET = withAdminAuth(async () => {
  try {
    // Use clean architecture - Get All Courses Use Case
    const getAllCoursesUseCase = UseCaseFactory.createGetAllCoursesUseCase();
    const courses = await getAllCoursesUseCase.execute(false); // false = include inactive

    // Convert to legacy format for backward compatibility
    const coursesResponse = LegacyModelAdapter.coursesToLegacy(courses);

    return NextResponse.json({ courses: coursesResponse });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const courseData = await request.json();

    const {
      title,
      description,
      price,
      instructor,
      duration,
      level,
      category,
      thumbnail,
      modules
    } = courseData;

    if (!title || !description || !price || !instructor || !duration || !level || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid level. Must be beginner, intermediate, or advanced' },
        { status: 400 }
      );
    }

    // Use clean architecture - Create Course Use Case
    const createCourseUseCase = UseCaseFactory.createCreateCourseUseCase();
    const course = await createCourseUseCase.execute({
      title,
      description,
      price,
      instructor,
      duration,
      level: level as CourseLevel,
      category,
      thumbnail,
      modules: modules || []
    });

    // Convert to legacy format for backward compatibility
    const courseResponse = LegacyModelAdapter.courseToLegacy(course);

    return NextResponse.json({ course: courseResponse });
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
