import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "콘텐츠 수정하기",
};

function EditLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default EditLayout;
