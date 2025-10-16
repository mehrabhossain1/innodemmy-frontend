import { NextRequest, NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    console.log('Login attempt with:', { identifier });

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/Phone and password are required' },
        { status: 400 }
      );
    }

    // Use clean architecture - Login Use Case
    const loginUseCase = UseCaseFactory.createLoginUseCase();
    const result = await loginUseCase.execute({ identifier, password });

    console.log('Login successful for:', { identifier });

    // Convert to legacy format for backward compatibility
    const userResponse = LegacyModelAdapter.userToLegacy(result.user);

    return NextResponse.json({
      user: userResponse,
      token: result.token,
    });
  } catch (error) {
    console.error('Signin error:', error);

    // Handle specific errors
    if (error instanceof Error && error.message.includes('Invalid credentials')) {
      return NextResponse.json(
        { error: 'Invalid email/phone or password' },
        { status: 401 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Login failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
