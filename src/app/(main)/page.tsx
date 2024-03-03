"use client";

import CampaignItem from "@/components/campaign-item";
import Container from "@/components/container";
import Heading from "@/components/heading";
import FundRaisingBanner from "@/components/home/fundraising-banner";
import Hero from "@/components/home/hero";
import OurMission from "@/components/home/our-mission";
import LoadingCampaignItem from "@/components/skeleton/skeleton-campaign-item";
import { Button } from "@/components/ui/button";
import { CATEGORY_LIST } from "@/lib/constants";
import { getCampaigns } from "@/services/campaign";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { LuChevronRight } from "react-icons/lu";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });
  return (
    <>
      <Hero />

      <Container className=" mt-16">
        <Heading title="Kategori Pilihan" tag="Kategori" />
        <div className=" mt-4 grid grid-cols-4 gap-4 lg:grid-cols-6 xl:grid-cols-8">
          {CATEGORY_LIST.map((category, i) => (
            <Link
              href={`/campaign?category=${category.id}`}
              key={i}
              className=" flex flex-col items-center gap-4"
            >
              <div className=" relative">
                <div className=" absolute -bottom-1 -right-1 -z-10 aspect-square w-8 rounded-xl bg-sky-100" />
                <category.icon className=" z-20 text-pink-500" size={36} />
              </div>
              <p className=" text-center text-sm font-medium text-slate-800">
                {category.label}
              </p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className=" mt-16">
        <Heading
          tag="Mereka butuh bantuan"
          title="Penggalangan Dana Mendesak"
          // subtitle="Mereka butuh uluran tangan kita. Karena sedikit bantuan dari kita
          //     adalah harapan besar bagi mereka."
        />

        <div className=" mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? [1, 1, 1].map((_, i) => <LoadingCampaignItem key={i} />)
            : data &&
              data
                ?.slice(0, 3)
                .map((campaign) => (
                  <CampaignItem key={campaign.id} campaign={campaign} />
                ))}
        </div>
        <div className=" mt-8 flex justify-center">
          <Button
            asChild
            variant="outline"
            className=" h-10 gap-1 rounded-full hover:border-pink-500 hover:bg-white"
          >
            <Link href="/campaign">
              Lihat semua <LuChevronRight size={16} />
            </Link>
          </Button>
        </div>
      </Container>

      {/* <OurMission /> */}

      <FundRaisingBanner />

      <Container className=" mt-16">
        <Heading
          tag="Mereka butuh bantuan"
          title="Rekomendasi Penggalangan Dana"
          // subtitle="Mereka butuh uluran tangan kita. Karena sedikit bantuan dari kita
          //     adalah harapan besar bagi mereka."
        />

        <div className=" mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? [1, 1, 1].map((_, i) => <LoadingCampaignItem key={i} />)
            : data &&
              data
                ?.slice(0, 3)
                .map((campaign) => (
                  <CampaignItem key={campaign.id} campaign={campaign} />
                ))}
        </div>
        <div className=" mt-8 flex justify-center">
          <Button
            asChild
            variant="outline"
            className=" h-10 gap-1 rounded-full hover:border-pink-500 hover:bg-white"
          >
            <Link href="/campaign">
              Lihat semua <LuChevronRight size={16} />
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
