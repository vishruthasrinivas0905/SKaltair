import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { seedMongo, setMongoReady } from './services/store.js';

const port = Number(process.env.PORT || 4100);
if (process.env.NODE_ENV === 'production') {
  if (!process.env.CLIENT_ORIGIN) throw new Error('CLIENT_ORIGIN must be set in production.');
}
if (process.env.MONGODB_URI) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME || 'skaltair' });
    setMongoReady(true);
    await seedMongo();
    console.info('MongoDB connected. Persistent storage is active.');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1);
  }
} else {
  if (process.env.NODE_ENV === 'production') throw new Error('MONGODB_URI is required in production.');
  console.warn('MONGODB_URI is not set. Running in demo-memory mode; submissions will not persist after restart.');
}

const server = app.listen(port, () => console.info(`SKALTAIR API listening on http://localhost:${port}`));
async function shutdown() { server.close(); if (mongoose.connection.readyState) await mongoose.disconnect(); process.exit(0); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
