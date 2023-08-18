import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "임시저장한 콘텐츠",
};

export const revalidate = 0;

function TemporaryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default TemporaryLayout;
