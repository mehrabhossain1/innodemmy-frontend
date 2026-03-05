import { NextRequest, NextResponse } from "next/server";
import { registerDirect } from "@/lib/services/auth";
import { withRateLimit, RATE_LIMITS } from "@/lib/utils/rate-limit";

async function signupHandler(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validate required fields
        if (!email || !password || !name) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email, password, and name are required",
                },
                { status: 400 },
            );
        }

        // Register user directly (no email verification required)
        const result = await registerDirect({
            email,
            password,
            name,
            role: "student",
        });

        return NextResponse.json({
            success: true,
            message: result.message,
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        console.error(
            "Signup error:",
            error instanceof Error ? error.message : "Unknown error",
        );

        // Handle specific errors
        if (error instanceof Error) {
            if (error.message.includes("already exists")) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "User with this email already exists",
                    },
                    { status: 400 },
                );
            }

            if (error.message.includes("Invalid email format")) {
                return NextResponse.json(
                    { success: false, error: "Invalid email format" },
                    { status: 400 },
                );
            }
        }

        return NextResponse.json(
            { success: false, error: "Registration failed. Please try again." },
            { status: 500 },
        );
    }
}

export const POST = withRateLimit(RATE_LIMITS.SIGNUP, signupHandler);
