"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  const path = usePathname();
  return <main className={path}>{children}</main>;
}

export default Main;
