import dbConnect from '@/lib/dbConnect';
import LecturerPreference from '@/models/LecturerPreference';

const DB_NAME = 'test';

export async function createLecturerPreference(
  lecturerPreferenceData: Partial<LecturerPreferenceType>
): Promise<LecturerPreferenceType> {
  await dbConnect(DB_NAME);

  try {
    const newLecturerPreference = new LecturerPreference(lecturerPreferenceData);
    await newLecturerPreference.save();
    return JSON.parse(JSON.stringify(newLecturerPreference)) as LecturerPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getLecturerPreference(
  lecturerPreferenceId: string
): Promise<LecturerPreferenceType> {
  await dbConnect(DB_NAME);

  try {
    const lecturerPreference = await LecturerPreference.findById(lecturerPreferenceId);
    return JSON.parse(JSON.stringify(lecturerPreference)) as LecturerPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateLecturerPreference(
  lecturerPreferenceId: string,
  updateData: Partial<LecturerPreferenceType>
): Promise<LecturerPreferenceType> {
  await dbConnect(DB_NAME);

  try {
    const updatedLecturerPreference = await LecturerPreference.findByIdAndUpdate(
      lecturerPreferenceId,
      updateData,
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedLecturerPreference)) as LecturerPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteLecturerPreference(
  lecturerPreferenceId: string
): Promise<LecturerPreferenceType> {
  await dbConnect(DB_NAME);

  try {
    const deletedLecturerPreference = await LecturerPreference.findByIdAndDelete(
      lecturerPreferenceId
    );
    return JSON.parse(JSON.stringify(deletedLecturerPreference)) as LecturerPreferenceType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllLecturerPreferences(): Promise<LecturerPreferenceType[]> {
  await dbConnect(DB_NAME);

  try {
    const lecturerPreferences = await LecturerPreference.find();
    return JSON.parse(JSON.stringify(lecturerPreferences)) as LecturerPreferenceType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}
