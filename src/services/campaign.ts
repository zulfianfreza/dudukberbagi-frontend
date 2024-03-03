"use server";
import axiosInstance from "@/lib/axios-instance";
import { CampaignParams, campaignParams } from "@/lib/validation/campaign";
import { BaseResponse } from "@/types";
import { Campaign } from "@/types/campaign";
import { getServerAuthSession } from "./auth";

export const getCampaigns = async (
  queryParams?: string | null,
): Promise<Campaign[]> => {
  const { data } = await axiosInstance.get<BaseResponse<Campaign[]>>(
    `/campaign${queryParams ?? ""}`,
  );
  return data.data;
};

export const getCampaignBySlug = async ({
  slug,
}: CampaignParams): Promise<Campaign> => {
  const { data } = await axiosInstance.get<BaseResponse<Campaign>>(
    `/campaign/slug/${slug}`,
  );
  return data.data;
};

export const getMyCampaigns = async (): Promise<Campaign[]> => {
  const session = await getServerAuthSession();
  if (!session) {
    return Promise.reject("UNAUTHORIZED");
  }
  const res = await axiosInstance.get("/campaign/user", {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return res.data.data;
};

export const deleteCampaign = async ({ campaignId }: CampaignParams) => {
  const session = await getServerAuthSession();
  if (!session) {
    return Promise.reject("UNAUTHORIZED");
  }
  const res = await axiosInstance.delete(`/campaign/${campaignId}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return res.data;
};

export const getUserCampaigns = async ({
  userId,
}: CampaignParams): Promise<Campaign[]> => {
  const res = await axiosInstance.get(`/campaign/user/${userId}`);

  return res.data.data;
};
