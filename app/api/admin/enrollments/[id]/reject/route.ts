import { NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/utils/auth-middleware";
import { rejectEnrollment } from "@/lib/services/enrollments";

export const POST = withAuth(
    async (
        request: AuthenticatedRequest,
        { params }: { params: Promise<{ id: string }> }
    ) => {
        try {
            const user = request.user!;
            const { id } = await params;

            // Check if user is admin
            if (user.role !== "admin") {
                return NextResponse.json(
                    { error: "Unauthorized. Admin access required." },
                    { status: 403 }
                );
            }

            // Reject enrollment
            const enrollment = await rejectEnrollment(id, user.userId);

            return NextResponse.json({
                enrollment,
                message: "Enrollment rejected",
            });
        } catch (error) {
            console.error("Reject enrollment error:", error);

            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return NextResponse.json(
                        { error: error.message },
                        { status: 404 }
                    );
                }
                if (error.message.includes("already")) {
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
    }
);
