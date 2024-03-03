import { z } from "zod";

export const createDonationSchema = z.object({
  campaign_id: z.number(),
  amount: z.number(),
  bank_code: z.string(),
  user: z.object({
    user_id: z.number().optional(),
    is_anonym: z.boolean(),
    name: z.string(),
    email: z.string(),
  }),
});

export type CreateDonationSchema = z.infer<typeof createDonationSchema>;
