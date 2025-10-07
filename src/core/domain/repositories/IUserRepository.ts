/**
 * User Repository Interface - Domain Layer
 * Defines the contract for user data access
 */
import { User, UserWithPassword } from '../entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<UserWithPassword | null>;
  findAll(): Promise<User[]>;
  create(user: Omit<UserWithPassword, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
  exists(email: string): Promise<boolean>;
}

