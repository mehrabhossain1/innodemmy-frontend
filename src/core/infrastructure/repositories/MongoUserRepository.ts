/**
 * MongoDB User Repository Implementation - Infrastructure Layer
 */
import { ObjectId } from 'mongodb';
import { IUserRepository } from '@/src/core/domain/repositories/IUserRepository';
import { User, UserRole, UserWithPassword } from '@/src/core/domain/entities/User';
import { getDatabase } from '../database/MongoDBConnection';

interface UserDocument {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoUserRepository implements IUserRepository {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<UserDocument>('users');
  }

  private mapToEntity(doc: UserDocument): User {
    return new User(
      doc._id?.toString() || '',
      doc.email,
      doc.name,
      doc.role as UserRole,
      doc.createdAt,
      doc.updatedAt
    );
  }

  private mapToEntityWithPassword(doc: UserDocument): UserWithPassword {
    return {
      id: doc._id?.toString(),
      email: doc.email,
      password: doc.password,
      name: doc.name,
      role: doc.role as UserRole,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  async findById(id: string): Promise<User | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ email });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ email });
    return doc ? this.mapToEntityWithPassword(doc) : null;
  }

  async findAll(): Promise<User[]> {
    const collection = await this.getCollection();
    const docs = await collection.find({}).toArray();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async create(userData: Omit<UserWithPassword, 'id'>): Promise<User> {
    const collection = await this.getCollection();
    const doc: Omit<UserDocument, '_id'> = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    };
    
    const result = await collection.insertOne(doc);
    const insertedDoc = await collection.findOne({ _id: result.insertedId });
    
    if (!insertedDoc) {
      throw new Error('Failed to create user');
    }
    
    return this.mapToEntity(insertedDoc);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const collection = await this.getCollection();
    const updateData: Partial<UserDocument> = {
      ...userData,
      updatedAt: new Date()
    };
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) {
      throw new Error('User not found after update');
    }
    
    return this.mapToEntity(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async exists(email: string): Promise<boolean> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments({ email });
    return count > 0;
  }
}
