/**
 * User Entity - Domain Layer
 * Represents the core business model for a user
 * Note: User must have either email OR phone (at least one is required)
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly name: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    // Validate: at least one of email or phone must be provided
    if (!email && !phone) {
      throw new Error('User must have either an email or phone number');
    }
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isStudent(): boolean {
    return this.role === UserRole.STUDENT;
  }

  getIdentifier(): string {
    return this.email || this.phone || '';
  }
}

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

/**
 * User with password - used only for authentication
 * Note: User must have either email OR phone (at least one is required)
 */
export interface UserWithPassword {
  id?: string;
  email?: string | null;
  phone?: string | null;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

