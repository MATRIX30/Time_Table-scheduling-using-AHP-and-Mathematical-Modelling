import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the student preferences
export interface IStudentPreference extends Document {
  studentId: mongoose.Types.ObjectId;
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
}

// Define the student preference schema
export const studentPreferenceSchema: Schema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'students', // Assuming you have a students collection
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
    max: 10,
  },
});


// Define the StudentPreference model
let StudentPreference: mongoose.Model<IStudentPreference>;
StudentPreference = mongoose.models['studentPreferences'];

// if (!mongoose.models['studentPreferences']) {
//   StudentPreference = mongoose.model<IStudentPreference>(
//     'studentPreferences',
//     studentPreferenceSchema
//   );
// } else {
//   StudentPreference = mongoose.models['studentPreferences'];
// }

// Export the studentPreferences model
export default StudentPreference;
