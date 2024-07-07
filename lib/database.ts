import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export const connectToDatabase = async () => {
  if (connection.isConnected) {
    return;
  }


  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected: ', db.connections[0].readyState);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const getDatabase = async () => {
  await connectToDatabase();
  return mongoose.connection.db;
};
