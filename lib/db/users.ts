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

  // Create unique index for email only
  try {
    await collection.createIndex({ email: 1 }, { unique: true });
  } catch {
    // Index may already exist
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
 * Find user by email (without password)
 */
export async function findUserByIdentifier(email: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne(
    { email: email },
    { projection: { password: 0 } }
  );
  return user;
}

/**
 * Find user by email (with password for authentication)
 */
export async function findUserByIdentifierWithPassword(email: string) {
  const collection = await getUsersCollection();
  const user = await collection.findOne({
    email: email,
  });
  return user;
}

/**
 * Check if user exists by email
 */
export async function userExists(email: string) {
  const collection = await getUsersCollection();
  const count = await collection.countDocuments({ email });
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

/**
 * Update user's verification code and expiry
 */
export async function updateVerificationCode(
  email: string,
  hashedCode: string,
  expiry: Date
) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $set: {
        verificationCode: hashedCode,
        verificationCodeExpiry: expiry,
        otpAttempts: 0,
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Mark user as verified and clear verification code
 */
export async function markUserAsVerified(email: string) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $set: {
        isVerified: true,
        updatedAt: new Date(),
      },
      $unset: {
        verificationCode: '',
        verificationCodeExpiry: '',
        otpAttempts: '',
      },
    }
  );
}

/**
 * Update user's password reset code and expiry
 */
export async function updateResetPasswordCode(
  email: string,
  hashedCode: string,
  expiry: Date
) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $set: {
        resetPasswordCode: hashedCode,
        resetPasswordCodeExpiry: expiry,
        otpAttempts: 0,
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Clear password reset code after successful reset
 */
export async function clearResetPasswordCode(email: string) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $unset: {
        resetPasswordCode: '',
        resetPasswordCodeExpiry: '',
        otpAttempts: '',
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Increment OTP attempts counter
 */
export async function incrementOTPAttempts(email: string) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $inc: { otpAttempts: 1 },
      $set: { updatedAt: new Date() },
    }
  );
}

/**
 * Reset OTP attempts counter
 */
export async function resetOTPAttempts(email: string) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $set: {
        otpAttempts: 0,
        updatedAt: new Date(),
      },
    }
  );
}

/**
 * Update user password
 */
export async function updateUserPassword(email: string, hashedPassword: string) {
  const collection = await getUsersCollection();
  await collection.updateOne(
    { email },
    {
      $set: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    }
  );
}
