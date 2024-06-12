import mongoose, { Document, Schema } from "mongoose";

export interface IPreferences extends Document {
  hoursWeekend: number;
  equilibreProgrammation: number;
  matiereMultipleProfesseurs: number;
  userId: number;
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
    type: Number,
    required: true, // Correct typo: use 'required' instead of 'require'
  },
});

let Preference: mongoose.Model<IPreferences>;

if (!mongoose.models["Preference"]) {
  Preference = mongoose.model<IPreferences>("Preference", preferenceSchema);
} else {
  Preference = mongoose.models["Preference"];
}

// mongoose.models.Preference || mongoose.model<IPreferences>("Preference", preferenceSchema);

export default Preference;
