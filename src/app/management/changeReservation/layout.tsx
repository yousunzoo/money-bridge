import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | PB 예약 변경",
};

function ManagementChangeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ManagementChangeLayout;
