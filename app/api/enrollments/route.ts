import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/src/core/infrastructure/middleware/AuthMiddleware';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { getDatabase } from '@/src/core/infrastructure/database/MongoDBConnection';
import { ObjectId } from 'mongodb';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user!;
    
    // Use clean architecture - Get Enrollments Use Case
    const getEnrollmentsUseCase = UseCaseFactory.createGetEnrollmentsUseCase();
    const enrollments = await getEnrollmentsUseCase.execute(user.userId);

    // Convert to legacy format for backward compatibility
    const enrollmentsResponse = LegacyModelAdapter.enrollmentsToLegacy(enrollments);

    // Populate course information for each enrollment (maintain existing functionality)
    const db = await getDatabase();
    const courses = db.collection('courses');

    const enrollmentsWithCourses = await Promise.all(
      enrollmentsResponse.map(async (enrollment) => {
        const course = await courses.findOne({ _id: new ObjectId(enrollment.courseId) });
        return {
          ...enrollment,
          course: course || null,
        };
      })
    );

    return NextResponse.json({ enrollments: enrollmentsWithCourses });
  } catch (error) {
    console.error('Get enrollments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user!;
    const { courseId, paymentProof, paymentAmount, paymentMethod, transactionId } = await request.json();

    if (!courseId || !paymentProof || !paymentAmount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use clean architecture - Create Enrollment Use Case
    const createEnrollmentUseCase = UseCaseFactory.createCreateEnrollmentUseCase();
    const enrollment = await createEnrollmentUseCase.execute({
      userId: user.userId,
      courseId,
      paymentProof,
      paymentAmount,
      paymentMethod,
      transactionId
    });

    // Convert to legacy format for backward compatibility
    const enrollmentResponse = LegacyModelAdapter.enrollmentToLegacy(enrollment);

    return NextResponse.json({ enrollment: enrollmentResponse });
  } catch (error) {
    console.error('Create enrollment error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message.includes('already enrolled')) {
      return NextResponse.json(
        { error: 'You already have an enrollment request for this course' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
