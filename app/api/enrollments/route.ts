import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/utils/auth-middleware';
import { listEnrollmentsByUser, createNewEnrollment } from '@/lib/services/enrollments';
import { findCourseById } from '@/lib/db/courses';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user!;

    // Get user's enrollments
    const enrollments = await listEnrollmentsByUser(user.userId);

    // Populate course information for each enrollment
    const enrollmentsWithCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await findCourseById(enrollment.courseId);
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
    const {
      courseId,
      paymentProof,
      paymentAmount,
      paymentMethod,
      transactionId,
    } = await request.json();

    if (!courseId || !paymentProof || !paymentAmount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = await createNewEnrollment({
      userId: user.userId,
      courseId,
      paymentProof,
      paymentAmount,
      paymentMethod,
      transactionId,
    });

    return NextResponse.json({ enrollment });
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
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
