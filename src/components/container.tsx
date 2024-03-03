"use client";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(" container mx-auto px-6 sm:px-8 lg:px-32", className)}>
      {children}
    </div>
  );
}
