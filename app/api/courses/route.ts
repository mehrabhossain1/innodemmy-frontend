import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Course } from '@/lib/models';

export async function GET(_request: NextRequest) {
  try {
    const db = await getDatabase();
    const courses = db.collection<Course>('courses');

    const allCourses = await courses.find({ isActive: true }).toArray();

    return NextResponse.json({ courses: allCourses });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
