import { checkEmail, checkUsername } from "@/actions/users.actions";
import { z } from "zod";

// Define a function to check if the username exists
const checkUsernameExists = async (username: string) => {
  try {
    const usernameExists = await checkUsername(username);
    return !usernameExists;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
};

// Define a function to check if the email exists
const checkEmailExists = async (email: string) => {
  try {
    const emailExists = await checkEmail(email);
    return !emailExists;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

// Define the register schema
export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      // .refine(checkEmailExists, {
      //   message: "Email already exists",
      //   path: ["email"], // Path to show the error message
      // })
      ,
    username: z.string().min(5,"Username should be atleast 5 characters long").refine(checkUsernameExists, {
      message: "Username already exists",
      path: ["username"], // Path to show the error message
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to show the error message
  });

// Infer the register type
export type registerType = z.infer<typeof registerSchema>;
