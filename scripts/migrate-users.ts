/**
 * Database Migration Script
 * This script updates existing users to work with the new authentication system:
 * 1. Marks all existing users as verified (isVerified: true)
 * 2. Removes the phone field from all user documents
 * 3. Adds default values for new OTP fields
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

async function migrateUsers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db();
    const usersCollection = db.collection('users');

    // Get count of users before migration
    const totalUsers = await usersCollection.countDocuments({});
    console.log(`\nFound ${totalUsers} users in the database.`);

    if (totalUsers === 0) {
      console.log('No users to migrate. Exiting...');
      return;
    }

    // Drop the old phone index if it exists
    console.log('\nDropping old phone index...');
    try {
      await usersCollection.dropIndex('phone_1');
      console.log('Phone index dropped successfully.');
    } catch (error) {
      console.log('Phone index does not exist or already dropped.');
    }

    // Update all users
    console.log('\nMigrating users...');
    const result = await usersCollection.updateMany(
      {},
      {
        $set: {
          isVerified: true,
          otpAttempts: 0,
          updatedAt: new Date(),
        },
        $unset: {
          phone: '',
          verificationCode: '',
          verificationCodeExpiry: '',
          resetPasswordCode: '',
          resetPasswordCodeExpiry: '',
        },
      }
    );

    console.log(`\nMigration completed successfully!`);
    console.log(`- Modified ${result.modifiedCount} user(s)`);
    console.log(`- All users marked as verified`);
    console.log(`- Phone field removed from all users`);

    // Verify the migration
    console.log('\nVerifying migration...');
    const verifiedUsers = await usersCollection.countDocuments({ isVerified: true });
    const usersWithPhone = await usersCollection.countDocuments({ phone: { $exists: true } });

    console.log(`- Verified users: ${verifiedUsers}/${totalUsers}`);
    console.log(`- Users with phone field: ${usersWithPhone}`);

    if (verifiedUsers === totalUsers && usersWithPhone === 0) {
      console.log('\n✓ Migration verification passed!');
    } else {
      console.log('\n⚠ Warning: Migration may not have completed successfully.');
    }

    // Show sample of migrated users
    console.log('\nSample of migrated users:');
    const samples = await usersCollection
      .find({})
      .limit(3)
      .project({ name: 1, email: 1, role: 1, isVerified: 1, phone: 1 })
      .toArray();

    samples.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Verified: ${user.isVerified}`);
      console.log(`   Phone: ${user.phone || 'N/A (removed)'}`);
    });
  } catch (error) {
    console.error('\nError during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run migration
console.log('='.repeat(60));
console.log('USER MIGRATION SCRIPT');
console.log('='.repeat(60));
console.log('This script will:');
console.log('1. Mark all existing users as verified');
console.log('2. Remove phone field from all users');
console.log('3. Add new authentication fields');
console.log('='.repeat(60));

migrateUsers()
  .then(() => {
    console.log('\n✓ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Migration failed:', error);
    process.exit(1);
  });
