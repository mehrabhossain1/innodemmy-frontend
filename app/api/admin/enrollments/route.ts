import { NextResponse } from 'next/server';
import { withAdminAuth } from '@/src/core/infrastructure/middleware/AuthMiddleware';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { getDatabase } from '@/src/core/infrastructure/database/MongoDBConnection';
import { ObjectId } from 'mongodb';

export const GET = withAdminAuth(async () => {
  try {
    // Use clean architecture - Get Enrollments Use Case
    const getEnrollmentsUseCase = UseCaseFactory.createGetEnrollmentsUseCase();
    const enrollments = await getEnrollmentsUseCase.execute(); // Get all enrollments

    // Convert to legacy format for backward compatibility
    const enrollmentsResponse = LegacyModelAdapter.enrollmentsToLegacy(enrollments);

    // Populate user and course information (maintain existing functionality)
    const db = await getDatabase();
    const users = db.collection('users');
    const courses = db.collection('courses');

    const enrollmentsWithDetails = await Promise.all(
      enrollmentsResponse.map(async (enrollment) => {
        const user = await users.findOne({ _id: new ObjectId(enrollment.userId) });
        const course = await courses.findOne({ _id: new ObjectId(enrollment.courseId) });
        
        return {
          ...enrollment,
          user: user ? { _id: user._id, name: user.name, email: user.email } : null,
          course: course ? { _id: course._id, title: course.title, price: course.price } : null,
        };
      })
    );

    return NextResponse.json({ enrollments: enrollmentsWithDetails });
  } catch (error) {
    console.error('Get enrollments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
