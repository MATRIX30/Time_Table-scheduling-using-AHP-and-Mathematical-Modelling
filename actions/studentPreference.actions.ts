"use server"
import dbConnect from '@/lib/dbConnect';
import StudentPreference from '@/models/StudentPreference';


export async function createStudentPreference(
  studentPreferenceData: Partial<StudentPreference>
): Promise<StudentPreference> {
  await dbConnect();

  try {
    const newStudentPreference = new StudentPreference(studentPreferenceData);
    await newStudentPreference.save();
    return JSON.parse(JSON.stringify(newStudentPreference)) as StudentPreference;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getStudentPreference(
  studentPreferenceId: string
): Promise<StudentPreference> {
  await dbConnect();

  try {
    const lecturerPreference = await StudentPreference.findById(studentPreferenceId);
    return JSON.parse(JSON.stringify(lecturerPreference)) as StudentPreference;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateStudentPreference(
  studentPreferenceId: string,
  updateData: Partial<StudentPreference>
): Promise<StudentPreference> {
  await dbConnect();

  try {
    const updatedStudentPreference = await StudentPreference.findByIdAndUpdate(
      studentPreferenceId,
      updateData,
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedStudentPreference)) as StudentPreference;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteStudentPreference(
  studentPreferenceId: string
): Promise<StudentPreference> {
  await dbConnect();

  try {
    const deletedStudentPreference = await StudentPreference.findByIdAndDelete(
      studentPreferenceId
    );
    return JSON.parse(JSON.stringify(deletedStudentPreference)) as StudentPreference;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllStudentPreferences(): Promise<StudentPreference[]> {
  await dbConnect();

  try {
    const lecturerPreferences = await StudentPreference.find();
    return JSON.parse(JSON.stringify(lecturerPreferences)) as StudentPreference[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}
