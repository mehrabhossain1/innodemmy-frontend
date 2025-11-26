import { NextRequest, NextResponse } from 'next/server';
import { resendVerificationOTP } from '@/lib/services/auth';
import { withRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

async function resendOTPHandler(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log('Resend OTP request received:', { email });

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Resend verification OTP
    const result = await resendVerificationOTP(email);

    console.log('OTP resent successfully to:', email);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Resend OTP error:', error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('already verified')) {
        return NextResponse.json(
          { success: false, error: 'Email is already verified. Please login.' },
          { status: 400 }
        );
      }

      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { success: false, error: 'User not found. Please register first.' },
          { status: 404 }
        );
      }

      if (error.message.includes('Failed to send')) {
        return NextResponse.json(
          { success: false, error: 'Failed to send verification email. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Return error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to resend OTP: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.OTP_REQUEST, resendOTPHandler);
