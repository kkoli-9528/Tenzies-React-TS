import { z } from 'zod';

export const gameSessionSchema = z.object({
  rolls: z.number().min(1),
  duration: z.number().nonnegative(),
  won: z.boolean(),
  date: z.string().refine((val) => !isNaN(Date.parse(val),), {
    error: "Invalid date format"
  })
})