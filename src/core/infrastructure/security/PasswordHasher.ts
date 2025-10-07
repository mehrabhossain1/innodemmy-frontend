/**
 * Password Hasher - Infrastructure Layer
 * Handles password hashing and verification
 */
import bcrypt from 'bcryptjs';

export interface IPasswordHasher {
  hash(password: string): Promise<string>;
  verify(password: string, hashedPassword: string): Promise<boolean>;
}

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
