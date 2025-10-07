import { NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';

export async function GET() {
  try {
    // Use clean architecture - Get All Courses Use Case
    const getAllCoursesUseCase = UseCaseFactory.createGetAllCoursesUseCase();
    const courses = await getAllCoursesUseCase.execute(true); // true = active only

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
}
