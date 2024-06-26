declare interface PrferenceType {
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  preferenceNumberOfHours: number;
  _id?: string;
  _v?: number;
}

declare interface AdminstratorPreferenceType {
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  preferenceNumberOfHours: number;
  _id?: string;
  _v?: number;
}

declare interface UserType {
  _id?: string;
  _v?: number;
  id: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
}

declare interface LecturerPreferenceType {
  _id: string;
  _v?: number;
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  preferenceNumberOfHours: number;
  teacher: string;
}

declare interface StudentPreference {
  _id: string;
  _v?: number;
  courseOnMorning: number;
  courseOnEvening: number;
  havingDaysOff: number;
  studentId: string;
}
