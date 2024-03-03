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
import { MdFilterList } from "react-icons/md";
import { PiCaretUpDown } from "react-icons/pi";

interface PageProps {
  searchParams: {
    search: string | null;
    category: string | null;
  };
}

export default function CampaignClientPage({ searchParams }: PageProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [search, setSearch] = useState(searchParams.search ?? "");

  const searchDebounce = useDebounce(search, 500);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["campaigns", searchDebounce, category.map((value) => value.id)],
    queryFn: () =>
      getCampaigns(
        `?search=${searchDebounce}${category
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
      router.push(`${pathname}?category=${categories}`);
      return;
    }

    if (category.length == 0 && searchDebounce != "") {
      router.push(`${pathname}?search=${searchDebounce}`);
      return;
    }

    router.push(`${pathname}?search=${searchDebounce}&category=${categories}`);
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
      <div className=" mt-4 flex flex-col justify-between gap-2 sm:flex-row">
        <div className=" relative">
          <Input
            placeholder="Cari campaign"
            className=" ml w-full pl-11 lg:w-[456px]"
            value={search}
            onChange={handleSearch}
          />
          <SearchNormal1
            className=" absolute left-[14px] top-[14px] text-slate-500"
            size={20}
          />
        </div>

        <div className=" flex flex-row-reverse gap-2">
          <Button size="icon-lg" variant="outline">
            <MdFilterList size={20} />
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=" flex-1 justify-between overflow-hidden font-normal lg:w-56 lg:flex-none"
              >
                <span className=" flex-1 truncate overflow-ellipsis text-start">
                  {category.length > 0
                    ? category.length > 1
                      ? `${category.length} Kategori`
                      : CATEGORY_LIST.find(
                          (value) => value.id == category[0].id,
                        )?.label
                    : "Kategori"}
                </span>
                <PiCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className=" overflow-hidden rounded-xl p-0"
              align="end"
            >
              <div className="flex flex-col py-2">
                {CATEGORY_LIST.map((value, i) => (
                  <div
                    key={i}
                    className="relative flex items-center gap-2 py-2 hover:bg-slate-100"
                  >
                    <Checkbox
                      className=" absolute left-4 rounded-md border-slate-800 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                      id={`category${i}`}
                      checked={category.includes(value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? setCategory([...category, value])
                          : setCategory(
                              category.filter((cat) => cat.id != value.id),
                            );
                      }}
                    />
                    <Label
                      className=" w-full pl-10 text-xs font-normal"
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
              src="/images/not-found-2.jpg"
              fill
              alt="empty state"
              className=" object-contain"
            />
          </div>
          <h1 className=" mt-4 text-slate-800">Tidak ada Campaign.</h1>
        </div>
      ) : (
        <div className=" mt-8 grid grid-cols-3 gap-8">
          {data?.map((campaign) => (
            <CampaignItem key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </Container>
  );
}
