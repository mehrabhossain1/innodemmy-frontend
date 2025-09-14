import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { withAdminAuth } from '@/lib/middleware';
import { User } from '@/lib/models';

export const PUT = withAdminAuth(async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split('/').pop() as string;
    const { name, role, email } = await request.json();

    if (!name || !role || !email) {
      return NextResponse.json(
        { error: 'Name, role, and email are required' },
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

    const result = await users.updateOne(
      { _id: id },
      { 
        $set: { 
          name, 
          role: role as 'student' | 'admin', 
          email,
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await users.findOne({ _id: id });
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to fetch updated user' },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

export const DELETE = withAdminAuth(async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split('/').pop() as string;

    const db = await getDatabase();
    const users = db.collection<User>('users');

    const result = await users.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
