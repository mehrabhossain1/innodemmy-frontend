import { NextResponse } from 'next/server';
import { withAdminAuth, AuthenticatedRequest } from '@/lib/utils/auth-middleware';
import { approveEnrollment, rejectEnrollment } from '@/lib/services/enrollments';
import { ObjectId } from 'mongodb';

export const PUT = withAdminAuth<{ params: Promise<{ id: string }> }>(
  async (request: AuthenticatedRequest, { params }) => {
    try {
      const { id } = await params;
      const { status, adminNotes } = await request.json();
      const adminUser = request.user!;

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

      // Approve or reject enrollment based on status
      let enrollment;
      if (status === 'approved') {
        enrollment = await approveEnrollment(id, adminUser.userId, adminNotes);
      } else if (status === 'rejected') {
        enrollment = await rejectEnrollment(id, adminUser.userId, adminNotes);
      } else {
        // For pending status or other cases
        return NextResponse.json(
          { error: 'Invalid status update' },
          { status: 400 }
        );
      }

      return NextResponse.json({ enrollment });
    } catch (error) {
      console.error('Update enrollment error:', error);

      if (error instanceof Error && error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Enrollment not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
);
