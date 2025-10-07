import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/src/core/infrastructure/middleware/AuthMiddleware';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { UserRole } from '@/src/core/domain/entities/User';

export const GET = withAdminAuth(async () => {
  try {
    // Use clean architecture - Get All Users Use Case
    const getAllUsersUseCase = UseCaseFactory.createGetAllUsersUseCase();
    const users = await getAllUsersUseCase.execute();

    // Convert to legacy format for backward compatibility
    const usersResponse = LegacyModelAdapter.usersToLegacy(users);

    return NextResponse.json({ users: usersResponse });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      );
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be student or admin' },
        { status: 400 }
      );
    }

    // Use clean architecture - Create User Use Case
    const createUserUseCase = UseCaseFactory.createCreateUserUseCase();
    const user = await createUserUseCase.execute({
      email,
      password,
      name,
      role: role as UserRole
    });

    // Convert to legacy format for backward compatibility
    const userResponse = LegacyModelAdapter.userToLegacy(user);

    return NextResponse.json({
      user: userResponse,
    });
  } catch (error) {
    console.error('Create user error:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
