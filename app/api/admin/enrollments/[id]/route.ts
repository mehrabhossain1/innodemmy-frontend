import { NextResponse } from 'next/server';
import { withAdminAuth, AuthenticatedRequest } from '@/src/core/infrastructure/middleware/AuthMiddleware';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { ObjectId } from 'mongodb';

export const PUT = withAdminAuth(async (request: AuthenticatedRequest) => {
  try {
    const id = request.nextUrl.pathname.split('/').pop() as string;
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

    // Use clean architecture - Approve Enrollment Use Case
    if (status === 'approved') {
      const approveEnrollmentUseCase = UseCaseFactory.createApproveEnrollmentUseCase();
      const enrollment = await approveEnrollmentUseCase.execute(id, {
        adminId: adminUser.userId,
        notes: adminNotes
      });

      // Convert to legacy format for backward compatibility
      const enrollmentResponse = LegacyModelAdapter.enrollmentToLegacy(enrollment);
      return NextResponse.json({ enrollment: enrollmentResponse });
    }

    // For rejected status, we can extend the use case or use repository directly
    // For now, keeping the direct database approach for rejected status
    const { getDatabase } = await import('@/src/core/infrastructure/database/MongoDBConnection');
    const db = await getDatabase();
    const enrollments = db.collection('enrollments');

    const updateData: { status: string; updatedAt: Date; adminNotes?: string; approvedAt?: Date; approvedBy?: string } = {
      status,
      updatedAt: new Date(),
    };

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    if (status === 'rejected') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = adminUser.userId;
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
});
