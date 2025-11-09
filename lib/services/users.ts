/**
 * User management service
 * Handles user CRUD operations
 */
import { hashPassword } from '../utils/password';
import { createUser, getAllUsers, findUserById, updateUser, deleteUser } from '../db/users';

/**
 * Create a new user (admin functionality)
 */
export async function createNewUser(data: {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  isVerified?: boolean; // Admin can create pre-verified users
}) {
  // Validate input
  if (!data.email || !data.password || !data.name) {
    throw new Error('Email, password, and name are required');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user (admin-created users are verified by default)
  const user = await createUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    role: data.role,
    isVerified: data.isVerified !== undefined ? data.isVerified : true, // Default to verified for admin-created users
    otpAttempts: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return user;
}

/**
 * Get all users
 */
export async function listAllUsers() {
  return getAllUsers();
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  return findUserById(id);
}

/**
 * Update user
 */
export async function updateUserById(id: string, data: {
  name?: string;
  email?: string;
  role?: 'student' | 'admin';
  isVerified?: boolean;
}) {
  return updateUser(id, data);
}

/**
 * Delete user
 */
export async function deleteUserById(id: string) {
  return deleteUser(id);
}
