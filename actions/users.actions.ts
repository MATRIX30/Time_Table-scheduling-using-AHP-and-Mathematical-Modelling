"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

const DB_NAME = "super-admin";

export async function checkUsername(username: string) {
  await dbConnect(DB_NAME);

  try {
    const user = await User.findOne({ username: username });
    return user ? true : false;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function checkEmail(email: string) {
  await dbConnect(DB_NAME);

  try {
    const user = await User.findOne({ email: email });
    return user ? true : false;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createUser(
  email: string,
  username: string,
  password: string
): Promise<UserType> {
  await dbConnect(DB_NAME);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    return JSON.parse(JSON.stringify(newUser)) as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllUsers() {
  await dbConnect(DB_NAME);

  try {
    const users = await User.find();
    return JSON.parse(JSON.stringify(users)) as UserType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUser(
  userId: string,
  updateData: Partial<{ email: string; username: string; password: string }>
): Promise<UserType> {
  await dbConnect(DB_NAME);

  try {
    // Hash the password if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatedUser)) as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser(userId: string): Promise<UserType> {
  await dbConnect(DB_NAME);

  try {
    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user)) as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUser(userId: string): Promise<UserType> {
  await dbConnect(DB_NAME);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return JSON.parse(JSON.stringify(deletedUser)) as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<UserType | null> {
  await dbConnect(DB_NAME);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Password is invalid
    }

    return JSON.parse(JSON.stringify(user)) as UserType;
  } catch (error: any) {
    return null;
  }
}
