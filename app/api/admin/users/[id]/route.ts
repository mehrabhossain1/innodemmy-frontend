import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/utils/auth-middleware';
import { getUserById, updateUserById, deleteUserById } from '@/lib/services/users';
import { ObjectId } from 'mongodb';

export const GET = withAdminAuth<{ params: Promise<{ id: string }> }>(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params;

      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
      }

      const user = await getUserById(id);

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ user });
    } catch (error) {
      console.error('Get user error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
);

export const PUT = withAdminAuth<{ params: Promise<{ id: string }> }>(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params;
      const body = await request.json();

      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
      }

      const user = await updateUserById(id, body);

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ user });
    } catch (error) {
      console.error('Update user error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
);

export const DELETE = withAdminAuth<{ params: Promise<{ id: string }> }>(
  async (request: NextRequest, { params }) => {
    try {
      const { id } = await params;

      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
      }

      const deleted = await deleteUserById(id);

      if (!deleted) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
);
