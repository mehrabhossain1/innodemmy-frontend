import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db/connection";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, transactionId, paymentNumberLastDigits, paymentMethod, courseId, courseTitle, amount } =
            await request.json();

        // Validate required fields
        if (!name || !email || !phone || !transactionId || !paymentNumberLastDigits || !paymentMethod) {
            return NextResponse.json(
                {
                    error: "All fields are required: name, email, phone, transactionId, paymentNumberLastDigits, paymentMethod",
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

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
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

        // Validate payment number last digits (must be 4 digits)
        const lastDigitsRegex = /^[0-9]{4}$/;
        if (!lastDigitsRegex.test(paymentNumberLastDigits)) {
            return NextResponse.json(
                { error: "Payment number last digits must be exactly 4 digits" },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const enrollmentsCollection = db.collection("enrollments");

        // Check if this phone number already enrolled for this course
        if (courseId) {
            // Validate if courseId is a valid ObjectId format
            let courseObjectId = null;
            try {
                if (ObjectId.isValid(courseId)) {
                    courseObjectId = new ObjectId(courseId);
                }
            } catch (error) {
                // If courseId is not valid ObjectId, we'll store it as string
                console.log("CourseId is not a valid ObjectId, will store as string");
            }

            if (courseObjectId) {
                const existingEnrollment = await enrollmentsCollection.findOne({
                    phone,
                    courseId: courseObjectId,
                    status: { $in: ["pending", "approved"] },
                });

                if (existingEnrollment) {
                    return NextResponse.json(
                        { error: "You have already enrolled in this course with this phone number." },
                        { status: 400 }
                    );
                }
            }
        }

        // Create the enrollment record
        // Handle courseId - convert to ObjectId if valid, otherwise store as string or null
        let finalCourseId = null;
        if (courseId) {
            try {
                if (ObjectId.isValid(courseId)) {
                    finalCourseId = new ObjectId(courseId);
                } else {
                    // Store as string if not valid ObjectId format
                    finalCourseId = courseId;
                }
            } catch (error) {
                // If conversion fails, store as string
                finalCourseId = courseId;
            }
        }

        const enrollmentData = {
            name,
            email,
            phone,
            transactionId,
            paymentNumberLastDigits,
            paymentMethod,
            courseId: finalCourseId,
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
