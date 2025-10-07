/**
 * Auth Middleware - Infrastructure Layer
 * Provides authentication middleware compatible with Next.js API routes
 */
import { NextRequest, NextResponse } from 'next/server';
import { UseCaseFactory } from '@/src/core/application/factories/UseCaseFactory';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

type ApiHandler = (request: AuthenticatedRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse;

/**
 * Middleware for authenticated routes
 */
export function withAuth(handler: ApiHandler) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const tokenService = UseCaseFactory.getTokenService();
    const authHeader = request.headers.get('authorization');
    const token = tokenService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = tokenService.verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Add user info to request
    const authRequest = request as AuthenticatedRequest;
    authRequest.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    
    return handler(authRequest, ...args);
  };
}

/**
 * Middleware for admin-only routes
 */
export function withAdminAuth(handler: ApiHandler) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const tokenService = UseCaseFactory.getTokenService();
    const authHeader = request.headers.get('authorization');
    const token = tokenService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = tokenService.verifyToken(token);
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
      role: decoded.role
    };
    
    return handler(authRequest, ...args);
  };
}
