import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "콘텐츠 작성하기",
};

function WriteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default WriteLayout;
