import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the lecturer preferences
export interface ILecturerPreference extends Document {
  teacher: mongoose.Types.ObjectId;
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  preferenceNumberOfHours: number;
}

// Define the lecturer preference schema
export const lecturerPreferenceSchema: Schema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User collection
  },
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
    max: 7,
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

// Define the LecturerPreference model
let LecturerPreference: mongoose.Model<ILecturerPreference>;
// LecturerPreference = mongoose.model<ILecturerPreference>('lecturerPreferences', lecturerPreferenceSchema);
LecturerPreference = mongoose.models['lecturerPreferences'];

// if (!mongoose.models['lecturerPreferences']) {
// } else {
//   LecturerPreference = mongoose.models['lecturerPreferences'];
// }

// Export the LecturerPreference model
export default LecturerPreference;
