import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "콘텐츠",
};

function DetailContentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default DetailContentLayout;
