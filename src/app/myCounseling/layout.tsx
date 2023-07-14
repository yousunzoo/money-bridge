import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "나의 상담",
};

function MyCounselingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingLayout;
