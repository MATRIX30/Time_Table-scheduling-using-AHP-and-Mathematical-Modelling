"use server";
import { getDatabase } from "@/lib/database";
import { IAdminPreference } from "@/models/AdminPreference";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";


export const revalidatePage = (page: string) => {
  return revalidatePath(page);
};

export async function getAdminPreferences(): Promise<any[]> {
 
  try {
    const db = await getDatabase();
    if (!db) {
      return [];
    }
    const adminPreferences = await db.collection("adminPreferences").find({}).toArray();
    return adminPreferences;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAdminPreference(id: string): Promise<any | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      return null;
    }

    const preference = await db.collection("adminPreferences").findOne({ _id: new ObjectId(id) });
    return preference;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export async function createAdminPreference(
  body: IAdminPreference
): Promise<any> {
  try {
    const db = await getDatabase();
    if (!db) {
      return;
    }
    const newPreference = await db.collection("adminPreferences").insertOne({...body,_id: new ObjectId()});
    
    revalidatePath("/");

    return await getAdminPreference(newPreference.insertedId.toString());
  } catch (error: any) {
    throw new Error(error.message);
  }
}


// Update AdminPreference
export async function updateAdminPreference(
  id: string,
  pref: Partial<IAdminPreference>
): Promise<IAdminPreference | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      return null;
    }

    const result = await db.collection("adminPreferences").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: pref },
    );

    return result?.value as IAdminPreference | null;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Delete AdminPreference
export async function deleteAdminPreference(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (!db) {
      return false;
    }

    const result = await db.collection("adminPreferences").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
}