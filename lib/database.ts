import mongoose from 'mongoose';

const connection: { isConnected?: number, db?: mongoose.Connection } = {};

export const connectToDatabase = async () => {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected: ', db.connections[0].readyState);
    connection.isConnected = db.connections[0].readyState;
    connection.db = db.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const getDatabase = async (databaseName?: string) => {
  await connectToDatabase();
  return databaseName ? connection.db?.useDb(databaseName) : mongoose.connection.db;
};
