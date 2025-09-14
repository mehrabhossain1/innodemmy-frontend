import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAuth } from '@/lib/middleware';
import { Enrollment } from '@/lib/models';
import { ObjectId } from 'mongodb';

export const GET = withAuth(async (request: NextRequest) => {
  try {
    const user = (request as unknown as { user: { userId: string } }).user;
    const db = await getDatabase();
    const enrollments = db.collection<Enrollment>('enrollments');
    const courses = db.collection('courses');

    const userEnrollments = await enrollments
      .find({ userId: user.userId })
      .toArray();

    // Populate course information for each enrollment
    const enrollmentsWithCourses = await Promise.all(
      userEnrollments.map(async (enrollment) => {
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

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const user = (request as unknown as { user: { userId: string } }).user;
    const { courseId, paymentProof, paymentAmount, paymentMethod, transactionId } = await request.json();

    if (!courseId || !paymentProof || !paymentAmount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const enrollments = db.collection<Enrollment>('enrollments');

    // Check if user already has a pending or approved enrollment for this course
    const existingEnrollment = await enrollments.findOne({
      userId: user.userId,
      courseId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'You already have an enrollment request for this course' },
        { status: 400 }
      );
    }

    const newEnrollment: Omit<Enrollment, '_id'> = {
      userId: user.userId,
      courseId,
      status: 'pending',
      paymentProof,
      paymentAmount,
      paymentMethod,
      transactionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await enrollments.insertOne(newEnrollment);
    const enrollment = await enrollments.findOne({ _id: result.insertedId });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Failed to create enrollment request' },
        { status: 500 }
      );
    }

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error('Create enrollment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
