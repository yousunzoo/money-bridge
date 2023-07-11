import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PB정보",
};

function DetailInfoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default DetailInfoLayout;
