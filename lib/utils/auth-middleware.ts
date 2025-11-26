/**
 * Authentication middleware
 * Provides authentication for Next.js API routes
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '../services/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string | null;
    phone: string | null;
    role: string;
  };
}

type ApiHandler<T = unknown> = (
  request: AuthenticatedRequest,
  context: T
) => Promise<NextResponse> | NextResponse;

/**
 * Middleware for authenticated routes
 */
export function withAuth<T = unknown>(handler: ApiHandler<T>) {
  return async (request: NextRequest, context: T) => {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Add user info to request
    const authRequest = request as AuthenticatedRequest;
    authRequest.user = {
      userId: decoded.userId,
      email: decoded.email,
      phone: decoded.phone,
      role: decoded.role,
    };

    return handler(authRequest, context);
  };
}

/**
 * Middleware for admin-only routes
 */
export function withAdminAuth<T = unknown>(handler: ApiHandler<T>) {
  return async (request: NextRequest, context: T) => {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Add user info to request
    const authRequest = request as AuthenticatedRequest;
    authRequest.user = {
      userId: decoded.userId,
      email: decoded.email,
      phone: decoded.phone,
      role: decoded.role,
    };

    return handler(authRequest, context);
  };
}
