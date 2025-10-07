/**
 * User DTOs (Data Transfer Objects) - Application Layer
 */
import { UserRole } from '@/src/core/domain/entities/User';

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface UserResponseDTO {
  id: string;
  email: string;
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
  email: string;
  password: string;
}
