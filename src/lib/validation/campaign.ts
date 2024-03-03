import { z } from "zod";
import * as Yup from "yup";

export const campaignParams = z.object({
  slug: z.string().optional(),
  campaignId: z.number().optional(),
  userId: z.number().optional(),
});

export type CampaignParams = z.infer<typeof campaignParams>;

export const campaignQueryParams = z.object({
  search: z.string().optional(),
  category: z.array(z.number()).optional(),
});

export type CampaignQueryParams = z.infer<typeof campaignQueryParams>;

export const createCampaignSchema = Yup.object({
  title: Yup.string()
    .required("Judul tidak boleh kosong.")
    .min(5, "Judul harus lebih dari 5 karakter"),
  story: Yup.string().required("Cerita tidak boleh kosong"),
  category_id: Yup.number().required("Pilih 1 kategori."),
  goal_amount: Yup.number()
    .required()
    .min(10000, "Target harus lebih dari 10.000"),
  end_date: Yup.date().required(),
  thumbnail: Yup.mixed().required("Thumbnail tidak boleh kosong"),
});

export type CreateCampaignSchema = Yup.InferType<typeof createCampaignSchema>;
