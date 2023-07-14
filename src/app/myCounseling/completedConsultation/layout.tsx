import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 투자자 완료된 상담",
};

function MyCounselingCompletedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingCompletedLayout;
