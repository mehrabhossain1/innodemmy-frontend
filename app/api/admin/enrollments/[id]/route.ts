import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { Enrollment } from '@/lib/models';
import { ObjectId } from 'mongodb';

export const PUT = withAdminAuth(async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split('/').pop() as string;
    const { status, adminNotes } = await request.json();
    const adminUser = (request as unknown as { user: { userId: string } }).user;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (pending, approved, rejected)' },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid enrollment ID format' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const enrollments = db.collection('enrollments');

    const updateData: Partial<Enrollment & { approvedAt: Date; approvedBy: string; enrolledAt: Date; adminNotes: string }> = {
      status,
      updatedAt: new Date(),
    } as Partial<Enrollment & { approvedAt: Date; approvedBy: string; enrolledAt: Date; adminNotes: string }>;

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    if (status === 'approved') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = adminUser.userId;
      updateData.enrolledAt = new Date();
    }

    const result = await enrollments.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const updatedEnrollment = await enrollments.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    console.error('Update enrollment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
