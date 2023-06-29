import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "나의 프로필 수정하기",
};

function EditProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default EditProfileLayout;
