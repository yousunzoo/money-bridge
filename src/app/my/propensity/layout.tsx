import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "나의 투자 성향 분석",
};

function MyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyLayout;
