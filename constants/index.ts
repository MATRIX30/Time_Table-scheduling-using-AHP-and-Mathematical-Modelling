import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const generateRandomData = (): LecturerPreferenceType => {
  return {
    _id: new mongoose.Types.ObjectId().toString(),
    courseOnMorning: faker.number.int({ min: 0, max: 10 }),
    courseOnEvening: faker.number.int({ min: 0, max: 10 }),
    havingDaysOff: faker.number.int({ min: 0, max: 7 }),
    preferenceNumberOfHours: faker.helpers.arrayElement([3, 6, 9, 12, 15]), // Ensure it's a multiple of 3
    teacher: new mongoose.Types.ObjectId().toString(), // Generate a random ObjectId
  };
};

const generateRandomList = (count: number): LecturerPreferenceType[] => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(generateRandomData());
  }
  return list;
};

const generateRandomStudentData = (): StudentPreference => {
  return {
    _id: new mongoose.Types.ObjectId().toString(),
    courseOnMorning: faker.number.int({ min: 0, max: 10 }),
    courseOnEvening: faker.number.int({ min: 0, max: 10 }),
    havingDaysOff: faker.number.int({ min: 0, max: 10 }),
    
    studentId: new mongoose.Types.ObjectId().toString(), // Generate a random ObjectId
  };
};

const generateRandomStudentList = (count: number): StudentPreference[] => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(generateRandomStudentData());
  }
  return list;
};

export const staticAdminPreference: AdminstratorPreferenceType[] = [];
export const staticLecturerPreference = generateRandomList(8);
export const staticStudentPreference = generateRandomStudentList(8);
