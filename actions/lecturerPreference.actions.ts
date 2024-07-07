"use server"
import { getDatabase } from '@/lib/database';


export async function getAllLecturerPreferences(): Promise<any[]> {

  try {
    const db = await getDatabase();
    if (!db) {
      return [];
    }
    const lecturerPreferences = await db.collection("lecturerPreferences").find({}).toArray();
    return lecturerPreferences;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
