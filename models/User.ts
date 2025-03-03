import mongoose, { Document, Schema } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  created_at: Date;
}

// Define the User schema
export const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    trim: true, // Remove whitespace from the start and end
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    trim: true, // Remove whitespace from the start and end
  },
  password: {
    type: String,
    required: true,
  },
  
  created_at: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

// Define the User model
let User: mongoose.Model<IUser>;

if (!mongoose.models["SuperAdminUser"]) {
  User = mongoose.model<IUser>("SuperAdminUser", userSchema);
} else {
  User = mongoose.models["SuperAdminUser"];
}

// Export the User model
export default User;
