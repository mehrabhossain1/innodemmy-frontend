import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/utils/auth-middleware';
import { listAllUsers, createNewUser } from '@/lib/services/users';

export const GET = withAdminAuth(async () => {
  try {
    // Get all users
    const users = await listAllUsers();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const { email, phone, password, name, role } = await request.json();

    // Validate: both email and phone are required
    if (!email || !phone || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, phone, password, name, and role are all required' },
        { status: 400 }
      );
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be student or admin' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createNewUser({
      email,
      phone,
      password,
      name,
      role,
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Create user error:', error);

    // Handle specific errors
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
