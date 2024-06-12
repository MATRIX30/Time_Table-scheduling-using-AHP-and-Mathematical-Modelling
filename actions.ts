"use server"
import { MongoClient, ObjectId } from "mongodb";
// import mongoose from 'mongoose';

export interface Preference {
  _id?: ObjectId;
  hoursWeekend: number;
  equilibreProgrammation: number;
  matiereMultipleProfesseurs: number;
  userId: number;
}

const client = new MongoClient(process.env.DATABASE_URL!, {});


async function connectToDatabase() {
  const db = client.db("admin-preferences");
  return db.collection<Preference>("preferences");
}

export async function createPreference(preference: Preference) {
  const collection = await connectToDatabase();

  if (
    [preference.hoursWeekend, preference.equilibreProgrammation, preference.matiereMultipleProfesseurs].some(
      (value) => value < 0 || value > 10
    )
  ) {
    throw new Error("Values must be between 0 and 10");
  }

  const result = await collection.insertOne(preference);
  return getPreferenceById(result.insertedId.toString())
}

export async function getPreferences() {
  const collection = await connectToDatabase();
  return await collection.find({}).toArray();
}

export async function getPreferenceById(id: string) {
  const collection = await connectToDatabase();
  const preference = await collection.findOne({ _id: new ObjectId(id) });

  if (!preference) {
    throw new Error("Preference not found");
  }

  return preference;
}

export async function updatePreference(id: string, updatedPreference: Partial<Preference>) {
  const collection = await connectToDatabase();

  if (
    [updatedPreference.hoursWeekend, updatedPreference.equilibreProgrammation, updatedPreference.matiereMultipleProfesseurs].some(
      (value) => value !== undefined && (value < 0 || value > 10)
    )
  ) {
    throw new Error("Values must be between 0 and 10");
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedPreference }
  );

  if (result.matchedCount === 0) {
    throw new Error("Preference not found");
  }

  return await getPreferenceById(id);
}

export async function deletePreference(id: string) {
  const collection = await connectToDatabase();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    throw new Error("Preference not found");
  }

  return { message: "Preference deleted successfully"}
}
