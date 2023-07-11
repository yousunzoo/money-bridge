import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: "콘텐츠",
};

function DetailReviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default DetailReviewLayout;
