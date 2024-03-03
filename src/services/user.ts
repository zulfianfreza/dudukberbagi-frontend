"use server";

import axiosInstance from "@/lib/axios-instance";
import { getServerAuthSession } from "./auth";
import { User } from "@/types/user";
import { UpdateUserSchema } from "@/lib/validation/user";

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const res = await axiosInstance.get(`/user/me`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return res.data.data;
};

export const getUserById = async (userId: number): Promise<User> => {
  const res = await axiosInstance.get(`/user/${userId}`);

  return res.data.data;
};

export const deleteUserImage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const res = await axiosInstance.delete("/user/image", {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return res.data;
};

export const updateUser = async (request: UpdateUserSchema) => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const res = await axiosInstance.patch("/user/me", request, {
    headers: { Authorization: `Bearer ${session.token}` },
  });

  return res.data;
};
