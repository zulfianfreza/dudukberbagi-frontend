"use server";
import axiosInstance from "@/lib/axios-instance";
import { CreateDonationSchema } from "@/lib/validation/donation";
import { BaseResponse } from "@/types";
import { Donation } from "@/types/donation";
import { getServerAuthSession } from "./auth";

export const createDonation = async (
  request: CreateDonationSchema,
): Promise<BaseResponse<Donation>> => {
  const { data } = await axiosInstance.post("/donation/", request);

  return data;
};

export const getMyDonation = async (): Promise<Donation[]> => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return Promise.reject("UNAUTHORIZED");
  }
  const { data } = await axiosInstance.get("/donation/user", {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return data.data;
};
