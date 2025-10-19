import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/services/auth';

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

    // Login user
    const result = await login(identifier, password);

    console.log('Login successful for:', { identifier });

    return NextResponse.json({
      user: result.user,
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
