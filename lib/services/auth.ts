/**
 * Authentication service
 * Handles login, registration, and JWT token management
 */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../utils/password';
import {
  findUserByIdentifierWithPassword,
  findUserByIdentifier,
  createUser,
  userExists,
} from '../db/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken extends JwtPayload {
  userId: string;
  email: string | null;
  phone: string | null;
  role: string;
}

/**
 * Login with email or phone and password
 */
export async function login(identifier: string, password: string) {
  // Validate input
  if (!identifier || !password) {
    throw new Error('Email/Phone and password are required');
  }

  // Find user with password
  const user = await findUserByIdentifierWithPassword(identifier);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Get user without password
  const userWithoutPassword = await findUserByIdentifier(identifier);
  if (!userWithoutPassword) {
    throw new Error('User not found');
  }

  // Generate token
  const token = generateToken({
    _id: userWithoutPassword._id?.toString(),
    email: userWithoutPassword.email,
    phone: userWithoutPassword.phone,
    role: userWithoutPassword.role,
  });

  return {
    user: {
      ...userWithoutPassword,
      _id: userWithoutPassword._id?.toString(),
    },
    token,
  };
}

/**
 * Register a new user
 */
export async function register(data: {
  name: string;
  email?: string | null;
  phone?: string | null;
  password: string;
  role?: 'student' | 'admin';
}) {
  // Validate input - at least one of email or phone is required
  if ((!data.email && !data.phone) || !data.password || !data.name) {
    throw new Error('Email or phone, password, and name are required');
  }

  // Check if user already exists
  const exists = await userExists(data.email, data.phone);
  if (exists) {
    throw new Error('User with this email or phone already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await createUser({
    email: data.email || null,
    phone: data.phone || null,
    password: hashedPassword,
    name: data.name,
    role: data.role || 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (!user) {
    throw new Error('Failed to create user');
  }

  // Generate token
  const token = generateToken({
    _id: user._id?.toString(),
    email: user.email,
    phone: user.phone,
    role: user.role,
  });

  return {
    user: {
      ...user,
      _id: user._id?.toString(),
    },
    token,
  };
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(user: {
  _id?: string;
  email?: string | null;
  phone?: string | null;
  role: string;
}): string {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as DecodedToken;
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}
