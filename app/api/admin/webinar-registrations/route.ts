import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/utils/auth-middleware";

export async function GET(request: NextRequest) {
    try {
        // Verify user is admin
        const authResult = await verifyAuth(request);

        console.log("Auth result:", {
            hasUser: !!authResult.user,
            userRole: authResult.user?.role,
            userId: authResult.user?.userId,
        });

        if (!authResult.user || authResult.user.role !== "admin") {
            console.log("Unauthorized access attempt");
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

        console.log("Found registrations:", registrations.length);

        // Transform _id to string for JSON serialization
        const formattedRegistrations = registrations.map((reg) => ({
            ...reg,
            _id: reg._id.toString(),
        }));

        return NextResponse.json({
            registrations: formattedRegistrations,
            total: formattedRegistrations.length,
        });
    } catch (error) {
        console.error("Get webinar registrations error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
