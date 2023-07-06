import TopNav from "@/components/common/TopNav";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 개인 정보 설정",
};

function EditInfoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="개인 정보 수정" hasBack={true} />
      {children}
    </>
  );
}

export default EditInfoLayout;
