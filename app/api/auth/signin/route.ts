import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function signinHandler(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt with:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Login user (only verified users can login)
    const result = await login(email, password);

    console.log('Login successful for:', { email });

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error('Signin error:', error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid credentials')) {
        return NextResponse.json(
          { success: false, error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      if (error.message.includes('verify your email')) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
            needsVerification: true
          },
          { status: 403 }
        );
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Login failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.LOGIN, signinHandler);
