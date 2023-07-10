import TopNav from "@/components/common/TopNav";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "나의 프로필 수정하기",
};

function EditProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="프로필 수정" hasBack={true} />
      <div className="mb-8 text-xs">
        <p>*해당 프로필은 리스트 상에 노출되는 정보이오니 신중히 입력해 주세요.</p>
        <p>*일부 정보는 회원가입 시 등록하신 정보가 반영됩니다.</p>
      </div>
      {children}
    </>
  );
}

export default EditProfileLayout;
