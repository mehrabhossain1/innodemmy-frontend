/**
 * Create User Use Case - Application Layer
 * Handles admin user creation logic
 */
import { IUserRepository } from '@/src/core/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/src/core/infrastructure/security/PasswordHasher';
import { CreateUserDTO, UserResponseDTO } from '../../dtos/UserDTO';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(userData: CreateUserDTO): Promise<UserResponseDTO> {
    // Validate input
    if (!userData.email || !userData.password || !userData.name || !userData.role) {
      throw new Error('Email, password, name, and role are required');
    }

    // Validate role
    if (!['student', 'admin'].includes(userData.role)) {
      throw new Error('Invalid role. Must be student or admin');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.exists(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(userData.password);

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Map to response DTO
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
