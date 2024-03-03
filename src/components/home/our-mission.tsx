"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Container from "../container";
import { cn } from "@/lib/utils";
import Heading from "../heading";

export default function OurMission() {
  return (
    <Container className=" mt-32">
      <div className=" flex gap-16">
        <div className=" lg:flex-1">
          <Heading title="Apa tujuan kami?" tag="Our mission" />
          <p className=" mt-4 text-sm leading-relaxed text-slate-800">
            Melalui DudukBerbagi, kami bertujuan membangun jaringan solidaritas
            yang kokoh dan menjembatani kesempatan bagi mereka yang ingin
            berbuat baik, menciptakan lingkaran kebaikan yang tak terbatas.
          </p>
          <div className=" mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <FiCheckCircle className=" text-pink-500" />
              <p className=" flex-1 text-sm leading-relaxed text-slate-800 first-line:leading-none">
                Memberikan wadah bagi individu dan komunitas untuk bersatu dalam
                misi kemanusiaan
              </p>
            </div>
            <div className="flex gap-4">
              <FiCheckCircle className=" text-pink-500" />
              <p className=" flex-1 text-sm leading-relaxed text-slate-800 first-line:leading-none">
                Memfasilitasi penggalangan dana secara online untuk
                proyek-proyek sosial dan amal yang membawa dampak positif
              </p>
            </div>
            <div className="flex gap-4">
              <FiCheckCircle className=" text-pink-500" />
              <p className=" flex-1 text-sm leading-relaxed text-slate-800 first-line:leading-none">
                Mendorong setiap orang untuk berkontribusi dalam menciptakan
                perubahan yang signifikan dalam kehidupan mereka yang
                membutuhkan
              </p>
            </div>
          </div>
        </div>
        <div className=" flex-1"></div>
      </div>
    </Container>
  );
}
