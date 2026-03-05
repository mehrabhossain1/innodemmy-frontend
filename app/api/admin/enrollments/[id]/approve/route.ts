import { NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/utils/auth-middleware";
import { approveEnrollment } from "@/lib/services/enrollments";
import { findUserById } from "@/lib/db/users";
import { findCourseById } from "@/lib/db/courses";
import { sendEnrollmentApprovalEmail } from "@/lib/utils/mailer";

export const POST = withAuth(
    async (
        request: AuthenticatedRequest,
        { params }: { params: Promise<{ id: string }> },
    ) => {
        try {
            const user = request.user!;
            const { id } = await params;

            // Check if user is admin
            if (user.role !== "admin") {
                return NextResponse.json(
                    { error: "Unauthorized. Admin access required." },
                    { status: 403 },
                );
            }

            // Approve enrollment
            const enrollment = await approveEnrollment(id, user.userId);

            // Send approval email to user
            try {
                if (enrollment) {
                    // Get user and course details for the email
                    const enrolledUser = enrollment.userId
                        ? await findUserById(enrollment.userId.toString())
                        : null;
                    const course = enrollment.courseId
                        ? await findCourseById(enrollment.courseId.toString())
                        : null;

                    // Determine the email recipient
                    const recipientEmail =
                        enrolledUser?.email ||
                        (enrollment as Record<string, unknown>).email;
                    const recipientName =
                        enrolledUser?.name ||
                        (enrollment as Record<string, unknown>).name ||
                        "Student";

                    if (recipientEmail && typeof recipientEmail === "string") {
                        await sendEnrollmentApprovalEmail({
                            userName: String(recipientName),
                            userEmail: recipientEmail,
                            courseTitle:
                                course?.title ||
                                ((enrollment as Record<string, unknown>)
                                    .courseTitle as string) ||
                                "Your Course",
                            amount: (enrollment.amount as number) || 0,
                            paymentMethod:
                                (enrollment.paymentMethod as string) || "N/A",
                            transactionId:
                                (enrollment.transactionId as string) || "N/A",
                        });
                        console.log(
                            `Approval email sent to ${recipientEmail} for enrollment ${id}`,
                        );
                    } else {
                        console.warn(
                            `No email address found for enrollment ${id}, skipping email`,
                        );
                    }
                }
            } catch (emailError) {
                // Don't fail the approval if email sending fails
                console.error("Failed to send approval email:", emailError);
            }

            return NextResponse.json({
                enrollment,
                message: "Enrollment approved successfully",
            });
        } catch (error) {
            console.error("Approve enrollment error:", error);

            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return NextResponse.json(
                        { error: error.message },
                        { status: 404 },
                    );
                }
                if (error.message.includes("already")) {
                    return NextResponse.json(
                        { error: error.message },
                        { status: 400 },
                    );
                }
            }

            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 },
            );
        }
    },
);
