import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
};

function Join({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Join;
