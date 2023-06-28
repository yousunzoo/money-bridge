import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "개인 정보 설정",
};

function EditInfoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default EditInfoLayout;
