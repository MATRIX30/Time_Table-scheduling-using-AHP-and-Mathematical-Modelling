import mongoose from "mongoose";

const connection:{isConnected?:number} = {};


async function dbConnect() {
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect(process.env.MONGODB_URI!)
    console.log("Connected : ", db.connections[0].readyState)
    connection.isConnected = db.connections[0].readyState
}

console.log({connection})

export default dbConnect