import mongoose, { Document, Schema } from "mongoose";

// Define the StudentPreference interface
export interface IAdminPreference extends Document {
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  PreferenceNumberOfHours: number;
  admin: string;
}

// Define the AdminPreference schema
export const adminPreferenceSchema: Schema = new mongoose.Schema({
  courseOnMorning: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  courseOnEvening: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  havingDaysOff: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  preferenceNumberOfHours: {
    type: Number,
    required: true,
    min: 3,
    max: 15,
    multiple: 3,
    validate: {
      validator: (value: number) => value % 3 === 0,
      message: "Preferred number of hours must be a multiple of 3",
    },
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
});

// Define the AdminPreference model
let AdminPreference: mongoose.Model<IAdminPreference>;

if (!mongoose.models["adminPreferences"]) {
  AdminPreference = mongoose.model<IAdminPreference>(
    "adminPreferences",
    adminPreferenceSchema
  );
} else {
  AdminPreference = mongoose.models["adminPreferences"];
}

// Export the StudentPreference model
export default AdminPreference;
