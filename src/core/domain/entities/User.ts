/**
 * User Entity - Domain Layer
 * Represents the core business model for a user
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isStudent(): boolean {
    return this.role === UserRole.STUDENT;
  }
}

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

/**
 * User with password - used only for authentication
 */
export interface UserWithPassword {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

