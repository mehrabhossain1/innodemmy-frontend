/**
 * User DTOs (Data Transfer Objects) - Application Layer
 */
import { UserRole } from '@/src/core/domain/entities/User';

export interface CreateUserDTO {
  email?: string | null;
  phone?: string | null;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  email?: string | null;
  phone?: string | null;
  name?: string;
  role?: UserRole;
}

export interface UserResponseDTO {
  id: string;
  email?: string | null;
  phone?: string | null;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponseDTO {
  user: UserResponseDTO;
  token: string;
}

export interface LoginDTO {
  identifier: string; // Can be email or phone
  password: string;
}
