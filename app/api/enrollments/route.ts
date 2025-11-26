import { NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/utils/auth-middleware";
import {
    listEnrollmentsByUser,
    createNewEnrollment,
} from "@/lib/services/enrollments";
import { findCourseById } from "@/lib/db/courses";

export const GET = withAuth(async (request: AuthenticatedRequest) => {
    try {
        const user = request.user!;

        // Get user's enrollments
        const enrollments = await listEnrollmentsByUser(user.userId);

        // Populate course information for each enrollment
        const enrollmentsWithCourses = await Promise.all(
            enrollments.map(async (enrollment) => {
                const course = await findCourseById(enrollment.courseId);
                return {
                    ...enrollment,
                    course: course || null,
                };
            })
        );

        return NextResponse.json({ enrollments: enrollmentsWithCourses });
    } catch (error) {
        console.error("Get enrollments error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
});

export const POST = withAuth(async (request: AuthenticatedRequest) => {
    try {
        const user = request.user!;
        const { courseId, paymentMethod, transactionId, amount } =
            await request.json();

        // Validate required fields
        if (!courseId || !paymentMethod || !transactionId || !amount) {
            return NextResponse.json(
                {
                    error: "Missing required fields: courseId, paymentMethod, transactionId, amount",
                },
                { status: 400 }
            );
        }

        // Validate payment method
        if (!["bkash", "nagad"].includes(paymentMethod)) {
            return NextResponse.json(
                { error: 'Invalid payment method. Must be "bkash" or "nagad"' },
                { status: 400 }
            );
        }

        // Create enrollment
        const enrollment = await createNewEnrollment({
            userId: user.userId,
            courseId,
            paymentMethod,
            transactionId,
            amount: Number(amount),
        });

        return NextResponse.json(
            {
                enrollment,
                message:
                    "Enrollment request submitted successfully. Admin will approve within 24 hours.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create enrollment error:", error);

        // Handle specific errors
        if (error instanceof Error) {
            if (error.message.includes("already")) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }

            if (error.message.includes("not found")) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 404 }
                );
            }

            if (error.message.includes("required")) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
});
