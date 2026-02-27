import { NextResponse } from 'next/server';
import { getCourseById } from '@/lib/data/courses';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get course from hardcoded data
    const course = getCourseById(id);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  _request: Request,
  { params: _params }: { params: Promise<{ id: string }> }
) {
  try {
    // PUT endpoint disabled for hardcoded data
    // To update courses, edit lib/data/courses.ts directly
    return NextResponse.json(
      { error: 'Course updates are currently disabled. Courses are managed via hardcoded data.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Update course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params: _params }: { params: Promise<{ id: string }> }
) {
  try {
    // DELETE endpoint disabled for hardcoded data
    // To remove courses, edit lib/data/courses.ts directly
    return NextResponse.json(
      { error: 'Course deletion is currently disabled. Courses are managed via hardcoded data.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Delete course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
