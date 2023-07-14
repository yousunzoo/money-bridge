import { Metadata } from "next";
import { ReactNode } from "react";
import "@/styles/content.css";

export const metadata: Metadata = {
  title: "콘텐츠",
};

function ContentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ContentLayout;
