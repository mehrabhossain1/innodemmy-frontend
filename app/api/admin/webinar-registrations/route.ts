import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/utils/auth-middleware";

export async function GET(request: NextRequest) {
    try {
        // Verify user is admin
        const authResult = await verifyAuth(request);
        if (!authResult.user || authResult.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 }
            );
        }

        const db = await getDatabase();
        const registrationsCollection = db.collection("webinar_registrations");

        // Get all registrations, sorted by creation date (newest first)
        const registrations = await registrationsCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Transform _id to string for JSON serialization
        const formattedRegistrations = registrations.map((reg) => ({
            ...reg,
            _id: reg._id.toString(),
        }));

        return NextResponse.json({
            registrations: formattedRegistrations,
        });
    } catch (error) {
        console.error("Get webinar registrations error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
