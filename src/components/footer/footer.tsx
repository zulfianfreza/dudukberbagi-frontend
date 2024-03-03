"use client";

import { CATEGORY_LIST, MENU_LIST } from "@/lib/constants";
import Link from "next/link";
import { LuFacebook, LuLinkedin } from "react-icons/lu";
import { RiInstagramLine, RiTwitterLine } from "react-icons/ri";
import Container from "../container";
import Logo from "../logo";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiX,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className=" mt-8 w-full">
      <div className=" w-full ">
        <Container className=" grid grid-cols-1 gap-8 gap-x-16 py-16 lg:grid-cols-3 lg:px-8">
          <div className="">
            <div className=" space-y-4">
              <Logo className="" />
              <p className=" text-sm leading-relaxed text-slate-800">
                dudukberbagi adalah sebuah platform penggalangan dana online
                yang memungkinkan individu dan komunitas menjembatani
                kesenjangan sosial, dan membawa dampak positif pada masyarakat.
              </p>
            </div>
          </div>
          <div className="">
            <h1 className=" font-medium text-slate-500">Kategori</h1>
            <div className="mt-4 flex flex-col items-start gap-2">
              {CATEGORY_LIST.map((category, i) => (
                <Link key={i} href="/" className=" text-sm text-slate-800">
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <h1 className=" font-medium text-slate-500">Menu</h1>
            <div className="mt-4 flex flex-col items-start gap-2">
              {MENU_LIST.map((menu, i) => (
                <Link key={i} href="/" className=" text-sm text-slate-800">
                  {menu.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <div className=" flex w-full flex-col items-start justify-between gap-4 px-5 py-6 md:flex-row md:items-center md:px-10">
        <p className="  text-sm text-slate-500">
          &copy; 2023 dudukberbagi. All right reserved.
        </p>

        <div className="flex items-center gap-4">
          <SiX className=" cursor-pointer text-slate-500 transition hover:text-slate-800" />
          <SiLinkedin className=" cursor-pointer text-slate-500 transition hover:text-slate-800" />
          <SiFacebook className=" cursor-pointer text-slate-500 transition hover:text-slate-800" />
          <SiInstagram className=" cursor-pointer text-slate-500 transition hover:text-slate-800" />
          <SiTiktok className=" cursor-pointer text-slate-500 transition hover:text-slate-800" />
        </div>
      </div>
    </footer>
  );
}
