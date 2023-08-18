import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "고객관리",
};

export const revalidate = 0;

function Management({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Management;
