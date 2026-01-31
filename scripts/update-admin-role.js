/**
 * Script to update user role to admin
 * Run this with: node scripts/update-admin-role.js
 */

import { MongoClient, ObjectId } from 'mongodb';

async function updateAdminRole() {
  // MongoDB URI
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Innodemy:AYJVHcO9pTk9EQFi@cluster0.tu0m3om.mongodb.net/innodemybackend?retryWrites=true&w=majority&appName=Cluster0';

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');

    // Update user with email admin@innodemy.com to have admin role
    const userId = new ObjectId('68f61fa29374cb0424cdee01');

    console.log('Updating user role to admin...');
    const result = await usersCollection.updateOne(
      { _id: userId },
      {
        $set: {
          role: 'admin',
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount > 0) {
      console.log(`✅ Successfully updated user role to admin`);

      // Verify the update
      const updatedUser = await usersCollection.findOne(
        { _id: userId },
        { projection: { password: 0 } }
      );

      console.log('\nUpdated user details:');
      console.log('Email:', updatedUser.email);
      console.log('Phone:', updatedUser.phone);
      console.log('Name:', updatedUser.name);
      console.log('Role:', updatedUser.role);
    } else {
      console.log('❌ User not found');
    }

  } catch (error) {
    console.error('❌ Error updating user role:', error);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

updateAdminRole();
