import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 투자자 취소된 상담",
};

function MyCounselingCancelLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingCancelLayout;
