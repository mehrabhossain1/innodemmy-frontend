import { NextRequest, NextResponse } from "next/server";
import { updateConsultationRequestStatus } from "@/lib/db/consultation-requests";
import { verifyAuth } from "@/lib/utils/auth-middleware";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        // Verify user is admin
        const authResult = await verifyAuth(request);

        if (!authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 },
            );
        }

        const { id } = await params;
        const { status } = await request.json();

        // Validate status
        const validStatuses = ["pending", "contacted", "completed"];
        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json(
                {
                    error: 'Invalid status. Must be "pending", "contacted", or "completed"',
                },
                { status: 400 },
            );
        }

        // Update status
        const success = await updateConsultationRequestStatus(id, status);

        if (!success) {
            return NextResponse.json(
                { error: "Consultation request not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Status updated successfully",
        });
    } catch (error) {
        console.error("Update consultation request status error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
