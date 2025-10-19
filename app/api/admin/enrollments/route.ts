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
        const user = await findUserById(enrollment.userId);
        const course = await findCourseById(enrollment.courseId);

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
