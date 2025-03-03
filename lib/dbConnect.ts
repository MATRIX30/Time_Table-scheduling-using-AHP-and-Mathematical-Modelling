import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect(dbName?: string) {
    if (connection.isConnected) {
        return;
    }

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: dbName || undefined, // Use the provided dbName or default to undefined
    };

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!, options);
        console.log("Connected: ", db.connections[0].readyState);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

console.log({ connection });

export default dbConnect;
