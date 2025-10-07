/**
 * JWT Token Service - Infrastructure Layer
 * Handles JWT token generation and verification
 */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@/src/core/domain/entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ITokenService {
  generateToken(user: User): string;
  verifyToken(token: string): DecodedToken | null;
  extractTokenFromHeader(authHeader: string | null): string | null;
}

export class JWTTokenService implements ITokenService {
  generateToken(user: User): string {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): DecodedToken | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as DecodedToken;
    } catch {
      return null;
    }
  }

  extractTokenFromHeader(authHeader: string | null): string | null {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}
