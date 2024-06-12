"use server";
import dbConnect from "@/lib/dbConnect";
import Preference, { IPreferences } from "@/models/Prefernces";
import { revalidatePath } from "next/cache";

export const revalidatePage = (page:string)=>{
  return revalidatePath(page)
}

export async function getPreferences() {
  await dbConnect();
  try {
    const preferences = await Preference.find({});
    return preferences.map(pref=>JSON.parse(JSON.stringify(pref.toJSON())));
  } catch (error: any) {
    return error.message;
  }
}

export async function createPreference(body:PrferenceType) {
  await dbConnect();
  try {
    
    const newPreference = await Preference.create(body);
    revalidatePath("/")

    return JSON.parse(JSON.stringify(newPreference.toJSON())) as PrferenceType;
  } catch (error: any) {
    return error.message;
  }
}

// Update Preference
export async function updatePreference(
  id: string,
  pref: Partial<IPreferences>
) {
  await dbConnect();
  try {
    const updatedPreference = await Preference.findByIdAndUpdate(id, pref, {
      new: true,
      runValidators: true,
    });
    if (!updatedPreference) {
      throw new Error("Preference not found");
    }
    revalidatePath("/")

    return JSON.parse(JSON.stringify(updatedPreference.toJSON()));
  } catch (error: any) {
    return error.message;
  }
}

// Delete Preference
export async function deletePreference(id: string) {
  await dbConnect();
  try {
    const deletedPreference = await Preference.findByIdAndDelete(id);
    if (!deletedPreference) {
      throw new Error("Preference not found");
    }
    revalidatePath("/")
    return JSON.parse(JSON.stringify(deletedPreference.toJSON()));
  } catch (error: any) {
    return error.message;
  }
}
