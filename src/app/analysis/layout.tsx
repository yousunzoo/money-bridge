import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "투자 성향 분석",
};

function AnalysisLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default AnalysisLayout;
