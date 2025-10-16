/**
 * Login Use Case - Application Layer
 * Handles user authentication logic
 */
import { IUserRepository } from '@/src/core/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/src/core/infrastructure/security/PasswordHasher';
import { ITokenService } from '@/src/core/infrastructure/security/JWTTokenService';
import { LoginDTO, AuthResponseDTO, UserResponseDTO } from '../../dtos/UserDTO';

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService
  ) {}

  async execute(loginData: LoginDTO): Promise<AuthResponseDTO> {
    // Validate input
    if (!loginData.identifier || !loginData.password) {
      throw new Error('Email/Phone and password are required');
    }

    // Find user with password (try email or phone)
    const user = await this.userRepository.findByEmailOrPhoneWithPassword(loginData.identifier);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await this.passwordHasher.verify(
      loginData.password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Get user without password
    const userEntity = await this.userRepository.findByEmailOrPhone(loginData.identifier);
    if (!userEntity) {
      throw new Error('User not found');
    }

    // Generate token
    const token = this.tokenService.generateToken(userEntity);

    // Map to response DTO
    const userResponse: UserResponseDTO = {
      id: userEntity.id,
      email: userEntity.email,
      phone: userEntity.phone,
      name: userEntity.name,
      role: userEntity.role,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt
    };

    return {
      user: userResponse,
      token
    };
  }
}
