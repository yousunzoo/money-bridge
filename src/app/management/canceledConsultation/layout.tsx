import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | PB 취소된 상담",
};

function ManagementCancelLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ManagementCancelLayout;
