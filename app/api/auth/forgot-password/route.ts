import { NextRequest, NextResponse } from 'next/server';
import { requestPasswordReset } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function forgotPasswordHandler(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log('Password reset request received:', { email });

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Request password reset (sends OTP to email)
    const result = await requestPasswordReset(email);

    console.log('Password reset OTP sent (if user exists):', email);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Forgot password error:', error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('Failed to send')) {
        return NextResponse.json(
          { success: false, error: 'Failed to send password reset email. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Return error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to process request: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.PASSWORD_RESET, forgotPasswordHandler);
