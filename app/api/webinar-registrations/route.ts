import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const {
            webinarId,
            webinarTitle,
            webinarDate,
            webinarTime,
            fullName,
            email,
            phone,
            qualification,
            institution,
        } = await request.json();

        // Validate required fields
        if (
            !webinarId ||
            !fullName ||
            !email ||
            !phone ||
            !qualification ||
            !institution
        ) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate phone number (basic validation for 11 digits)
        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { error: "Phone number must be 11 digits" },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const registrationsCollection = db.collection("webinar_registrations");

        // Check if phone number already exists for this webinar
        const existingRegistration = await registrationsCollection.findOne({
            webinarId,
            phone,
        });

        if (existingRegistration) {
            return NextResponse.json(
                {
                    error: "This phone number is already registered for this webinar",
                },
                { status: 409 }
            );
        }

        // Create new registration
        const registration = {
            webinarId,
            webinarTitle: webinarTitle || "",
            webinarDate: webinarDate || "",
            webinarTime: webinarTime || "",
            fullName,
            email,
            phone,
            qualification,
            institution,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await registrationsCollection.insertOne(registration);

        console.log("Registration saved successfully:", {
            id: result.insertedId,
            webinarId,
            fullName,
        });

        return NextResponse.json(
            {
                message: "Registration successful",
                registrationId: result.insertedId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Webinar registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
