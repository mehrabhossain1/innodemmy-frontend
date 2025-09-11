import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Add user info to request
    (request as any).user = decoded;
    
    return handler(request, ...args);
  };
}

export function withAdminAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
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
    (request as any).user = decoded;
    
    return handler(request, ...args);
  };
}
