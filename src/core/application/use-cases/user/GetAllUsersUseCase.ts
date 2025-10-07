/**
 * Get All Users Use Case - Application Layer
 * Retrieves all users from the system
 */
import { IUserRepository } from '@/src/core/domain/repositories/IUserRepository';
import { UserResponseDTO } from '../../dtos/UserDTO';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }
}
