import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db/connection";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const { name, phone, transactionId, paymentMethod, courseId, courseTitle, amount } =
            await request.json();

        // Validate required fields
        if (!name || !phone || !transactionId || !paymentMethod) {
            return NextResponse.json(
                {
                    error: "All fields are required: name, phone, transactionId, paymentMethod",
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

        // Validate phone number format (Bangladeshi)
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { error: "Invalid phone number format. Must be 11 digits starting with 01" },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const enrollmentsCollection = db.collection("enrollments");

        // Check if this phone number already enrolled for this course
        if (courseId) {
            const existingEnrollment = await enrollmentsCollection.findOne({
                phone,
                courseId: new ObjectId(courseId),
                status: { $in: ["pending", "approved"] },
            });

            if (existingEnrollment) {
                return NextResponse.json(
                    { error: "You have already enrolled in this course with this phone number." },
                    { status: 400 }
                );
            }
        }

        // Create the enrollment record
        const enrollmentData = {
            name,
            phone,
            transactionId,
            paymentMethod,
            courseId: courseId ? new ObjectId(courseId) : null,
            courseTitle: courseTitle || "Unknown Course",
            amount: amount || 0,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await enrollmentsCollection.insertOne(enrollmentData);

        return NextResponse.json(
            {
                success: true,
                enrollmentId: result.insertedId,
                message:
                    "Enrollment request submitted successfully. We will verify your payment and contact you within 24 hours.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create public enrollment error:", error);

        return NextResponse.json(
            { error: "An error occurred while submitting your enrollment. Please try again." },
            { status: 500 }
        );
    }
}
