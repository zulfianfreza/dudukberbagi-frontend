"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogoutCurve, Profile } from "iconsax-react";
import { PiMegaphone } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LuHeartHandshake, LuUser } from "react-icons/lu";
import { BiDonateHeart } from "react-icons/bi";
import { MdOutlineCampaign } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { cn } from "@/lib/utils";
export default function UserSidebar() {
  const pathname = usePathname();
  const SIDEBAR_MENU = [
    {
      label: "Profil",
      path: "/user/profile",
      active: "profile",
    },
    {
      label: "Campaign Saya",
      path: "/user/campaign",
      active: "campaign",
    },
    {
      label: "Donasi Saya",
      path: "/user/donation",
      active: "donation",
    },
    {
      label: "Password",
      path: "/user/password",
      active: "password",
    },
  ];
  return (
    <div className=" flex w-56 flex-col gap-1">
      <div className="flex flex-col items-start gap-2.5">
        <p className=" font-semibold text-slate-500">General</p>
        {SIDEBAR_MENU.map((menu, i) => (
          <Link
            href={menu.path}
            key={i}
            className={cn(
              " text-sm text-slate-500 transition hover:text-slate-800",
              {
                "font-medium text-slate-800": pathname
                  .split("/")
                  .includes(menu.active),
              },
            )}
          >
            {menu.label}
          </Link>
        ))}
      </div>
      <hr className=" my-4" />
      <button className=" w-fit text-sm text-red-600" onClick={() => signOut()}>
        Keluar
      </button>
    </div>
  );
}
