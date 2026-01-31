/**
 * Script to drop all users from the database
 * Run this with: node scripts/drop-users.js
 */

import { MongoClient } from 'mongodb';

async function dropAllUsers() {
  // Read MongoDB URI from environment or use hardcoded value
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Innodemy:AYJVHcO9pTk9EQFi@cluster0.tu0m3om.mongodb.net/innodemybackend?retryWrites=true&w=majority&appName=Cluster0';

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');

    // Drop all users
    console.log('Dropping all users...');
    const result = await usersCollection.deleteMany({});

    console.log(`✅ Successfully deleted ${result.deletedCount} users from the database`);

    // Optionally, recreate indexes
    console.log('Recreating indexes...');
    await usersCollection.dropIndexes();
    await usersCollection.createIndex({ email: 1 }, { unique: true, sparse: true });
    await usersCollection.createIndex({ phone: 1 }, { unique: true, sparse: true });
    console.log('✅ Indexes recreated successfully');

  } catch (error) {
    console.error('❌ Error dropping users:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

dropAllUsers();
