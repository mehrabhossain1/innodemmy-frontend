import { NextRequest, NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { UserRole } from '@/src/core/domain/entities/User';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Use clean architecture - Register Use Case
    const registerUseCase = UseCaseFactory.createRegisterUseCase();
    const result = await registerUseCase.execute({
      email,
      password,
      name,
      role: UserRole.STUDENT
    });

    // Convert to legacy format for backward compatibility
    const userResponse = LegacyModelAdapter.userToLegacy(result.user);

    return NextResponse.json({
      user: userResponse,
      token: result.token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    
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
}
