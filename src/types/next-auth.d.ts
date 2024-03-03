import { User } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: number;
      name: string;
      email: string;
      created_at: string;
      about: string;
    };
    token: string;
  }
}
