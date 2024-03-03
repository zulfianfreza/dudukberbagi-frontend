"use client";

import { useScrollPosition } from "@/hooks/use-scroll-position";
import { MENU_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuSearch, LuX } from "react-icons/lu";
import useDelayedRender from "use-delayed-render";
import Logo from "../logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserMenu from "./user-menu";

interface NavbarProps {
  user: User | undefined | null;
}

export default function Navbar({ user }: NavbarProps) {
  const scrollPosition = useScrollPosition();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { mounted, rendered } = useDelayedRender(isMenuOpen, {
    enterDelay: 30,
    exitDelay: 300,
  });
  const [menuType, setMenuType] = useState("menu" || "user");

  function toggleMenuOpen() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  return (
    <>
      <header
        className={cn(
          " fixed z-[12] w-full bg-white p-6 px-6 shadow-sm sm:p-6 sm:px-8 lg:px-10",
          {
            "bg-transparent shadow-none": pathname == "/",
          },
          { " bg-white shadow-sm": scrollPosition > 0 },
        )}
      >
        <div className=" flex w-full items-center gap-2">
          <div className=" flex flex-1 items-center gap-4">
            <button
              className={cn(" visible text-slate-800 md:hidden", {
                "text-slate-800": scrollPosition > 0,
              })}
              onClick={toggleMenuOpen}
            >
              <LuMenu size={20} className={cn({ hidden: isMenuOpen })} />
              <LuX size={20} className={cn({ hidden: !isMenuOpen })} />
            </button>
            <Logo className=" ml-1" />
          </div>
          <nav className=" hidden items-center gap-6 md:flex">
            {MENU_LIST.map((menu, index) => (
              <Link
                key={index}
                href={menu.path}
                className={cn(
                  " py-2.5 text-sm font-medium text-slate-800 hover:text-pink-500",
                  {
                    "text-pink-500":
                      pathname.split("/")[pathname.split("/").length - 1] ==
                      menu.active,
                  },
                )}
              >
                {menu.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4 ">
            <div className="">
              <form action="/search">
                <div className=" relative hidden lg:block">
                  <Input
                    name="q"
                    className=" w-[212px] rounded-full  border-none bg-slate-100 pl-11 focus-visible:ring-0"
                    placeholder="Search..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <LuSearch className=" absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
              </form>
              <Link href="/search">
                <LuSearch
                  className=" block cursor-pointer text-slate-800 lg:hidden"
                  size={20}
                />
              </Link>
            </div>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Button className=" rounded-full px-6 " asChild>
                <Link href="/sign-in">Masuk</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      {mounted && (
        <div
          className={cn(
            "fixed inset-0 z-[11] h-screen w-full bg-white px-8 pt-24 opacity-0 backdrop-blur-lg transition ease-in-out md:hidden",
            { " opacity-100": rendered },
          )}
        >
          <div className="flex flex-col gap-6 py-8">
            {MENU_LIST.map((menu, index) => (
              <button
                key={index}
                className={cn(
                  " w-fit -translate-x-4 text-sm font-medium text-slate-800 opacity-0 transition-all",
                  { "translate-x-0 opacity-100": rendered },
                )}
                onClick={() => {
                  router.push(menu.path);
                }}
                style={{ transitionDelay: `${150 + 25 * index}ms` }}
              >
                {menu.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
