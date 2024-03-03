import React from "react";
import DetailCampaignClientPage from "./client-page";
import { Metadata } from "next";
import { getCampaignBySlug } from "@/services/campaign";

export interface DetailCampaignPageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: DetailCampaignPageParams): Promise<Metadata> {
  const campaign = await getCampaignBySlug({ slug: params.slug });

  return {
    title: campaign.title + " - dudukberbagi",
  };
}

export default function DetailCampaignPage({
  params,
}: DetailCampaignPageParams) {
  return <DetailCampaignClientPage params={params} />;
}
