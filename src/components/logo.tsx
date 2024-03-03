"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(" flex items-center gap-1", className)}>
      <div className=" relative aspect-square w-10">
        <Image
          src="/images/logo-dudukberbagi.png"
          fill
          alt="logo"
          className=" object-contain"
        />
      </div>
      <span className="text-lg lowercase text-sky-400">
        Duduk
        <span className=" font-bold text-pink-500">Berbagi</span>
      </span>
    </Link>
  );
}
