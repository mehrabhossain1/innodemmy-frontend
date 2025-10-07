import { NextRequest, NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';
import { LegacyModelAdapter } from '@/src/core/infrastructure/adapters/LegacyModelAdapter';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Use clean architecture - Login Use Case
    const loginUseCase = UseCaseFactory.createLoginUseCase();
    const result = await loginUseCase.execute({ email, password });

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
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
