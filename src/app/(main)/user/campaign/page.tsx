"use client";
import CampaignItem from "@/components/campaign-item";
import DialogDeleteCampaign from "@/components/dialog/dialog-delete-campaign";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDialogDeleteCampaign from "@/hooks/use-dialog-delete-campaign";
import { CATEGORY_LIST } from "@/lib/constants";
import { getMyCampaigns } from "@/services/campaign";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { Trash } from "iconsax-react";
import Image from "next/image";
import React from "react";

export default function MyCampaignPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["campaigns", "me"],
    queryFn: () => getMyCampaigns(),
  });
  const { onOpen, setCampaign } = useDialogDeleteCampaign();

  return (
    <>
      <h1 className=" text-lg font-semibold text-slate-800">Campaign Saya</h1>
      {isLoading ? (
        <p>loading</p>
      ) : (
        data && (
          <div className=" mt-4">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className=" w-5">#</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((campaign, i) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <div className=" relative aspect-video w-20 overflow-hidden rounded-md">
                        <Image
                          src={campaign.thumbnail}
                          fill
                          alt={campaign.title}
                          className=" object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>
                      {
                        CATEGORY_LIST.find(
                          (category) => category.id == campaign.category_id,
                        )?.label
                      }
                    </TableCell>
                    <TableCell>
                      {format(
                        new Date(campaign.created_at),
                        "dd MMM yyyy h:mm:ss",
                        {
                          locale: id,
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          className=" h-8 w-8"
                          size="icon"
                          onClick={() => {
                            onOpen();
                            setCampaign(campaign);
                          }}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      )}

      <DialogDeleteCampaign />
    </>
  );
}
