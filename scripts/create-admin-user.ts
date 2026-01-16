import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/innodemmy";

async function createAdminUser() {
    const client = new MongoClient(MONGODB_URI);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected successfully");

        const db = client.db("innodemybackend");
        const usersCollection = db.collection("users");

        const email = "fi.javed5@gmail.com";
        const password = "@fi.javed2025@#";
        const name = "Faisal Javed";

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            console.log(`User with email ${email} already exists`);

            // Update existing user to admin and update password
            await usersCollection.updateOne(
                { email },
                {
                    $set: {
                        password: hashedPassword,
                        role: "admin",
                        isVerified: true,
                        updatedAt: new Date(),
                    },
                }
            );
            console.log(
                `✓ Updated existing user to admin role with new password`
            );
        } else {
            // Create new admin user
            const newUser = {
                email,
                password: hashedPassword,
                name,
                role: "admin",
                isVerified: true,
                otpAttempts: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await usersCollection.insertOne(newUser);
            console.log(
                `✓ Successfully created admin user with ID: ${result.insertedId}`
            );
        }

        // Fetch and display the user (without password)
        const user = await usersCollection.findOne(
            { email },
            { projection: { password: 0 } }
        );

        console.log("\nAdmin user details:");
        console.log(JSON.stringify(user, null, 2));
        console.log("\nYou can now login with:");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    } finally {
        await client.close();
        console.log("\nDatabase connection closed");
    }
}

createAdminUser();
