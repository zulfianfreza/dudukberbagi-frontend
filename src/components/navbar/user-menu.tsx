"use client";

import React from "react";
import { PiMegaphone } from "react-icons/pi";
import { Button } from "../ui/button";
import { LogoutCurve, Profile } from "iconsax-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { usePathname } from "next/navigation";
import { cn, getInitialName } from "@/lib/utils";
import { LuChevronDown } from "react-icons/lu";
import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import { User } from "@/types/user";

interface UserMenuProps {
  user: User | undefined | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const scrollPosition = useScrollPosition();
  const pathname = usePathname();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2">
          {user?.image == "" ? (
            <div className=" flex aspect-square h-12 items-center justify-center rounded-full bg-slate-100">
              <Profile variant="Bold" className=" text-slate-500" size={24} />
            </div>
          ) : (
            <div className=" relative aspect-square w-12 overflow-hidden rounded-full">
              <Image
                src={user?.image ?? ""}
                fill
                alt={user?.name ?? ""}
                className=" object-cover"
              />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className=" z-[99] w-64 rounded-xl p-0"
        side="bottom"
        align="end"
      >
        <div className=" flex flex-col items-center gap-2 p-4">
          {user?.image == "" ? (
            <div className=" flex aspect-square h-16 items-center justify-center rounded-full bg-slate-100">
              <Profile variant="Bold" className=" text-slate-500" size={24} />
            </div>
          ) : (
            <div className=" relative aspect-square w-16 overflow-hidden rounded-full">
              <Image
                src={user?.image ?? ""}
                fill
                alt={user?.name ?? ""}
                className=" object-cover"
              />
            </div>
          )}
          <h1 className=" text-sm font-medium text-slate-800">{user?.name}</h1>
        </div>
        <div className=" p-2 pt-0">
          <Button
            asChild
            className=" h-10 w-full justify-start gap-2 rounded-lg font-normal"
            variant="ghost"
          >
            <Link href="/user/profile">
              {/* <Profile className="" size={20} /> */}
              <span>Profil</span>
            </Link>
          </Button>
          <Button
            className=" h-10 w-full justify-start gap-2 rounded-lg font-normal "
            variant="ghost"
          >
            {/* <PiMegaphone className="" size={20} /> */}
            <span>Campaign Saya</span>
          </Button>
        </div>
        <hr />
        <div className=" p-2">
          <Button
            className=" h-10 w-full justify-start gap-2 rounded-lg font-normal"
            variant="ghost"
            onClick={() => signOut()}
          >
            {/* <LogoutCurve className="" size={20} /> */}
            <span>Keluar</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
