import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 투자자 신규예약",
};

function MyCounselingNewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingNewLayout;
