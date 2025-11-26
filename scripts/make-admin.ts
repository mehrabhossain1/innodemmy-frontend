import { MongoClient, ObjectId } from "mongodb";

// Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env file");
    process.exit(1);
}

async function makeUserAdmin(userId: string) {
    const client = new MongoClient(MONGODB_URI!);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected successfully");

        const db = client.db("innodemybackend");
        const usersCollection = db.collection("users");

        // Update the user role
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    role: "admin",
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            console.log(`No user found with ID: ${userId}`);
        } else if (result.modifiedCount === 0) {
            console.log(`User ${userId} already has admin role`);
        } else {
            console.log(`✓ Successfully updated user ${userId} to admin role`);

            // Fetch and display the updated user
            const updatedUser = await usersCollection.findOne(
                { _id: new ObjectId(userId) },
                { projection: { password: 0 } }
            );

            console.log("\nUpdated user:");
            console.log(JSON.stringify(updatedUser, null, 2));
        }
    } catch (error) {
        console.error("Error updating user:", error);
        process.exit(1);
    } finally {
        await client.close();
        console.log("\nDatabase connection closed");
    }
}

// The user ID from the provided document
const userId = "68f6384d844d515f61ec2333";

makeUserAdmin(userId);
