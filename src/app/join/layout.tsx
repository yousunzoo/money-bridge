import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
};

function Join({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Join;
