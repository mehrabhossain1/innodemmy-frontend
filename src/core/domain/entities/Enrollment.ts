/**
 * Enrollment Entity - Domain Layer
 * Represents the core business model for course enrollment
 */
export class Enrollment {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly courseId: string,
    public readonly status: EnrollmentStatus,
    public readonly paymentAmount: number,
    public readonly paymentMethod: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly paymentProof?: string,
    public readonly transactionId?: string,
    public readonly adminNotes?: string,
    public readonly enrolledAt?: Date,
    public readonly approvedAt?: Date,
    public readonly approvedBy?: string
  ) {}

  isPending(): boolean {
    return this.status === EnrollmentStatus.PENDING;
  }

  isApproved(): boolean {
    return this.status === EnrollmentStatus.APPROVED;
  }

  isRejected(): boolean {
    return this.status === EnrollmentStatus.REJECTED;
  }

  canBeApproved(): boolean {
    return this.isPending();
  }

  approve(adminId: string, notes?: string): Enrollment {
    if (!this.canBeApproved()) {
      throw new Error('Cannot approve enrollment that is not pending');
    }

    return new Enrollment(
      this.id,
      this.userId,
      this.courseId,
      EnrollmentStatus.APPROVED,
      this.paymentAmount,
      this.paymentMethod,
      this.createdAt,
      new Date(),
      this.paymentProof,
      this.transactionId,
      notes || this.adminNotes,
      this.enrolledAt,
      new Date(),
      adminId
    );
  }

  reject(adminId: string, notes?: string): Enrollment {
    if (!this.canBeApproved()) {
      throw new Error('Cannot reject enrollment that is not pending');
    }

    return new Enrollment(
      this.id,
      this.userId,
      this.courseId,
      EnrollmentStatus.REJECTED,
      this.paymentAmount,
      this.paymentMethod,
      this.createdAt,
      new Date(),
      this.paymentProof,
      this.transactionId,
      notes || this.adminNotes,
      this.enrolledAt,
      new Date(),
      adminId
    );
  }
}

export enum EnrollmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

