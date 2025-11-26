import { NextRequest, NextResponse } from 'next/server';
import { registerDirect } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function signupHandler(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    console.log('Signup request received:', { email, name });

    // Validate required fields
    if (!email || !password || !name) {
      console.error('Missing required fields:', { email: !!email, password: !!password, name: !!name });
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Register user directly (no email verification required)
    const result = await registerDirect({
      email,
      password,
      name,
      role: 'student'
    });

    console.log('User registered successfully:', email);

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error('Signup error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { success: false, error: 'User with this email already exists' },
          { status: 400 }
        );
      }

      if (error.message.includes('Invalid email format')) {
        return NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Return error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Final error message:', errorMessage);

    return NextResponse.json(
      { success: false, error: `Registration failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.SIGNUP, signupHandler);
