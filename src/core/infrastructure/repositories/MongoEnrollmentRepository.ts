/**
 * MongoDB Enrollment Repository Implementation - Infrastructure Layer
 */
import { ObjectId } from 'mongodb';
import { IEnrollmentRepository } from '@/src/core/domain/repositories/IEnrollmentRepository';
import { Enrollment, EnrollmentStatus } from '@/src/core/domain/entities/Enrollment';
import { getDatabase } from '../database/MongoDBConnection';

interface EnrollmentDocument {
  _id?: ObjectId;
  userId: string;
  courseId: string;
  status: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentProof?: string;
  transactionId?: string;
  adminNotes?: string;
  enrolledAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoEnrollmentRepository implements IEnrollmentRepository {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<EnrollmentDocument>('enrollments');
  }

  private mapToEntity(doc: EnrollmentDocument): Enrollment {
    return new Enrollment(
      doc._id?.toString() || '',
      doc.userId,
      doc.courseId,
      doc.status as EnrollmentStatus,
      doc.paymentAmount,
      doc.paymentMethod,
      doc.createdAt,
      doc.updatedAt,
      doc.paymentProof,
      doc.transactionId,
      doc.adminNotes,
      doc.enrolledAt,
      doc.approvedAt,
      doc.approvedBy
    );
  }

  async findById(id: string): Promise<Enrollment | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(): Promise<Enrollment[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({}).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findByUserId(userId: string): Promise<Enrollment[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({ userId }).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findByCourseId(courseId: string): Promise<Enrollment[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({ courseId }).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findByStatus(status: EnrollmentStatus): Promise<Enrollment[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({ status }).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async create(enrollmentData: Omit<Enrollment, 'id'>): Promise<Enrollment> {
    const collection = await this.getCollection();
    const doc: Omit<EnrollmentDocument, '_id'> = {
      userId: enrollmentData.userId,
      courseId: enrollmentData.courseId,
      status: enrollmentData.status,
      paymentAmount: enrollmentData.paymentAmount,
      paymentMethod: enrollmentData.paymentMethod,
      paymentProof: enrollmentData.paymentProof,
      transactionId: enrollmentData.transactionId,
      adminNotes: enrollmentData.adminNotes,
      enrolledAt: enrollmentData.enrolledAt,
      approvedAt: enrollmentData.approvedAt,
      approvedBy: enrollmentData.approvedBy,
      createdAt: enrollmentData.createdAt,
      updatedAt: enrollmentData.updatedAt
    };
    
    const result = await collection.insertOne(doc);
    const insertedDoc = await collection.findOne({ _id: result.insertedId });
    
    if (!insertedDoc) {
      throw new Error('Failed to create enrollment');
    }
    
    return this.mapToEntity(insertedDoc);
  }

  async update(id: string, enrollmentData: Partial<Enrollment>): Promise<Enrollment> {
    const collection = await this.getCollection();
    const updateData: Partial<EnrollmentDocument> = {
      ...enrollmentData,
      updatedAt: new Date()
    };
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) {
      throw new Error('Enrollment not found after update');
    }
    
    return this.mapToEntity(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async existsForUserAndCourse(userId: string, courseId: string): Promise<boolean> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments({ userId, courseId });
    return count > 0;
  }
}
