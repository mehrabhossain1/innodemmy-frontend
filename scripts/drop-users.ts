/**
 * Script to drop all users from the database
 * Run this with: npx ts-node scripts/drop-users.ts
 */

import { getDatabase } from '../lib/db/connection';

async function dropAllUsers() {
  try {
    console.log('Connecting to database...');
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Drop all users
    console.log('Dropping all users...');
    const result = await usersCollection.deleteMany({});

    console.log(`✅ Successfully deleted ${result.deletedCount} users from the database`);

    // Optionally, recreate indexes
    console.log('Recreating indexes...');
    await usersCollection.createIndex({ email: 1 }, { unique: true, sparse: true });
    await usersCollection.createIndex({ phone: 1 }, { unique: true, sparse: true });
    console.log('✅ Indexes recreated successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error dropping users:', error);
    process.exit(1);
  }
}

dropAllUsers();
