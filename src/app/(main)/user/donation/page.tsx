"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { getMyDonation } from "@/services/donation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyDonationPage() {
  const [isLiveEdit, setIsLiveEdit] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["donations", "me"],
    queryFn: () => getMyDonation(),
  });

  return (
    <div>
      <h1 className=" text-lg font-semibold text-slate-800">Donasi Saya</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        data && (
          <div className=" mt-4">
            <Table className="">
              <TableHeader className="">
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Donasi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((donation, i) => (
                  <TableRow key={donation.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Link
                        href={`/campaign/${donation.campaign.slug}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <div className=" relative aspect-video w-20 overflow-hidden rounded-md">
                          <Image
                            src={donation.campaign.thumbnail}
                            fill
                            alt={donation.campaign.title}
                            className=" object-cover"
                          />
                        </div>
                        {donation.campaign.title}
                      </Link>
                    </TableCell>
                    <TableCell>Rp{numberFormat(donation.amount)}</TableCell>
                    <TableCell>
                      {format(
                        new Date(donation.created_at),
                        "dd MMM yyyy h:mm:ss",
                        {
                          locale: id,
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <p onClick={() => setIsLiveEdit(!isLiveEdit)}>
                        {donation.status}
                      </p>
                    </TableCell>
                    <TableCell>
                      {donation.status == "PENDING" ? (
                        <Button className=" h-8 rounded-md text-xs">
                          Bayar
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      )}
    </div>
  );
}
