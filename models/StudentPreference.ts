import mongoose, { Document, Schema } from 'mongoose';

// Define the StudentPreference interface
export interface IStudentPreference extends Document {
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  studentId: string;
}

// Define the StudentPreference schema
export const studentPreferenceSchema: Schema = new mongoose.Schema({
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
  studentId:{
    type: Schema.Types.ObjectId,
    ref: 'students',
    required: true
  }
});

// Define the StudentPreference model
let StudentPreference: mongoose.Model<IStudentPreference>;

if (!mongoose.models['StudentPreferences']) {
  StudentPreference = mongoose.model<IStudentPreference>('StudentPreferences', studentPreferenceSchema);
} else {
  StudentPreference = mongoose.models['StudentPreferences'];
}

// Export the StudentPreference model
export default StudentPreference;
