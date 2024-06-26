"use server";
import dbConnect from "@/lib/dbConnect";
import AdminPreference, { IAdminPreference } from "@/models/AdminPreference";
import { revalidatePath } from "next/cache";

export const revalidatePage = (page: string) => {
  return revalidatePath(page);
};

export async function getAdminPreferences(): Promise<AdminstratorPreferenceType[]> {
  await dbConnect();
  try {
    const preferences = await AdminPreference.find({});
    return preferences.map((pref) =>
      JSON.parse(JSON.stringify(pref.toJSON()))
    ) as AdminstratorPreferenceType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createAdminPreference(
  body: AdminstratorPreferenceType
): Promise<AdminstratorPreferenceType> {
  await dbConnect();
  try {
    const newPreference = await AdminPreference.create(body);
    revalidatePath("/");

    return JSON.parse(JSON.stringify(newPreference.toJSON())) as AdminstratorPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Update AdminPreference
export async function updateAdminPreference(
  id: string,
  pref: Partial<IAdminPreference>
): Promise<AdminstratorPreferenceType> {
  await dbConnect();
  try {
    const updatedPreference = await AdminPreference.findByIdAndUpdate(id, pref, {
      new: true,
      runValidators: true,
    });
    if (!updatedPreference) {
      throw new Error("AdminPreference not found");
    }
    revalidatePath("/");

    return JSON.parse(JSON.stringify(updatedPreference.toJSON())) as AdminstratorPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Delete AdminPreference
export async function deleteAdminPreference(id: string): Promise<AdminstratorPreferenceType> {
  await dbConnect();
  try {
    const deletedPreference = await AdminPreference.findByIdAndDelete(id);
    if (!deletedPreference) {
      throw new Error("AdminPreference not found");
    }
    revalidatePath("/");
    return JSON.parse(JSON.stringify(deletedPreference.toJSON()));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
