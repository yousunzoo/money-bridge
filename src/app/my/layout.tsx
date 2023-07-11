import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "마이 페이지",
};

function MyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyLayout;
