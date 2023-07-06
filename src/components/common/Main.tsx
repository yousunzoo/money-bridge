"use client";
import { getCookie, removeCookie } from "@/utils/cookies";
import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

function Main({ children }: { children: ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    if (localStorage.getItem("AutoLogin") === "false" && sessionStorage.getItem("AutoLogin") === null) {
      removeCookie("Authorization");
      removeCookie("refreshToken");
    }
  }, []);

  const background = (() => {
    if (
      path === "/" ||
      path.startsWith("/lounge") ||
      path.startsWith("/management") ||
      path.startsWith("/schedule") ||
      path.startsWith("/myCounseling") ||
      path.startsWith("/pblist") ||
      path.startsWith("/my")
    ) {
      return "bg-background-primary";
    }
    return "bg-white";
  })();

  return <main className={background}>{children}</main>;
}

export default Main;
