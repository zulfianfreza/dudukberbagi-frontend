import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Intl from "intl";
import "intl/locale-data/jsonp/id-ID";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberFormat(price: number) {
  return new Intl.NumberFormat("id-ID").format(price);
}

export function getInitialName(name: string) {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}
