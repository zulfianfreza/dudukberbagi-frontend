import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { DM_Sans, Montserrat, Noto_Sans, Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "dudukberbagi",
  description: "Generated by create next app",
};
const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(" leading-relaxed tracking-tight ", font.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
