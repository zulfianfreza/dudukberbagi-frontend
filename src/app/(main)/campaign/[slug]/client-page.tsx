"use client";
import Container from "@/components/container";
import SkeletonDetailCampaignPage from "@/components/skeleton/skeleton-detail-campaign-page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_LIST, TAB_LIST } from "@/lib/constants";
import { cn, numberFormat } from "@/lib/utils";
import { getCampaignBySlug } from "@/services/campaign";
import { TAB_TYPE } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isPast,
} from "date-fns";
import id from "date-fns/locale/id";
import parser from "html-react-parser";
import { Profile } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";
import { LuMoreHorizontal } from "react-icons/lu";
import { DetailCampaignPageParams } from "./page";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound, useRouter } from "next/navigation";

export default function DetailCampaignClientPage({
  params,
}: DetailCampaignPageParams) {
  const [activeTab, setActiveTab] = useState<TAB_TYPE>("story");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["campaign", params.slug],
    queryFn: () => getCampaignBySlug({ slug: params.slug }),
  });

  if (isLoading) return <SkeletonDetailCampaignPage />;

  const category = CATEGORY_LIST.find((value) => value.id == data?.category_id);

  if (!data) return notFound();

  return (
    <>
      <Container className=" mt-20 sm:mt-28 md:mt-32">
        <h1 className=" text-3xl font-bold text-slate-800">{data?.title}</h1>
        <div className=" mt-4 flex flex-col items-start gap-8 lg:flex-row">
          <div className=" w-full flex-1">
            <div className=" relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={data?.thumbnail ?? ""}
                fill
                alt="campaign"
                className=" object-cover"
              />
            </div>

            <div className=" mt-4 flex items-center justify-between">
              <div className=" flex items-center gap-2">
                <p className=" text-sm text-slate-500">{category?.label}</p>
                <div className=" aspect-square h-1 rounded-full bg-slate-500" />
                <p className="  text-sm text-slate-500">
                  {format(new Date(data!.created_at), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </div>
              <Popover>
                <PopoverTrigger>
                  <LuMoreHorizontal size={20} />
                </PopoverTrigger>
                <PopoverContent
                  className=" z-[10] w-64 rounded-lg p-2.5"
                  side="bottom"
                  align="end"
                >
                  <Button
                    variant="ghost"
                    className=" h-10 w-full justify-start rounded-lg"
                  >
                    Laporan campaign ini
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            <div className=" mt-4">
              <Link
                href={`/fundraiser/${data?.organizer.id}`}
                className="flex w-fit items-center gap-2"
              >
                <div className=" flex aspect-square h-10 items-center justify-center rounded-full bg-slate-100">
                  <Profile variant="Bold" className=" text-slate-500" />
                </div>
                <h1 className=" text-sm font-semibold text-slate-800">
                  {data?.organizer.name}
                </h1>
              </Link>
            </div>

            <div className=" mt-4 block lg:hidden">
              <div className=" flex justify-between">
                <div className="">
                  <p className=" text-xs text-slate-500">Dana terkumpul</p>
                  <p className=" font-medium text-slate-800">
                    Rp{numberFormat(data?.current_amount ?? 0)}
                  </p>
                </div>
                <div className="">
                  <p className=" text-end text-xs text-slate-500">Target</p>
                  <p className=" font-medium text-slate-800">
                    Rp{numberFormat(data?.goal_amount ?? 0)}
                  </p>
                </div>
              </div>
              <Progress
                className=" mt-2"
                value={
                  ((data?.current_amount ?? 0) / (data?.goal_amount ?? 0)) * 100
                }
              />
            </div>

            <div className=" mt-8">
              <Tabs defaultValue="story">
                <TabsList className=" flex h-full justify-start gap-2 bg-white p-0">
                  {TAB_LIST.map((tab, i) => (
                    <TabsTrigger key={i} asChild value={tab.value}>
                      <Button
                        key={i}
                        variant={
                          activeTab == tab.value ? "default" : "secondary"
                        }
                        onClick={() => setActiveTab(tab.value)}
                        className={cn(
                          " h-10 gap-1 rounded-full data-[state=active]:bg-pink-500 data-[state=active]:text-white",
                        )}
                      >
                        {tab.label}
                        {tab.value == "donation" &&
                        data?.donation.length != 0 ? (
                          <span className=" font-bold">
                            {data?.donation.length}
                          </span>
                        ) : null}
                      </Button>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="story" className="">
                  <h1 className=" text-lg font-semibold text-slate-800">
                    Cerita Penggalangan Dana
                  </h1>
                  <article className="prose prose-sm mt-2 max-w-full whitespace-pre-line">
                    {parser(data?.story ?? "")}
                    <p></p>
                  </article>
                </TabsContent>
                <TabsContent value="news">
                  <h1 className=" text-lg font-semibold text-slate-800">
                    Kabar Terbaru
                  </h1>

                  <div className="mt-8 flex flex-col items-center justify-center">
                    <div className=" relative aspect-square w-[256px]">
                      <Image
                        src="/images/not-found-1.jpg"
                        fill
                        className=" object-contain"
                        alt="empty state"
                      />
                    </div>
                    <div className=" mt-4 text-center">
                      <h1 className=" font-semibold text-slate-800">
                        Tidak ada kabar terbaru.
                      </h1>
                      <p className=" text-sm text-slate-500">
                        Belum ada kabar terbaru dari penggalangan dana ini.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="donation">
                  <h1 className=" text-lg font-semibold text-slate-800">
                    Para Donatur
                  </h1>
                  {data && data.donation.length != 0 ? (
                    <div className=" mt-2 grid grid-cols-2 gap-2">
                      {data.donation.map((donation) => (
                        <div
                          key={donation.id}
                          className=" flex w-full gap-4 rounded-xl border border-slate-200 p-6"
                        >
                          <div className=" flex aspect-square h-12 items-center justify-center rounded-full bg-slate-100">
                            <Profile
                              variant="Bold"
                              className=" text-slate-500"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className=" text-sm font-semibold text-slate-800">
                              {donation.user.is_anonym
                                ? "Orang Baik"
                                : donation.user.name}
                            </p>
                            <p className=" text-sm text-slate-500">
                              Berdonasi sebesar{" "}
                              <span className=" font-semibold text-slate-800">
                                {numberFormat(donation.amount)}
                              </span>
                            </p>
                            <p className=" mt-2 text-xs font-light text-slate-500">
                              {formatDistanceToNow(
                                new Date(donation.created_at),
                                {
                                  includeSeconds: true,
                                  locale: id,
                                  addSuffix: true,
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 flex flex-col items-center justify-center">
                      <div className=" relative aspect-video h-[256px]">
                        <Image
                          src="/images/donation.jpg"
                          fill
                          className=" object-contain"
                          alt="empty state"
                        />
                      </div>
                      <div className=" mt-4 text-center">
                        <h1 className=" font-semibold text-slate-800">
                          Tidak ada donasi.
                        </h1>
                        <p className=" text-sm text-slate-500">
                          Belum ada yang berdonasi untuk penggalangan dana ini.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* <div className=" mt-4">{tabBody(activeTab)}</div> */}

            <div className=" sticky bottom-0 mt-4 flex gap-2 bg-white py-4 lg:hidden">
              <Button size="icon-lg" variant="outline">
                <HiOutlineShare size={20} />
              </Button>
              <Button className=" flex-1">Donasi Sekarang</Button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className=" w-full lg:sticky lg:top-32 lg:w-96 ">
            <div className=" hidden rounded-2xl border-slate-200 lg:block lg:border lg:p-4 lg:shadow-sm">
              <div className="">
                <div className=" flex justify-between">
                  <div className="">
                    <p className=" text-xs text-slate-500">Dana terkumpul</p>
                    <p className=" text-lg font-semibold text-pink-500">
                      Rp{numberFormat(data?.current_amount ?? 0)}
                    </p>
                  </div>
                  <div className="">
                    <p className=" text-end text-xs text-slate-500">Target</p>
                    <p className=" text-lg font-semibold text-slate-800">
                      Rp{numberFormat(data?.goal_amount ?? 0)}
                    </p>
                  </div>
                </div>
                <Progress
                  className=" mt-2"
                  value={
                    ((data?.current_amount ?? 0) / (data?.goal_amount ?? 0)) *
                    100
                  }
                />
                <p className=" mt-2 text-end text-xs text-slate-500">
                  {isPast(new Date(data.end_date))
                    ? "Berakhir"
                    : `${differenceInDays(
                        new Date(data.end_date),
                        new Date(),
                      )} hari`}
                </p>
              </div>

              <div className="sticky bottom-10 mt-8 flex gap-2">
                {/* <Button size="icon-lg" variant="outline">
                  <Save2 size={20} />
                </Button> */}
                <Button size="icon-lg" variant="outline">
                  <HiOutlineShare size={20} />
                </Button>
                <Button
                  className=" flex-1"
                  disabled={isPast(new Date(data.end_date))}
                  onClick={() => router.push(`/campaign/${params.slug}/donate`)}
                >
                  {isPast(new Date(data.end_date))
                    ? "Penggalangan Dana Berakhir"
                    : "Donasi Sekarang"}
                </Button>
              </div>
            </div>

            <div className=" mt-0 lg:mt-8">
              <h1 className=" text-lg font-semibold text-slate-800">
                Kategori Lainnya
              </h1>

              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORY_LIST.map((category) => (
                  <Link
                    href={`/campaign?category=${category.id}`}
                    key={category.id}
                    className=" rounded-full border border-slate-200 p-1.5 px-2.5 text-sm text-slate-500 transition hover:bg-slate-100"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
