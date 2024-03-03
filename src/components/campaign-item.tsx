"use client";

import { numberFormat } from "@/lib/utils";
import { Campaign } from "@/types/campaign";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { Progress } from "./ui/progress";
import { differenceInDays, isPast } from "date-fns";
import { Profile } from "iconsax-react";

interface CampaignItemProps {
  campaign: Campaign;
}

export default function CampaignItem({ campaign }: CampaignItemProps) {
  return (
    <>
      <Link
        href={`/campaign/${campaign.slug}`}
        className=" flex w-full items-center gap-4 overflow-hidden md:flex-col md:gap-0"
      >
        <div className=" w-[226px] md:w-full ">
          <div className=" relative aspect-[16/10] w-full overflow-hidden rounded-xl md:aspect-video md:rounded-xl   ">
            <Image
              src={campaign.thumbnail}
              fill
              alt="campaign"
              className=" object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className=" mt-4 flex w-full flex-1 flex-col justify-between">
          <div className=" ">
            <h1 className=" line-clamp-2 text-sm font-semibold text-slate-900">
              {campaign.title}
            </h1>
          </div>
          <div className=" mt-2 flex items-center gap-2">
            {campaign.organizer.image == "" ? (
              <div className=" hidden aspect-square w-8 items-center justify-center rounded-full bg-slate-100 md:flex">
                <Profile variant="Bold" size={16} className=" text-slate-500" />
              </div>
            ) : (
              <div className=" relative hidden aspect-square w-8 overflow-hidden rounded-full  md:flex">
                <Image
                  src={campaign.organizer.image ?? ""}
                  fill
                  alt={campaign.organizer.name ?? ""}
                  className=" object-cover"
                />
              </div>
            )}
            <div className="  flex items-center gap-1">
              <p className=" text-sm font-medium text-slate-800">
                {campaign.organizer.name}
              </p>
              <HiBadgeCheck className="font-semibold text-pink-500" />
            </div>
          </div>
          <div className=" mt-4">
            <Progress
              value={
                ((campaign?.current_amount ?? 0) /
                  (campaign?.goal_amount ?? 0)) *
                100
              }
            />
            <div className="mt-2 flex justify-between">
              <div className="flex flex-col">
                <p className=" text-xs text-slate-500">Donasi terkumpul</p>
                <p className=" font-medium text-pink-500">
                  Rp{numberFormat(campaign.current_amount)}
                </p>
              </div>
              <p className=" text-xs text-slate-500">
                {isPast(new Date(campaign.end_date))
                  ? "Berakhir"
                  : `${differenceInDays(
                      new Date(campaign.end_date),
                      new Date(),
                    )} hari`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
