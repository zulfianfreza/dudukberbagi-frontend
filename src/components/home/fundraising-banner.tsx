"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Container from "../container";

export default function FundRaisingBanner() {
  return (
    <div className=" mt-16">
      <Container>
        <div className=" overflow-hidden rounded-xl bg-[url('/images/Charity.png')] bg-cover bg-center">
          <div className=" flex flex-col items-center gap-8 overflow-hidden bg-sky-400 bg-opacity-[0.95] p-6 py-16">
            <div className=" text-center">
              <h1 className=" font-semibold text-slate-50">Galang Dana</h1>
              <p className=" max-w-xl text-center text-sm font-medium text-slate-50/90">
                Tidak ada tindakan terlalu kecil ketika dilakukan dengan hati
                yang besar. Ayo, satukan kekuatan kita dalam berbagi, karena
                setiap dukungan membentuk cerita kebaikan yang tak terlupakan.
              </p>
            </div>
            <Button
              asChild
              className=" rounded-full bg-white px-6 text-sky-400 hover:bg-white/90"
            >
              <Link href="/campaign/new">Buat Campaign</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
