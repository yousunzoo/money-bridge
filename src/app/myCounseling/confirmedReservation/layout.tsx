import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 투자자 확정된 상담",
};

function MyCounselingComfirmedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingComfirmedLayout;
