import { NextResponse } from 'next/server';
import { getCourseById, updateCourseById, deleteCourseById } from '@/lib/services/courses';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    const course = await getCourseById(id);

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const status = error instanceof Error && error.message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: errorMessage },
      { status }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    const course = await updateCourseById(id, body);

    return NextResponse.json({ course });
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
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    await deleteCourseById(id);

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
