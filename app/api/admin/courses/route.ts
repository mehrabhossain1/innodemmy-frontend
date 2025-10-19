import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/utils/auth-middleware';
import { listAllCourses, createNewCourse } from '@/lib/services/courses';

export const GET = withAdminAuth(async () => {
  try {
    // Get all courses (including inactive ones for admin)
    const courses = await listAllCourses(false);

    return NextResponse.json({ courses });
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

    // Create course (validation happens in service)
    const course = await createNewCourse({
      ...courseData,
      modules: courseData.modules || [],
      isActive: courseData.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Create course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
});
