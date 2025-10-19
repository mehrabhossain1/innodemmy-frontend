/**
 * User database operations
 */
import { ObjectId } from 'mongodb';
import { getDatabase } from './connection';
import { User } from '../models';

type UserDocument = Omit<User, '_id'> & { _id?: ObjectId };

/**
 * Get the users collection with indexes
 */
async function getUsersCollection() {
  const db = await getDatabase();
  const collection = db.collection<UserDocument>('users');

  // Create unique sparse indexes for email and phone
  try {
    await collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    await collection.createIndex({ phone: 1 }, { unique: true, sparse: true });
  } catch {
    // Indexes may already exist
  }

  return collection;
}

/**
 * Find user by ID (without password)
 */
export async function findUserById(id: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne(
    { _id: new ObjectId(id) },
    { projection: { password: 0 } }
  );
  return user;
}

/**
 * Find user by email or phone (without password)
 */
export async function findUserByIdentifier(identifier: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne(
    { $or: [{ email: identifier }, { phone: identifier }] },
    { projection: { password: 0 } }
  );
  return user;
}

/**
 * Find user by email or phone (with password for authentication)
 */
export async function findUserByIdentifierWithPassword(identifier: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
  return user;
}

/**
 * Check if user exists by email or phone
 */
export async function userExists(email?: string | null, phone?: string | null) {
  const collection = await getUsersCollection();
  const query: Array<{ email?: string; phone?: string }> = [];

  if (email) query.push({ email });
  if (phone) query.push({ phone });
  if (query.length === 0) return false;

  const count = await collection.countDocuments({ $or: query });
  return count > 0;
}

/**
 * Create a new user
 */
export async function createUser(userData: Omit<User, '_id'>) {
  const collection = await getUsersCollection();
  const result = await collection.insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const user = await collection.findOne(
    { _id: result.insertedId },
    { projection: { password: 0 } }
  );

  return user;
}

/**
 * Get all users (without passwords)
 */
export async function getAllUsers() {
  const collection = await getUsersCollection();
  const users = await collection
    .find({}, { projection: { password: 0 } })
    .toArray();
  return users;
}

/**
 * Update a user
 */
export async function updateUser(
  id: string,
  userData: Partial<Omit<User, '_id'>>
) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...userData, updatedAt: new Date() } }
  );

  const user = await collection.findOne(
    { _id: new ObjectId(id) },
    { projection: { password: 0 } }
  );

  return user;
}

/**
 * Delete a user
 */
export async function deleteUser(id: string) {
  const collection = await getUsersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
