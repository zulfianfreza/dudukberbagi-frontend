import { Campaign } from "@/types/campaign";
import { create } from "zustand";

interface DialogDeleteCampaignStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  campaign: Campaign;
  setCampaign: (campaign: Campaign) => void;
}

const useDialogDeleteCampaign = create<DialogDeleteCampaignStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  campaign: {} as Campaign,
  setCampaign: (campaign) => set({ campaign }),
}));

export default useDialogDeleteCampaign;
