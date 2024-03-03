"use client";
import CampaignItem from "@/components/campaign-item";
import Container from "@/components/container";
import LoadingCampaignItem from "@/components/skeleton/skeleton-campaign-item";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserCampaigns } from "@/services/campaign";
import { getUserById } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import React from "react";
import { LuUser } from "react-icons/lu";

interface PageParams {
  params: {
    userId: number;
  };
}

export default function FundraiserPage({ params }: PageParams) {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", params.userId],
    queryFn: () => getUserById(params.userId),
  });

  const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ["campaigns", params.userId],
    queryFn: () => getUserCampaigns({ userId: params.userId }),
  });
  return (
    <Container className=" mt-32">
      {isLoadingUser ? (
        <div className=" flex flex-col items-center">
          <Skeleton className=" aspect-square w-36 rounded-full" />
          <Skeleton className=" mt-4 h-6 w-28" />
          <Skeleton className=" mt-2 h-4 w-48" />
        </div>
      ) : (
        user && (
          <div className="flex flex-col items-center">
            <div className=" relative aspect-square w-36 rounded-full bg-slate-100"></div>
            <p className=" mt-4 text-lg font-semibold text-slate-800">
              {user.name}
            </p>
          </div>
        )
      )}

      <div className="mt-8">
        <Tabs defaultValue="campaign" className=" w-full">
          <TabsList className=" flex justify-center gap-2 bg-transparent">
            <TabsTrigger value="about" asChild>
              <Button
                className=" h-10 rounded-full px-4 text-slate-800 data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                variant="ghost"
              >
                Tentang
              </Button>
            </TabsTrigger>
            <TabsTrigger value="campaign" asChild>
              <Button
                className=" h-10 rounded-full px-4 text-slate-800 data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                variant="ghost"
              >
                Campaign
              </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className=" mt-8 ">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-16">
              <div className="flex-1">
                <h1 className=" text-lg font-semibold text-slate-800">
                  Tentang Penggalang Dana
                </h1>
                <p className=" text-sm text-slate-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima molestiae cum consectetur harum laudantium, facilis eos
                  possimus minus id ea, delectus in, fuga hic numquam? Vitae
                  inventore, sapiente, at corporis voluptate eius reiciendis
                  cumque quisquam quaerat perferendis sequi modi labore
                  voluptas. Tempora aut omnis laborum asperiores nobis porro,
                  rem eius.
                </p>
              </div>
              <div className=" w-full rounded-lg bg-slate-100 p-6 lg:w-80">
                <div className="flex items-center gap-2">
                  <LuUser />
                  <p className=" text-sm text-slate-800">
                    Bergabung{" "}
                    {format(
                      new Date(user?.created_at ?? new Date()),
                      "dd MMMM yyyy",
                      {
                        locale: id,
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="campaign" className=" mt-8">
            {isLoadingCampaigns ? (
              <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <LoadingCampaignItem />
                <LoadingCampaignItem />
                <LoadingCampaignItem />
              </div>
            ) : (
              <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {campaigns &&
                  campaigns.map((campaign) => (
                    <CampaignItem key={campaign.id} campaign={campaign} />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
