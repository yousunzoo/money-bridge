import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 상담 가능시간 변경하기",
};

function ChangeTimeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ChangeTimeLayout;
