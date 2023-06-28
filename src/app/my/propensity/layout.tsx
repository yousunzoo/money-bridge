import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "나의 투자성향",
};

function MyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyLayout;
