import { NextRequest, NextResponse } from 'next/server';
import { verifyEmail } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function verifyEmailHandler(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    console.log('Email verification request received:', { email });

    // Validate required fields
    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Verify email with OTP
    const result = await verifyEmail(email, code);

    console.log('Email verified successfully:', email);

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error('Email verification error:', error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('already verified')) {
        return NextResponse.json(
          { success: false, error: 'Email is already verified. Please login.' },
          { status: 400 }
        );
      }

      if (error.message.includes('expired')) {
        return NextResponse.json(
          { success: false, error: 'Verification code has expired. Please request a new code.', expired: true },
          { status: 400 }
        );
      }

      if (error.message.includes('Maximum verification attempts')) {
        return NextResponse.json(
          { success: false, error: 'Maximum attempts exceeded. Please request a new code.', maxAttemptsReached: true },
          { status: 400 }
        );
      }

      if (error.message.includes('Invalid verification code')) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { success: false, error: 'User not found. Please register first.' },
          { status: 404 }
        );
      }
    }

    // Return error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Verification failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.LOGIN, verifyEmailHandler);
