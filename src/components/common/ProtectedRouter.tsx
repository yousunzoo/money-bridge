"use client";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { redirect, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const needLoginPath = ["/my", "/analysis", "/bookmark", "/reservation"];

function ProtectedRouter({ children }: { children: ReactNode }) {
  const { isLoginError, token } = useGetUserInfo();
  const pathname = usePathname();

  useEffect(() => {
    needLoginPath.forEach(item => {
      if (pathname.includes(item) && (!token || isLoginError)) {
        redirect("/login");
      }
    });
  }, [pathname]);

  return <>{children}</>;
}

export default ProtectedRouter;
