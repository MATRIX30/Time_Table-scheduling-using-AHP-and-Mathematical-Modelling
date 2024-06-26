import mongoose, { Document, Schema } from "mongoose";

export interface IPreferences extends Document {
  hoursWeekend: number;
  equilibreProgrammation: number;
  matiereMultipleProfesseurs: number;
  userId: string;
}

export const preferenceSchema: Schema = new mongoose.Schema({
  hoursWeekend: {
    type: Number,
    required: true, // Correct typo: use 'required' instead of 'require'
  },
  equilibreProgrammation: {
    type: Number,
    required: true, // Correct typo: use 'required' instead of 'require'
  },
  matiereMultipleProfesseurs: {
    type: Number,
    required: true, // Correct typo: use 'required' instead of 'require'
  },
  userId: {
    type: String,
    required: true, // Correct typo: use 'required' instead of 'require'
  },
});

let Preference: mongoose.Model<IPreferences>;

if (!mongoose.models["AdminPreference"]) {
  Preference = mongoose.model<IPreferences>("AdminPreference", preferenceSchema);
} else {
  Preference = mongoose.models["AdminPreference"];
}

// mongoose.models.Preference || mongoose.model<IPreferences>("Preference", preferenceSchema);

export default Preference;
