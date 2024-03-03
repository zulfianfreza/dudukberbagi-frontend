import { ICategory, ITab } from "@/types";
import { Building } from "iconsax-react";
import {
  Baskervville,
  Caveat,
  DM_Serif_Display,
  Lato,
  Libre_Baskerville,
  Merriweather,
  Noto_Serif_Display,
  Oswald,
  Pridi,
  Shadows_Into_Light,
} from "next/font/google";
import { LuBaby, LuStethoscope } from "react-icons/lu";
import { PiPottedPlant } from "react-icons/pi";
import { MdOutlineMosque, MdOutlineSchool } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { RiEarthquakeLine } from "react-icons/ri";

export const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});

export const oswald = Oswald({ subsets: ["latin"] });
export const merryweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const caveat = Caveat({ subsets: ["latin"] });
export const serif = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600", "800", "900"],
});
export const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const TAB_LIST: ITab[] = [
  {
    label: "Cerita",
    value: "story",
  },
  {
    label: "Kabar Terbaru",
    value: "news",
  },
  {
    label: "Donasi",
    value: "donation",
  },
];

export const MENU_LIST = [
  {
    label: "Beranda",
    path: "/",
    active: "",
  },
  {
    label: "Campaign",
    path: "/campaign",
    active: "campaign",
  },
  {
    label: "Galang Dana",
    path: "/campaign/new",
    active: "new",
  },
  {
    label: "Tentang Kami",
    path: "/about",
    active: "about",
  },
];

export const BANK_LIST = [
  {
    bank_code: "BNI",
    label: "BNI Virtual Account",
    image: "bni.webp",
  },
  {
    bank_code: "BCA",
    label: "BCA Virtual Account",
    image: "bca.webp",
  },
  {
    bank_code: "Mandiri",
    label: "Mandiri Virtual Account",
    image: "mandiri.png",
  },
  {
    bank_code: "BRI",
    label: "BRI Virtual Account",
    image: "bri.png",
  },
];

export const CATEGORY_LIST: ICategory[] = [
  {
    id: 1,
    label: "Kesehatan & Bantuan Medis",
    icon: LuStethoscope,
  },
  {
    id: 2,
    label: "Infrastruktur Umum",
    icon: Building,
  },
  {
    id: 3,
    label: "Bantuan Pendidikan",
    icon: MdOutlineSchool,
  },
  {
    id: 4,
    label: "Kemanusiaan",
    icon: LiaPeopleCarrySolid,
  },
  {
    id: 5,
    label: "Lingkungan",
    icon: PiPottedPlant,
  },
  {
    id: 6,
    label: "Balita & Anak Sakit",
    icon: LuBaby,
  },
  {
    id: 7,
    label: "Rumah Ibadah",
    icon: MdOutlineMosque,
  },
  {
    id: 8,
    label: "Bencana Alam",
    icon: RiEarthquakeLine,
  },
];
