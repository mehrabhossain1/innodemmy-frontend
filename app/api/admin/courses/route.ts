import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { Course } from '@/lib/models';

export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const db = await getDatabase();
    const courses = db.collection<Course>('courses');

    const allCourses = await courses.find({}).toArray();

    return NextResponse.json({ courses: allCourses });
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

    const db = await getDatabase();
    const courses = db.collection<Course>('courses');

    const newCourse: Omit<Course, '_id'> = {
      title,
      description,
      price,
      instructor,
      duration,
      level: level as 'beginner' | 'intermediate' | 'advanced',
      category,
      thumbnail,
      modules: modules || [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await courses.insertOne(newCourse);
    const course = await courses.findOne({ _id: result.insertedId });

    if (!course) {
      return NextResponse.json(
        { error: 'Failed to create course' },
        { status: 500 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
