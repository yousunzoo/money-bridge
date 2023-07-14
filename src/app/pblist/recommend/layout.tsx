import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "추천 PB 리스트",
};

function RecommendLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default RecommendLayout;
