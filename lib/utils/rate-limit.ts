import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests in the window
}

/**
 * Rate limiting configurations for different endpoints
 */
export const RATE_LIMITS = {
  LOGIN: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
  OTP_REQUEST: { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 requests per 15 minutes
  PASSWORD_RESET: { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 requests per 15 minutes
  SIGNUP: { windowMs: 60 * 1000, maxRequests: 3 }, // 3 requests per minute
};

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cfConnecting = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  if (cfConnecting) {
    return cfConnecting;
  }

  return 'unknown';
}

/**
 * Create a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig) {
  return function rateLimiter(request: NextRequest): { allowed: boolean; response?: NextResponse } {
    const ip = getClientIP(request);
    const key = `${ip}-${request.nextUrl.pathname}`;
    const now = Date.now();

    // Clean up expired entries
    cleanupExpiredEntries(now);

    // Get or create entry for this IP/endpoint combination
    const entry = store[key];

    if (!entry) {
      // First request from this IP for this endpoint
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      return { allowed: true };
    }

    // Check if the time window has expired
    if (now > entry.resetTime) {
      // Reset the counter
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      return { allowed: true };
    }

    // Increment the counter
    entry.count++;

    // Check if limit is exceeded
    if (entry.count > config.maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

      return {
        allowed: false,
        response: NextResponse.json(
          {
            success: false,
            message: 'Too many requests. Please try again later.',
            retryAfter,
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': entry.resetTime.toString(),
            },
          }
        ),
      };
    }

    // Request is allowed
    return { allowed: true };
  };
}

/**
 * Clean up expired entries from the store
 */
function cleanupExpiredEntries(now: number): void {
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}

/**
 * Helper function to apply rate limiting to an API route handler
 */
export function withRateLimit(
  config: RateLimitConfig,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async function (request: NextRequest): Promise<NextResponse> {
    const rateLimiter = createRateLimiter(config);
    const { allowed, response } = rateLimiter(request);

    if (!allowed && response) {
      return response;
    }

    return handler(request);
  };
}

/**
 * Reset rate limit for a specific IP and endpoint (useful for testing)
 */
export function resetRateLimit(ip: string, endpoint: string): void {
  const key = `${ip}-${endpoint}`;
  delete store[key];
}

/**
 * Get current rate limit status for an IP and endpoint
 */
export function getRateLimitStatus(ip: string, endpoint: string, config: RateLimitConfig): {
  remaining: number;
  resetTime: number;
} {
  const key = `${ip}-${endpoint}`;
  const entry = store[key];
  const now = Date.now();

  if (!entry || now > entry.resetTime) {
    return {
      remaining: config.maxRequests,
      resetTime: now + config.windowMs,
    };
  }

  return {
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetTime: entry.resetTime,
  };
}
