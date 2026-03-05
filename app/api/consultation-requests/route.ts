import { NextRequest, NextResponse } from "next/server";
import { createConsultationRequest } from "@/lib/db/consultation-requests";

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, phoneNumber, message } = await request.json();

        // Validate required fields
        if (!fullName || !email || !phoneNumber) {
            return NextResponse.json(
                { error: "Full name, email, and phone number are required" },
                { status: 400 },
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 },
            );
        }

        // Validate phone number format
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        const cleanedPhone = phoneNumber.replace(/[\s\-()]/g, "");
        if (!phoneRegex.test(cleanedPhone)) {
            return NextResponse.json(
                { error: "Invalid phone number format" },
                { status: 400 },
            );
        }

        // Create consultation request
        const requestId = await createConsultationRequest({
            fullName: fullName.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            message: message?.trim() || "",
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json(
            {
                success: true,
                message: "Consultation request submitted successfully",
                requestId,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Consultation request error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
