"use server"
import { getDatabase } from '@/lib/database';


export async function getAllStudentPreferences(): Promise<any[]> {
  try {
    const db = await getDatabase();
    if (!db) {
      return [];
    }
    const studentPreferences = await db.collection("studentPreferences").find({}).toArray();
    return studentPreferences;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
