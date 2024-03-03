"use client";
import CampaignItem from "@/components/campaign-item";
import Container from "@/components/container";
import SkeletonCampaignItem from "@/components/skeleton/skeleton-campaign-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hooks/use-debounce";
import useShareParams from "@/hooks/use-share-params";
import { CATEGORY_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getCampaigns } from "@/services/campaign";
import { ICategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CloseCircle } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import {
  LuChevronDown,
  LuListFilter,
  LuSearch,
  LuX,
  LuXCircle,
} from "react-icons/lu";

interface PageParams {
  searchParams: {
    q: string;
    category: string;
  };
}

export default function SearchPage({ searchParams }: PageParams) {
  const [q, setQ] = useState(searchParams.q ? searchParams.q : "");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<number[]>(
    searchParams.category
      ? searchParams.category.split(",").map((v) => Number(v))
      : [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const qDebounce = useDebounce(q, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["campaigns", searchParams.q ? searchParams.q : "", category],
    queryFn: () =>
      getCampaigns(
        `?q=${searchParams.q}${category
          .map((value) => `&category=${value}`)
          .toString()
          .replace(/,/g, "")}`,
      ),
  });
  useEffect(() => {
    if (category.length > 0) {
      router.push(`${pathname}?q=${qDebounce}&category=${category}`);
    } else {
      router.push(`${pathname}?q=${qDebounce}`);
    }
  }, [qDebounce, router, pathname, category]);
  return (
    <>
      <div className=" absolute top-0 -z-10 h-[218px] w-full bg-gradient-to-r from-sky-100 to-pink-100">
        <div className=" bg-grid h-full w-full">
          <div className=" h-full w-full bg-gradient-to-r from-sky-100/75 via-transparent to-pink-100/75" />
        </div>
      </div>
      <Container className=" pt-32">
        <div className="flex flex-col items-center justify-center">
          <h1 className=" text-xl font-semibold text-slate-800">
            {searchParams.q == "" ? "Cari Penggalangan Dana" : searchParams.q}
          </h1>
          <div className=" mt-8 flex h-14 w-full items-center rounded-xl border border-slate-200 bg-white lg:w-fit">
            <div className=" relative flex-1">
              <LuSearch
                className=" absolute left-[18px] top-[18px] text-slate-500"
                size={20}
              />
              {/* <form action="/search"> */}
              <Input
                name="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className=" h-14 w-full border-none px-14 shadow-none focus-visible:ring-0 lg:w-[512px]"
                placeholder="Cari..."
                ref={inputRef}
              />
              {/* </form> */}
              {q != "" && (
                <CloseCircle
                  variant="Bold"
                  className=" absolute right-5 top-5 cursor-pointer text-slate-500"
                  size={16}
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                    setQ("");
                  }}
                />
              )}
            </div>
            <div className=" h-6 w-[2px] bg-slate-200"></div>
            <div className="flex items-center p-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" h-fit w-24 justify-between gap-2 overflow-hidden border-none px-0 font-normal shadow-none hover:bg-white"
                  >
                    <span className=" flex-1 truncate overflow-ellipsis text-start">
                      {category.length > 0
                        ? category.length > 1
                          ? `${category.length} Kategori`
                          : CATEGORY_LIST.find(
                              (value) => value.id == category[0],
                            )?.label
                        : "Kategori"}
                    </span>
                    <LuChevronDown
                      className={cn("ml-2 h-4 w-4 shrink-0 transition", {
                        "rotate-180": open,
                      })}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className=" overflow-hidden rounded-lg p-1"
                  align="end"
                >
                  <div className="flex flex-col">
                    {CATEGORY_LIST.map((value, i) => (
                      <div
                        key={i}
                        className="relative flex items-center gap-2 rounded-md py-2.5 hover:bg-slate-100"
                      >
                        <Checkbox
                          className=" absolute left-4 rounded-md border-slate-800 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                          id={`category${i}`}
                          checked={category.includes(value.id)}
                          onCheckedChange={(checked) => {
                            // router.push(`${pathname}?q=`);
                            // return checked
                            //   ? setCategory([...category, value.id])
                            //   : setCategory(
                            //       category.filter((cat) => cat != value.id),
                            //     );
                            if (checked) {
                              router.push(
                                `${pathname}?q=${q}&category=${[
                                  ...category,
                                  value.id,
                                ]}`,
                              );
                              setCategory([...category, value.id]);
                            } else {
                              if (category.length == 1) {
                                router.push(`${pathname}?q=${q}`);
                              } else {
                                router.push(
                                  `${pathname}?q=${q}&category=${category.filter(
                                    (cat) => cat != value.id,
                                  )}`,
                                );
                              }
                              setCategory(
                                category.filter((cat) => cat != value.id),
                              );
                            }
                          }}
                        />
                        <Label
                          className=" w-full pl-10 text-sm font-normal"
                          htmlFor={`category${i}`}
                        >
                          {value.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className=" mt-4 text-center">
            {/* <h1 className="  text-lg font-semibold text-slate-800">
              {searchParams.q}
            </h1> */}
            {category.length > 0 && (
              <p className=" flex items-center justify-center gap-2.5 text-sm text-slate-500">
                Kategori:
                {CATEGORY_LIST.filter((v) => category.includes(v.id)).map(
                  (v) => (
                    <span
                      onClick={() => {
                        setCategory([v.id]);
                        router.push(`/search?q=${qDebounce}&category=${v.id}`);
                      }}
                      key={v.id}
                      className=" cursor-pointer text-slate-800"
                    >
                      {v.label}
                    </span>
                  ),
                )}
              </p>
            )}
          </div>
        </div>

        <div className=" mt-4 flex justify-between">
          <div className=""></div>

          <Button variant="outline" className=" h-10 gap-2 rounded-full">
            <LuListFilter />
            Filters
          </Button>
        </div>

        {isLoading ? (
          <div className=" mt-8 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 1, 1, 4].map((_, i) => (
              <SkeletonCampaignItem key={i} />
            ))}
          </div>
        ) : data?.length == 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center">
            <div className=" relative aspect-square w-[256px]">
              <Image
                src="/images/not-found-1.jpg"
                fill
                alt="empty state"
                className=" object-contain"
              />
            </div>
            <div className=" mt-4 text-center">
              <h1 className="font-semibold text-slate-800">
                Tidak ada Campaign.
              </h1>
              <p className=" text-sm text-slate-500">
                Tidak ada campaign{" "}
                {searchParams.q != "" ? `untuk '${searchParams.q}'` : ""}
                {category.length > 0
                  ? ` dengan kategori ${CATEGORY_LIST.filter((v) =>
                      category.includes(v.id),
                    )
                      .map((v) => v.label)
                      .join(", ")}`
                  : ""}
              </p>
            </div>
          </div>
        ) : (
          <div className=" mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((campaign) => (
              <CampaignItem key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
