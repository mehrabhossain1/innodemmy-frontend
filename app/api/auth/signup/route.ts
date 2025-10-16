import { NextRequest, NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';
import { UserRole } from '@/src/core/domain/entities/User';

export async function POST(request: NextRequest) {
  try {
    const { email, phone, password, name } = await request.json();

    console.log('Signup request received:', { email, phone, name });

    // Validate: at least one of email or phone is required
    if ((!email && !phone) || !password || !name) {
      console.error('Missing required fields:', { email: !!email, phone: !!phone, password: !!password, name: !!name });
      return NextResponse.json(
        { error: 'Email or phone, password, and name are required' },
        { status: 400 }
      );
    }

    // Use clean architecture - Register Use Case
    console.log('Creating register use case...');
    const registerUseCase = UseCaseFactory.createRegisterUseCase();

    console.log('Executing register use case...');
    const result = await registerUseCase.execute({
      email: email || null,
      phone: phone || null,
      password,
      name,
      role: UserRole.STUDENT
    });

    console.log('User registered successfully:', { email, phone, userId: result.user.id });

    // Convert to legacy format for backward compatibility
    const userResponse = LegacyModelAdapter.userToLegacy(result.user);

    return NextResponse.json({
      user: userResponse,
      token: result.token,
    });
  } catch (error) {
    console.error('Signup error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Handle specific errors
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 400 }
      );
    }

    // Return detailed error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Final error message:', errorMessage);

    return NextResponse.json(
      { error: `Registration failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
