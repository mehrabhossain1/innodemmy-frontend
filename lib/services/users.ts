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
  email?: string | null;
  phone?: string | null;
  password: string;
  role: 'student' | 'admin';
}) {
  // Validate input
  if ((!data.email && !data.phone) || !data.password || !data.name) {
    throw new Error('Email or phone, password, and name are required');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await createUser({
    email: data.email || null,
    phone: data.phone || null,
    password: hashedPassword,
    name: data.name,
    role: data.role,
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
  email?: string | null;
  phone?: string | null;
  role?: 'student' | 'admin';
}) {
  return updateUser(id, data);
}

/**
 * Delete user
 */
export async function deleteUserById(id: string) {
  return deleteUser(id);
}
