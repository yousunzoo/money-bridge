import React from "react";
import TopNav from "../common/TopNav";
import ResetPasswordForm from "../common/ResetPasswordForm";

function ResetPassword() {
  return (
    <>
      <TopNav title="비밀번호 찾기" hasBack backGroundWhite />
      <p className="mb-[40px] ml-[16px] mt-[56px] text-[20px] font-bold leading-[28px]">비밀번호 재설정</p>
      <ResetPasswordForm />
    </>
  );
}

export default ResetPassword;
