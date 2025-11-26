import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function resetPasswordHandler(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json();

    console.log('Reset password request received:', { email });

    // Validate required fields
    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email, verification code, and new password are required' },
        { status: 400 }
      );
    }

    // Reset password with OTP
    const result = await resetPassword(email, code, newPassword);

    console.log('Password reset successfully for:', email);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Reset password error:', error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('Password must be at least')) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      if (error.message.includes('expired')) {
        return NextResponse.json(
          { success: false, error: 'Password reset code has expired. Please request a new code.', expired: true },
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

      if (error.message.includes('No password reset code found')) {
        return NextResponse.json(
          { success: false, error: 'No password reset code found. Please request a new code.' },
          { status: 400 }
        );
      }

      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { success: false, error: 'User not found.' },
          { status: 404 }
        );
      }
    }

    // Return error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Password reset failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.PASSWORD_RESET, resetPasswordHandler);
