import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 개인 정보 수정",
};

function EditInfoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default EditInfoLayout;
