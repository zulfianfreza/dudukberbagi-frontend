import { Campaign } from "@/types/campaign";
import { create } from "zustand";

interface ShareParamsStore {
  q: string;
  setQ: (q: string) => void;
}

const useShareParams = create<ShareParamsStore>((set) => ({
  q: "",
  setQ: (q) => set({ q }),
}));

export default useShareParams;
