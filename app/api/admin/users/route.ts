import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { User } from '@/lib/models';

export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');

    const allUsers = await users.find({}).toArray();
    
    // Remove passwords from response
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);

    return NextResponse.json({ users: usersWithoutPasswords });
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
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      );
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be student or admin' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const users = db.collection<User>('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const { hashPassword } = await import('@/lib/auth');
    const hashedPassword = await hashPassword(password);

    const newUser: Omit<User, '_id'> = {
      email,
      password: hashedPassword,
      name,
      role: role as 'student' | 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(newUser);
    const user = await users.findOne({ _id: result.insertedId });

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
