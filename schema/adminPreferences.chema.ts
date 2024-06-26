import { z } from 'zod';

// Define the Zod schema for AdminPreference
const adminPreferenceSchema = z.object({
  courseOnMorning: z.number().min(0).max(10),
  courseOnEvening: z.number().min(0).max(10),
  havingDaysOff: z.number().min(0).max(10),
  preferenceNumberOfHours: z.number().min(3).max(15).refine(value => value % 3 === 0, {
    message: 'Preferred number of hours must be a multiple of 3',
  }),
  admin: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId').optional(), // Assuming admin is an ObjectId stored as a string
});

export type AdminPreferenceType = z.infer<typeof adminPreferenceSchema>;
// Export the schema
export default adminPreferenceSchema;
