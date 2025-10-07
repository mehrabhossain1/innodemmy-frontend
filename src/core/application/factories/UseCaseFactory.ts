/**
 * Use Case Factory - Application Layer
 * Creates use case instances with their dependencies (Dependency Injection)
 */
import { MongoUserRepository } from '@/src/core/infrastructure/repositories/MongoUserRepository';
import { MongoCourseRepository } from '@/src/core/infrastructure/repositories/MongoCourseRepository';
import { MongoEnrollmentRepository } from '@/src/core/infrastructure/repositories/MongoEnrollmentRepository';
import { BcryptPasswordHasher } from '@/src/core/infrastructure/security/PasswordHasher';
import { JWTTokenService } from '@/src/core/infrastructure/security/JWTTokenService';

// Auth Use Cases
import { LoginUseCase } from '../use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '../use-cases/auth/RegisterUseCase';

// User Use Cases
import { CreateUserUseCase } from '../use-cases/user/CreateUserUseCase';
import { GetAllUsersUseCase } from '../use-cases/user/GetAllUsersUseCase';

// Course Use Cases
import { CreateCourseUseCase } from '../use-cases/course/CreateCourseUseCase';
import { GetAllCoursesUseCase } from '../use-cases/course/GetAllCoursesUseCase';

// Enrollment Use Cases
import { CreateEnrollmentUseCase } from '../use-cases/enrollment/CreateEnrollmentUseCase';
import { ApproveEnrollmentUseCase } from '../use-cases/enrollment/ApproveEnrollmentUseCase';
import { GetEnrollmentsUseCase } from '../use-cases/enrollment/GetEnrollmentsUseCase';

/**
 * Factory class for creating use case instances
 * This implements the Dependency Injection pattern
 */
export class UseCaseFactory {
  // Repositories (Singleton pattern)
  private static userRepository = new MongoUserRepository();
  private static courseRepository = new MongoCourseRepository();
  private static enrollmentRepository = new MongoEnrollmentRepository();

  // Services (Singleton pattern)
  private static passwordHasher = new BcryptPasswordHasher();
  private static tokenService = new JWTTokenService();

  // Auth Use Cases
  static createLoginUseCase(): LoginUseCase {
    return new LoginUseCase(
      this.userRepository,
      this.passwordHasher,
      this.tokenService
    );
  }

  static createRegisterUseCase(): RegisterUseCase {
    return new RegisterUseCase(
      this.userRepository,
      this.passwordHasher,
      this.tokenService
    );
  }

  // User Use Cases
  static createCreateUserUseCase(): CreateUserUseCase {
    return new CreateUserUseCase(
      this.userRepository,
      this.passwordHasher
    );
  }

  static createGetAllUsersUseCase(): GetAllUsersUseCase {
    return new GetAllUsersUseCase(this.userRepository);
  }

  // Course Use Cases
  static createCreateCourseUseCase(): CreateCourseUseCase {
    return new CreateCourseUseCase(this.courseRepository);
  }

  static createGetAllCoursesUseCase(): GetAllCoursesUseCase {
    return new GetAllCoursesUseCase(this.courseRepository);
  }

  // Enrollment Use Cases
  static createCreateEnrollmentUseCase(): CreateEnrollmentUseCase {
    return new CreateEnrollmentUseCase(
      this.enrollmentRepository,
      this.courseRepository
    );
  }

  static createApproveEnrollmentUseCase(): ApproveEnrollmentUseCase {
    return new ApproveEnrollmentUseCase(this.enrollmentRepository);
  }

  static createGetEnrollmentsUseCase(): GetEnrollmentsUseCase {
    return new GetEnrollmentsUseCase(this.enrollmentRepository);
  }

  // Get token service for middleware
  static getTokenService(): JWTTokenService {
    return this.tokenService;
  }
}
