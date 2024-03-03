"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import useDialogDeleteCampaign from "@/hooks/use-dialog-delete-campaign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign } from "@/services/campaign";
export default function DialogDeleteCampaign() {
  const { isOpen, onClose, onOpen, campaign } = useDialogDeleteCampaign();

  const toggleOpenDialog = () => {
    isOpen ? onClose() : onOpen();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["campaign", "delete", campaign.id],
    mutationFn: deleteCampaign,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      onClose();
    },
  });

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    mutateAsync({ campaignId: campaign.id });
  };
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpenDialog}>
      <DialogContent className=" sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className=" text-center">Hapus Campaign</DialogTitle>
        </DialogHeader>
        <div className=" mt-4">
          <div className=" relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={campaign.thumbnail}
              fill
              alt={campaign.title}
              className=" object-cover"
            />
          </div>
          <p className=" mt-2 font-semibold text-slate-800">{campaign.title}</p>

          <div className=" mt-4 flex  justify-end gap-2">
            <Button variant="secondary">Batal</Button>
            <Button onClick={handleDelete} disabled={isPending}>
              Hapus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
