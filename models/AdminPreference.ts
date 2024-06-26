import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the admin preferences
export interface IAdminPreference extends Document {
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  preferenceNumberOfHours: number;
}

// Define the admin preference schema
export const adminPreferenceSchema: Schema = new Schema({
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
    validate: {
      validator: (value: number) => value % 3 === 0,
      message: 'Preferred number of hours must be a multiple of 3',
    },
  },
});

// Define the AdminPreference model
let AdminPreference: mongoose.Model<IAdminPreference>;
AdminPreference = mongoose.models["adminPreferences"];
// AdminPreference = mongoose.model<IAdminPreference>(
//   "adminPreferences",
//   adminPreferenceSchema
// );
// if (!mongoose.models["adminPreferences"]) {
//   AdminPreference = mongoose.model<IAdminPreference>(
//     "adminPreferences",
//     adminPreferenceSchema
//   );
// } else {
//   AdminPreference = mongoose.models["adminPreferences"];
// }

// Export the StudentPreference model
export default AdminPreference;
