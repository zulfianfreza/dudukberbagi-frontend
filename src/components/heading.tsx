"use client";

import { serif } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
}

export default function Heading({ tag, title, subtitle }: HeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        {tag && (
          <div className=" relative">
            <p className=" text-sm font-medium text-pink-500">{tag}</p>
            <div className=" absolute  -left-4 top-1/2 h-4 w-px -translate-y-1/2 bg-pink-500"></div>
          </div>
        )}
        <h1 className={cn(" text-2xl font-bold text-slate-800")}>{title}</h1>
        <p className=" max-w-lg text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
