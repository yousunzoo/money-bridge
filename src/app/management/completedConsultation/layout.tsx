import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | PB 완료된 상담",
};

function ManagementCompleteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ManagementCompleteLayout;
