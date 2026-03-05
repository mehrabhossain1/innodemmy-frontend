import { NextRequest, NextResponse } from "next/server";
import { getAllConsultationRequests } from "@/lib/db/consultation-requests";
import { verifyAuth } from "@/lib/utils/auth-middleware";

export async function GET(request: NextRequest) {
    try {
        // Verify user is admin
        const authResult = await verifyAuth(request);

        if (!authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 },
            );
        }

        const requests = await getAllConsultationRequests();

        // Transform _id to string for JSON serialization
        const formattedRequests = requests.map((req) => ({
            ...req,
            _id: req._id?.toString(),
        }));

        return NextResponse.json({
            requests: formattedRequests,
            total: formattedRequests.length,
        });
    } catch (error) {
        console.error("Get consultation requests error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
