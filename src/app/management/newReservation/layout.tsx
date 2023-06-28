import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | PB 신규예약",
};

function ManagementNewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ManagementNewLayout;
