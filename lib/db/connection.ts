/**
 * MongoDB Connection
 * Handles database connection with connection pooling
 */
import { MongoClient, Db } from 'mongodb';

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set in environment variables. Add it to your .env file.'
    );
  }
  return uri;
}

const options = {};

let client: MongoClient;

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoDbConnectionPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoDbConnectionPromise) {
      const uri = getUri();
      client = new MongoClient(uri, options);
      globalWithMongo._mongoDbConnectionPromise = client.connect();
    }
    return globalWithMongo._mongoDbConnectionPromise;
  } else {
    client = new MongoClient(getUri(), options);
    return client.connect();
  }
}

const clientPromise = getClientPromise();

export default clientPromise;

/**
 * Get the database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('innodemybackend');
}
