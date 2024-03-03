"use client";
import Container from "@/components/container";
import OurMission from "@/components/home/our-mission";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function AboutPage() {
  const [name, setName] = useState("Adam Berriz");
  const [email, setEmail] = useState("adamberriz@gmail.com");
  const [isLiveEditName, setIsLiveEditName] = useState(false);
  const [isLiveEditEmail, setIsLiveEditEmail] = useState(false);

  return (
    <>
      <OurMission />

      <Container className=" mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell className=" w-96">
                {isLiveEditName ? (
                  <input
                    onBlur={() => {
                      setIsLiveEditName(false);
                    }}
                    autoFocus
                    className=" w-fit bg-transparent text-sm tracking-tight focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p onClick={() => setIsLiveEditName(true)}>{name}</p>
                )}
              </TableCell>
              <TableCell>{isLiveEditEmail ? null : <p>{email}</p>}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
