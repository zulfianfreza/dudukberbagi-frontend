"use client";
import CampaignItem from "@/components/campaign-item";
import Container from "@/components/container";
import Heading from "@/components/heading";
import LoadingCampaignItem from "@/components/skeleton/skeleton-campaign-item";
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
import { CATEGORY_LIST } from "@/lib/constants";
import { getCampaigns } from "@/services/campaign";
import { ICategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { GlobalSearch, SearchNormal, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { MdFilterList } from "react-icons/md";
import { PiCaretUpDown } from "react-icons/pi";

interface PageProps {
  searchParams: {
    q: string | null;
    category: string | null;
  };
}

export default function CampaignClientPage({ searchParams }: PageProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [search, setSearch] = useState(searchParams.q ?? "");

  const searchDebounce = useDebounce(search, 500);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["campaigns", searchDebounce, category.map((value) => value.id)],
    queryFn: () =>
      getCampaigns(
        `?q=${searchDebounce}${category
          .map((value) => `&category=${value.id}`)
          .toString()
          .replace(/,/g, "")}`,
      ),
  });

  useEffect(() => {
    const categories = searchParams.category?.split(",");
    setCategory(
      CATEGORY_LIST.filter(
        (value) => categories?.includes(value.id.toString()),
      ),
    );
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (category.length == 0 && searchDebounce == "") {
      router.push(pathname);
      return;
    }

    const categories = category.map((value) => value.id);
    if (category.length > 0 && searchDebounce == "") {
      router.push(`?category=${categories}`);
      return;
    }

    if (category.length == 0 && searchDebounce != "") {
      router.push(`?q=${searchDebounce}`);
      return;
    }

    router.push(`?search=${searchDebounce}&category=${categories}`);
  }, [category, router, pathname, searchDebounce]);

  return (
    <Container className=" mt-32">
      <Heading
        title={
          searchDebounce == ""
            ? "Campaign"
            : `Campaign untuk '${searchDebounce}'`
        }
        tag="Mereka butuh bantuan"
      />
      {isLoading ? (
        <div className=" mt-8 grid grid-cols-3 gap-8">
          {[1, 1, 1, 4].map((_, i) => (
            <LoadingCampaignItem key={i} />
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
              {searchDebounce != "" ? `untuk '${searchDebounce}'` : ""}
              {category.length > 0
                ? `dengan kategori ${category.map((value) => value.label)}`
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
  );
}
