import { Icon } from "iconsax-react";
import type { IconType } from "react-icons";

export interface Meta {
  message: string;
  code: number;
  status: string;
}

export interface BaseResponse<T> {
  meta: Meta;
  data: T;
}

export type TAB_TYPE = "story" | "news" | "donation";
export interface ITab {
  label: string;
  value: TAB_TYPE;
}

export interface ICategory {
  id: number;
  label: string;
  icon: Icon | IconType;
}
