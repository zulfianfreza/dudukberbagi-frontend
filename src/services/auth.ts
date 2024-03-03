import { authOptions } from "@/lib/auth";
import axiosInstance from "@/lib/axios-instance";
import { LoginSchema, RegisterSchema } from "@/lib/validation/auth";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";

export const login = async (request: LoginSchema) => {
  const res = await axiosInstance.post("/auth/login", request);

  return res.data;
};

export const register = async (request: RegisterSchema) => {
  const res = await axiosInstance.post("/auth/register", request);

  return res.data;
};

export const getServerAuthSession = () => getServerSession(authOptions);
