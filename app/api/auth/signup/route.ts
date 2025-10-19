import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/services/auth';

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

    // Register user
    const result = await register({
      email: email || null,
      phone: phone || null,
      password,
      name,
      role: 'student'
    });

    console.log('User registered successfully:', { email, phone, userId: result.user?._id });

    return NextResponse.json({
      user: result.user,
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
