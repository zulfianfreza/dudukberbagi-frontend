"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCampaignItem() {
  return (
    <div className=" w-full overflow-hidden rounded-xl border shadow-lg">
      <Skeleton className=" aspect-video w-full rounded-none" />
      <div className=" p-4">
        <Skeleton className="  h-5 w-full" />
        <Skeleton className=" mt-1 h-5 w-full" />
        <Skeleton className=" mt-2 h-4 w-40" />
        <Skeleton className=" mt-4 h-2.5 w-full" />
        <div className=" mt-2 flex justify-between">
          <div className="">
            <Skeleton className=" h-3 w-24" />
            <Skeleton className=" mt-1 h-4 w-32" />
          </div>
          <Skeleton className=" h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
