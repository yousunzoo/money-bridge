import TopNav from "@/components/common/TopNav";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "투자 성향 분석",
};

function AnalysisLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="투자 성향 알아보기" hasBack={true} />
      {children}
    </>
  );
}

export default AnalysisLayout;
