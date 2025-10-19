import { NextResponse } from 'next/server';
import { listAllCourses, createNewCourse } from '@/lib/services/courses';

export async function GET() {
  try {
    // Get all active courses
    const courses = await listAllCourses(true); // true = active only

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create course
    const course = await createNewCourse({
      title: body.title,
      description: body.description,
      shortDescription: body.shortDescription,
      price: body.price,
      instructor: body.instructor,
      duration: body.duration,
      level: body.level,
      category: body.category,
      modules: body.modules || [],
      isActive: body.isActive ?? true,
      thumbnail: body.thumbnail,
      batchName: body.batchName,
      rating: body.rating,
      totalReviews: body.totalReviews,
      isLive: body.isLive,
      totalJoined: body.totalJoined,
      totalProjects: body.totalProjects,
      totalAssignments: body.totalAssignments,
      benefits: body.benefits,
      tools: body.tools,
      projects: body.projects,
      targetAudience: body.targetAudience,
      requirements: body.requirements,
      instructors: body.instructors,
      faqs: body.faqs,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('Create course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
