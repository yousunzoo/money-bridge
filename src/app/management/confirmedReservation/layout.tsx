import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | PB 확정된 상담",
};

function ManagementConfirmedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ManagementConfirmedLayout;
