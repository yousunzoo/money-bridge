"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  const path = usePathname();
  const background = (() => {
    if (path === "/" || path.startsWith("/lounge") || path.startsWith("/pblist") || path.startsWith("/my")) {
      return "bg-background-primary";
    }
    return "bg-white";
  })();
  return <main className={background}>{children}</main>;
}

export default Main;
