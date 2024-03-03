"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import Container from "../container";
import { TAB_LIST } from "@/lib/constants";

export default function SkeletonDetailCampaignPage() {
  return (
    <Container className=" mt-32">
      <Skeleton className=" h-9 w-full" />
      <div className=" mt-4 flex items-start gap-8">
        <div className=" flex-1">
          <Skeleton className=" aspect-video w-full rounded-xl" />
          <div className=" mt-4 flex gap-2">
            {TAB_LIST.map((tab, i) => (
              <Skeleton key={i} className=" h-12 w-24 rounded-xl" />
            ))}
          </div>

          <div className=" mt-4">
            <Skeleton className=" h-6 w-60" />
            <div className=" mt-4 space-y-2">
              <Skeleton className=" h-4 w-full" />
              <Skeleton className=" h-4 w-full" />
              <Skeleton className=" h-4 w-full" />
            </div>
          </div>
        </div>
        <div className=" w-96 rounded-2xl border p-4">
          <div className=" flex justify-between">
            <div className="flex flex-col gap-1">
              <Skeleton className=" h-4 w-24" />
              <Skeleton className=" h-5 w-20" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className=" h-4 w-16" />
              <Skeleton className=" h-5 w-36" />
            </div>
          </div>

          <div className=" mt-2">
            <Skeleton className=" h-2.5 w-full" />
          </div>

          <div className=" mt-2">
            <div className="flex justify-end">
              <Skeleton className=" h-5 w-20" />
            </div>
          </div>

          <div className=" mt-8 flex gap-2">
            <Skeleton className=" aspect-square h-12 rounded-xl" />
            <Skeleton className=" h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </Container>
  );
}
