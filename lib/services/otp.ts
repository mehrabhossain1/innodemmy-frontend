import bcrypt from 'bcryptjs';

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 3;

/**
 * Generate a random 6-digit OTP code
 */
export function generateOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

/**
 * Hash an OTP code for secure storage
 */
export async function hashOTP(code: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedCode = await bcrypt.hash(code, salt);
  return hashedCode;
}

/**
 * Verify if the provided OTP code matches the hashed code
 */
export async function verifyOTP(code: string, hashedCode: string): Promise<boolean> {
  const isValid = await bcrypt.compare(code, hashedCode);
  return isValid;
}

/**
 * Check if the OTP code has expired
 */
export function isOTPExpired(expiry: Date): boolean {
  const now = new Date();
  return now > expiry;
}

/**
 * Check if the user can attempt OTP verification
 */
export function canAttemptOTP(attempts: number): boolean {
  return attempts < MAX_OTP_ATTEMPTS;
}

/**
 * Generate OTP expiry date (10 minutes from now)
 */
export function generateOTPExpiry(): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES);
  return expiry;
}

/**
 * Get remaining time in minutes until OTP expires
 */
export function getRemainingMinutes(expiry: Date): number {
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  return Math.max(0, minutes);
}

/**
 * Constants for OTP service
 */
export const OTP_CONSTANTS = {
  LENGTH: OTP_LENGTH,
  EXPIRY_MINUTES: OTP_EXPIRY_MINUTES,
  MAX_ATTEMPTS: MAX_OTP_ATTEMPTS,
};
