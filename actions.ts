"use server";
import dbConnect from "@/lib/dbConnect";
import Preference, { IPreferences } from "@/models/Prefernces";

export async function getPreferences() {
  await dbConnect();
  try {
    const preferences = await Preference.find({});
    return preferences;
  } catch (error: any) {
    return error.message;
  }
}

export async function createPreference(body:any) {
  await dbConnect();
  try {
    
    const newPreference = await Preference.create(body);
    return newPreference;
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
    return updatedPreference;
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
    return deletedPreference;
  } catch (error: any) {
    return error.message;
  }
}
