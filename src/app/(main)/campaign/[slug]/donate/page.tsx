import React from "react";
import DonateClientPage from "./client-page";
import { getServerAuthSession } from "@/services/auth";

export interface DonatePageParams {
  params: {
    slug: string;
  };
}

export default async function DonatePage({ params }: DonatePageParams) {
  const session = await getServerAuthSession();
  return <DonateClientPage params={params} session={session} />;
}
