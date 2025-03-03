import { z } from 'zod';

export const PreferenceSchema = z.object({
  hoursWeekend: z.number(),
  equilibreProgrammation: z.number(),
  matiereMultipleProfesseurs: z.number(),
});

// Type inference from Zod schema
export type PreferenceType = z.infer<typeof PreferenceSchema>;