"use server"
import mongoose from "mongoose";
import { PreferenceSchema } from "./schema";
export const conn = mongoose.createConnection(process.env.DATABASE_URL!);


export const PreferenceModel = conn.model('Preference', PreferenceSchema);