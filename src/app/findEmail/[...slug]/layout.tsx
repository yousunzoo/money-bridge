import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "이메일 찾기",
};

function FindEmail({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default FindEmail;
