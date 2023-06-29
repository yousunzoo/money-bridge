import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

function FindPassword({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default FindPassword;
