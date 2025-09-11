import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, DecodedToken } from './auth';

type ApiHandler = (request: NextRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: ApiHandler) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Add user info to request
    (request as unknown as { user: DecodedToken }).user = decoded;
    
    return handler(request, ...args);
  };
}

export function withAdminAuth(handler: ApiHandler) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
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
    (request as unknown as { user: DecodedToken }).user = decoded;
    
    return handler(request, ...args);
  };
}
