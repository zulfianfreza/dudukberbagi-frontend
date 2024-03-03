import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string(),
  about: z.string(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
