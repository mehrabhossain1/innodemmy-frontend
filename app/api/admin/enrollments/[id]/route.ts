import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { Enrollment } from '@/lib/models';

export const PUT = withAdminAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { status, adminNotes } = await request.json();
    const adminUser = (request as any).user;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (pending, approved, rejected)' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const enrollments = db.collection<Enrollment>('enrollments');

    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    if (status === 'approved') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = adminUser.userId;
      updateData.enrolledAt = new Date();
    }

    const result = await enrollments.updateOne(
      { _id: id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const updatedEnrollment = await enrollments.findOne({ _id: id });

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
