/**
 * Register Use Case - Application Layer
 * Handles user registration logic
 */
import { IUserRepository } from '@/src/core/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/src/core/infrastructure/security/PasswordHasher';
import { ITokenService } from '@/src/core/infrastructure/security/JWTTokenService';
import { CreateUserDTO, AuthResponseDTO, UserResponseDTO } from '../../dtos/UserDTO';
import { UserRole } from '@/src/core/domain/entities/User';

export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService
  ) {}

  async execute(registerData: CreateUserDTO): Promise<AuthResponseDTO> {
    // Validate input
    if (!registerData.email || !registerData.password || !registerData.name) {
      throw new Error('Email, password, and name are required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.exists(registerData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(registerData.password);

    // Create user
    const user = await this.userRepository.create({
      email: registerData.email,
      password: hashedPassword,
      name: registerData.name,
      role: registerData.role || UserRole.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Generate token
    const token = this.tokenService.generateToken(user);

    // Map to response DTO
    const userResponse: UserResponseDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return {
      user: userResponse,
      token
    };
  }
}
