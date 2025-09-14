import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { ObjectId } from 'mongodb';

export const GET = withAdminAuth(async () => {
  try {
    const db = await getDatabase();
    const enrollments = db.collection('enrollments');
    const users = db.collection('users');
    const courses = db.collection('courses');

    const allEnrollments = await enrollments.find({}).toArray();

    // Populate user and course information
    const enrollmentsWithDetails = await Promise.all(
      allEnrollments.map(async (enrollment) => {
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
