/**
 * Authentication service
 * Handles login, registration, JWT token management, and OTP verification
 */
import jwt, { JwtPayload } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/password";
import {
    findUserByIdentifierWithPassword,
    findUserByIdentifier,
    createUser,
    userExists,
    updateVerificationCode,
    markUserAsVerified,
    updateResetPasswordCode,
    clearResetPasswordCode,
    incrementOTPAttempts,
    updateUserPassword,
} from "../db/users";
import {
    generateOTP,
    hashOTP,
    verifyOTP,
    isOTPExpired,
    canAttemptOTP,
    generateOTPExpiry,
} from "./otp";
import {
    sendVerificationEmail,
    sendPasswordResetEmail,
    resendVerificationEmail,
} from "./email";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface DecodedToken extends JwtPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * Register a new user (Direct registration without email verification)
 */
export async function registerDirect(data: {
    name: string;
    email: string;
    password: string;
    role?: "student" | "admin";
}) {
    // Validate input
    if (!data.email || !data.password || !data.name) {
        throw new Error("Email, password, and name are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
    }

    // Check if user already exists
    const exists = await userExists(data.email);
    if (exists) {
        throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create verified user directly
    const user = await createUser({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || "student",
        isVerified: true, // Mark as verified immediately
        verificationCode: undefined,
        verificationCodeExpiry: undefined,
        otpAttempts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    if (!user) {
        throw new Error("Failed to create user");
    }

    // Get user without password
    const userWithoutPassword = await findUserByIdentifier(data.email);
    if (!userWithoutPassword) {
        throw new Error("User not found");
    }

    // Generate token
    const token = generateToken({
        _id: userWithoutPassword._id?.toString(),
        email: userWithoutPassword.email,
        role: userWithoutPassword.role,
    });

    return {
        user: {
            ...userWithoutPassword,
            _id: userWithoutPassword._id?.toString(),
        },
        token,
        success: true,
        message: "Registration successful!",
    };
}

/**
 * Register a new user (Step 1: Create unverified user and send OTP)
 */
export async function register(data: {
    name: string;
    email: string;
    password: string;
    role?: "student" | "admin";
}) {
    // Validate input
    if (!data.email || !data.password || !data.name) {
        throw new Error("Email, password, and name are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
    }

    // Check if user already exists
    const exists = await userExists(data.email);
    if (exists) {
        throw new Error("User with this email already exists");
    }

    // Generate OTP
    const otpCode = generateOTP();
    const hashedOTP = await hashOTP(otpCode);
    const otpExpiry = generateOTPExpiry();

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create unverified user
    const user = await createUser({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || "student",
        isVerified: false,
        verificationCode: hashedOTP,
        verificationCodeExpiry: otpExpiry,
        otpAttempts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    if (!user) {
        throw new Error("Failed to create user");
    }

    // Send verification email
    try {
        await sendVerificationEmail(data.email, otpCode, data.name);
    } catch (error) {
        console.error("Failed to send verification email:", error);
        throw new Error("Failed to send verification email. Please try again.");
    }

    return {
        success: true,
        message:
            "Registration successful. Please check your email for the verification code.",
        email: data.email,
    };
}

/**
 * Verify email with OTP code (Step 2: Verify OTP and mark user as verified)
 */
export async function verifyEmail(email: string, code: string) {
    // Validate input
    if (!email || !code) {
        throw new Error("Email and verification code are required");
    }

    // Find user with password
    const user = await findUserByIdentifierWithPassword(email);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if already verified
    if (user.isVerified) {
        throw new Error("Email is already verified");
    }

    // Check if verification code exists
    if (!user.verificationCode || !user.verificationCodeExpiry) {
        throw new Error(
            "No verification code found. Please request a new code."
        );
    }

    // Check if OTP has expired
    if (isOTPExpired(user.verificationCodeExpiry)) {
        throw new Error(
            "Verification code has expired. Please request a new code."
        );
    }

    // Check if max attempts exceeded
    if (!canAttemptOTP(user.otpAttempts)) {
        throw new Error(
            "Maximum verification attempts exceeded. Please request a new code."
        );
    }

    // Verify OTP
    const isValid = await verifyOTP(code, user.verificationCode);
    if (!isValid) {
        // Increment attempts
        await incrementOTPAttempts(email);
        const remainingAttempts = 3 - (user.otpAttempts + 1);
        throw new Error(
            `Invalid verification code. ${remainingAttempts} attempt(s) remaining.`
        );
    }

    // Mark user as verified
    await markUserAsVerified(email);

    // Get user without password
    const verifiedUser = await findUserByIdentifier(email);
    if (!verifiedUser) {
        throw new Error("User not found");
    }

    // Generate token
    const token = generateToken({
        _id: verifiedUser._id?.toString(),
        email: verifiedUser.email,
        role: verifiedUser.role,
    });

    return {
        user: {
            ...verifiedUser,
            _id: verifiedUser._id?.toString(),
        },
        token,
        message: "Email verified successfully!",
    };
}

/**
 * Resend verification OTP
 */
export async function resendVerificationOTP(email: string) {
    // Validate input
    if (!email) {
        throw new Error("Email is required");
    }

    // Find user
    const user = await findUserByIdentifier(email);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if already verified
    if (user.isVerified) {
        throw new Error("Email is already verified");
    }

    // Generate new OTP
    const otpCode = generateOTP();
    const hashedOTP = await hashOTP(otpCode);
    const otpExpiry = generateOTPExpiry();

    // Update verification code
    await updateVerificationCode(email, hashedOTP, otpExpiry);

    // Resend verification email
    try {
        await resendVerificationEmail(email, otpCode, user.name);
    } catch (error) {
        console.error("Failed to resend verification email:", error);
        throw new Error("Failed to send verification email. Please try again.");
    }

    return {
        success: true,
        message:
            "Verification code resent successfully. Please check your email.",
    };
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string) {
    // Validate input
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Find user with password
    const user = await findUserByIdentifierWithPassword(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid credentials");
    }

    // Get user without password
    const userWithoutPassword = await findUserByIdentifier(email);
    if (!userWithoutPassword) {
        throw new Error("User not found");
    }

    // Generate token
    const token = generateToken({
        _id: userWithoutPassword._id?.toString(),
        email: userWithoutPassword.email,
        role: userWithoutPassword.role,
    });

    return {
        user: {
            ...userWithoutPassword,
            _id: userWithoutPassword._id?.toString(),
        },
        token,
    };
}

/**
 * Request password reset (send OTP to email)
 */
export async function requestPasswordReset(email: string) {
    // Validate input
    if (!email) {
        throw new Error("Email is required");
    }

    // Find user
    const user = await findUserByIdentifier(email);
    if (!user) {
        // Don't reveal if user exists or not for security
        return {
            success: true,
            message:
                "If an account with this email exists, a password reset code has been sent.",
        };
    }

    // Generate OTP
    const otpCode = generateOTP();
    const hashedOTP = await hashOTP(otpCode);
    const otpExpiry = generateOTPExpiry();

    // Update reset password code
    await updateResetPasswordCode(email, hashedOTP, otpExpiry);

    // Send password reset email
    try {
        await sendPasswordResetEmail(email, otpCode, user.name);
    } catch (error) {
        console.error("Failed to send password reset email:", error);
        throw new Error(
            "Failed to send password reset email. Please try again."
        );
    }

    return {
        success: true,
        message:
            "If an account with this email exists, a password reset code has been sent.",
    };
}

/**
 * Reset password with OTP code
 */
export async function resetPassword(
    email: string,
    code: string,
    newPassword: string
) {
    // Validate input
    if (!email || !code || !newPassword) {
        throw new Error(
            "Email, verification code, and new password are required"
        );
    }

    // Validate password strength
    if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    // Find user with password
    const user = await findUserByIdentifierWithPassword(email);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if reset code exists
    if (!user.resetPasswordCode || !user.resetPasswordCodeExpiry) {
        throw new Error(
            "No password reset code found. Please request a new code."
        );
    }

    // Check if OTP has expired
    if (isOTPExpired(user.resetPasswordCodeExpiry)) {
        throw new Error(
            "Password reset code has expired. Please request a new code."
        );
    }

    // Check if max attempts exceeded
    if (!canAttemptOTP(user.otpAttempts)) {
        throw new Error(
            "Maximum verification attempts exceeded. Please request a new code."
        );
    }

    // Verify OTP
    const isValid = await verifyOTP(code, user.resetPasswordCode);
    if (!isValid) {
        // Increment attempts
        await incrementOTPAttempts(email);
        const remainingAttempts = 3 - (user.otpAttempts + 1);
        throw new Error(
            `Invalid verification code. ${remainingAttempts} attempt(s) remaining.`
        );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await updateUserPassword(email, hashedPassword);

    // Clear reset code
    await clearResetPasswordCode(email);

    return {
        success: true,
        message:
            "Password reset successfully. You can now login with your new password.",
    };
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(user: {
    _id?: string;
    email: string;
    role: string;
}): string {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): DecodedToken | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as DecodedToken;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(
    authHeader: string | null
): string | null {
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }
    return null;
}
