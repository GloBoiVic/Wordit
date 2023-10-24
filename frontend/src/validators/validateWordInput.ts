import * as z from 'zod';

export const wordSchema = z.object({
  word: z.string().min(1, { message: 'Word cannot be blank' }).max(25),
  contextExample: z.string(),
});
