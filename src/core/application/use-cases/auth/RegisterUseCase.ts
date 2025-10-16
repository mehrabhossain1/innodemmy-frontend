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
    // Validate input - at least one of email or phone is required
    if ((!registerData.email && !registerData.phone) || !registerData.password || !registerData.name) {
      throw new Error('Email or phone, password, and name are required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.existsByEmailOrPhone(
      registerData.email,
      registerData.phone
    );
    if (existingUser) {
      throw new Error('User with this email or phone already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(registerData.password);

    // Create user
    const user = await this.userRepository.create({
      email: registerData.email || null,
      phone: registerData.phone || null,
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
      phone: user.phone,
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
