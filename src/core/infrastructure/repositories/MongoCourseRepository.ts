/**
 * MongoDB Course Repository Implementation - Infrastructure Layer
 */
import { ObjectId } from 'mongodb';
import { ICourseRepository, CourseCreateData, CourseUpdateData } from '@/src/core/domain/repositories/ICourseRepository';
import { Course, CourseLevel, CourseModule } from '@/src/core/domain/entities/Course';
import { getDatabase } from '../database/MongoDBConnection';

interface CourseDocument {
  _id?: ObjectId;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  modules: CourseModule[];
  isActive: boolean;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoCourseRepository implements ICourseRepository {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<CourseDocument>('courses');
  }

  private mapToEntity(doc: CourseDocument): Course {
    return new Course(
      doc._id?.toString() || '',
      doc.title,
      doc.description,
      doc.price,
      doc.instructor,
      doc.duration,
      doc.level as CourseLevel,
      doc.category,
      doc.modules,
      doc.isActive,
      doc.thumbnail,
      doc.createdAt,
      doc.updatedAt
    );
  }

  async findById(id: string): Promise<Course | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(): Promise<Course[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({}).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findActive(): Promise<Course[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({ isActive: true }).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findByCategory(category: string): Promise<Course[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({ category, isActive: true }).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async create(courseData: CourseCreateData): Promise<Course> {
    const collection = await this.getCollection();
    const doc: Omit<CourseDocument, '_id'> = {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      instructor: courseData.instructor,
      duration: courseData.duration,
      level: courseData.level,
      category: courseData.category,
      modules: courseData.modules,
      isActive: courseData.isActive,
      thumbnail: courseData.thumbnail,
      createdAt: courseData.createdAt || new Date(),
      updatedAt: courseData.updatedAt || new Date()
    };
    
    const result = await collection.insertOne(doc);
    const insertedDoc = await collection.findOne({ _id: result.insertedId });
    
    if (!insertedDoc) {
      throw new Error('Failed to create course');
    }
    
    return this.mapToEntity(insertedDoc);
  }

  async update(id: string, courseData: CourseUpdateData): Promise<Course> {
    const collection = await this.getCollection();
    const updateData: Partial<CourseDocument> = {
      ...courseData,
      updatedAt: new Date()
    };
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) {
      throw new Error('Course not found after update');
    }
    
    return this.mapToEntity(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async activate(id: string): Promise<Course> {
    return this.update(id, { isActive: true });
  }

  async deactivate(id: string): Promise<Course> {
    return this.update(id, { isActive: false });
  }
}
