import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원 탈퇴",
};
function WithdrawLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default WithdrawLayout;
