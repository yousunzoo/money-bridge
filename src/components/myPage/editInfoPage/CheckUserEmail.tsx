import { useAuthentication } from "@/hooks/useAuthentication";
import React from "react";

function CheckUserEmail({ email, moveToAuthentication }: { email: string; moveToAuthentication: () => void }) {
  const authentication = useAuthentication();
  const handleClick = () => {
    authentication(email);
    moveToAuthentication();
  };
  return (
    <section>
      <h3 className="mb-20 text-xl font-bold">가입할 때 등록한 이메일을 확인해주세요</h3>
      <p className="form_input mb-1 py-3">{email}</p>
      <p className="mb-32 px-2 text-xs text-gray-normal">*이메일은 수정이 불가합니다.</p>
      <button onClick={handleClick} className="button">
        인증코드 받기
      </button>
    </section>
  );
}

export default CheckUserEmail;
