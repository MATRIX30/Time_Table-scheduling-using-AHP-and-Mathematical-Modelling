import mongoose, { Document, Schema } from 'mongoose';

// Define the LecturerPreference interface
export interface ILecturerPreference extends Document {
  teacher: string;
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  PreferenceNumberOfHours: number;
}

// Define the LecturerPreference schema
export const lecturerPreferenceSchema: Schema = new mongoose.Schema({
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
  PreferenceNumberOfHours: {
    type: Number,
    required: true,
    min: 3,
    max: 15,
    multiple: 3,
    validate: {
      validator: (value: number) => value % 3 === 0,
      message: 'Preferred number of hours must be a multiple of 3',
    },
  },
  teacher:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Define the LecturerPreference model
let LecturerPreference: mongoose.Model<ILecturerPreference>;

if (!mongoose.models['lecturerPreferences']) {
  LecturerPreference = mongoose.model<ILecturerPreference>('lecturerPreferences', lecturerPreferenceSchema);
} else {
  LecturerPreference = mongoose.models['lecturerPreferences'];
}

// Export the LecturerPreference model
export default LecturerPreference;
