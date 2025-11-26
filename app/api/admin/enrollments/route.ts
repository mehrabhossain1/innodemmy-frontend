import { NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/utils/auth-middleware';
import { listAllEnrollments } from '@/lib/services/enrollments';
import { findUserById } from '@/lib/db/users';
import { findCourseById } from '@/lib/db/courses';

export const GET = withAdminAuth(async () => {
  try {
    // Get all enrollments
    const enrollments = await listAllEnrollments();

    // Populate user and course information
    const enrollmentsWithDetails = await Promise.all(
      enrollments.map(async (enrollment) => {
        // For public enrollments, userId might not exist
        const user = enrollment.userId ? await findUserById(enrollment.userId) : null;
        // For public enrollments, courseId might be null or string
        const course = enrollment.courseId ? await findCourseById(enrollment.courseId) : null;

        return {
          ...enrollment,
          user: user
            ? { _id: user._id, name: user.name, email: user.email }
            : null,
          course: course
            ? { _id: course._id, title: course.title, price: course.price }
            : null,
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
