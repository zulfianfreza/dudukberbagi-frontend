"use client";

import { lato, merryweather, oswald, serif } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Container from "../container";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export default function Hero() {
  return (
    <Container className="flex h-screen w-full items-center gap-16 pt-24">
      <div className=" flex-1">
        {/* <p className={cn(" text-sm text-pink-500")}>Mulai dari sekarang</p> */}
        <h1
          className={cn(
            " text-[48px] font-extrabold leading-none tracking-tight  text-slate-800 lg:text-[60px]",
            // merryweather.className,
          )}
        >
          Mari menjadi bagian <br />
          dari perubahan
        </h1>
        <p className=" mt-8 text-sm leading-relaxed text-slate-500">
          Terkumpulnya kebaikan di setiap duduk, hadirnya harapan di setiap
          berbagi. Bersama-sama, mari kita wujudkan perubahan yang nyata melalui
          kebaikan yang bermula dari hati, satu donasi, satu duduk, dan satu
          harapan.
        </p>
        <div className=" mt-8">
          <Button className=" rounded-full">Donasi Sekarang</Button>
        </div>
        <div className=" mt-8 flex items-center gap-4">
          <div className="flex">
            <div className=" relative aspect-square w-10 overflow-hidden rounded-full">
              <Image
                src="/images/53.png"
                fill
                alt=""
                className=" object-cover"
              />
            </div>
            <div className=" relative -ml-3 aspect-square w-10 overflow-hidden rounded-full ring-2 ring-white">
              <Image
                src="/images/1.png"
                fill
                alt=""
                className=" object-cover"
              />
            </div>
            <div className=" relative -ml-3 aspect-square w-10 overflow-hidden rounded-full ring-2 ring-white">
              <Image
                src="/images/49.png"
                fill
                alt=""
                className=" object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className=" font-semibold text-slate-800">1000+</h1>
            <p className=" text-sm leading-none text-slate-500">
              telah terbantu
            </p>
          </div>
        </div>
      </div>
      <div className=" relative hidden flex-1 items-start justify-center gap-2 lg:flex">
        <div className=" relative aspect-[1/2.5] w-40 overflow-hidden rounded-xl brightness-50">
          <Image
            src="/images/hero_2.jpeg"
            fill
            alt=""
            className=" object-cover object-center"
          />
        </div>
        <div className=" relative -mt-10 aspect-[1/2.5] w-40 overflow-hidden rounded-xl brightness-50">
          <Image
            src="/images/volunteer.png"
            fill
            alt=""
            className=" object-cover object-center"
          />
        </div>
        <div className=" relative aspect-[1/2.5] w-40 overflow-hidden rounded-xl brightness-50">
          <Image
            src="/images/hero2.jpg"
            fill
            alt=""
            className=" object-cover object-center"
          />
        </div>
        <div className=" absolute -left-10 bottom-0 flex w-72 items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
          <div className=" relative aspect-square w-12 overflow-hidden rounded-full">
            <Image src="/images/53.png" fill alt="" className=" object-cover" />
          </div>
          <div className=" flex flex-1 flex-col">
            <h1 className=" font-semibold text-slate-800">Julian Reza</h1>
            <p className=" text-sm text-slate-500">
              Good things come to good people
            </p>
          </div>
        </div>

        <div className=" absolute -right-20 top-0 w-72 rounded-xl border bg-white p-4 shadow-sm">
          <Progress value={72} />
          <div className="mt-2 flex justify-between">
            <div className="">
              <p className=" text-xs text-slate-500">Donasi Terkumpul</p>
              <h1 className=" text-lg font-semibold text-pink-500">
                Rp240.050.000
              </h1>
            </div>
            <p className=" text-xs text-slate-500">19 hari lagi</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
