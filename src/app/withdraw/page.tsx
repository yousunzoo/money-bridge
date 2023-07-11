"use client";
import CheckPassword from "@/components/myPage/editInfoPage/CheckPassword";
import React, { useState } from "react";

function SecessionPage() {
  const [didAgree, setDidAgree] = useState(false);

  const handleClick = () => {
    setDidAgree(true);
  };
  return (
    <>
      {didAgree ? (
        <CheckPassword type="withdraw" />
      ) : (
        <>
          <div className="card mb-12 bg-white p-4">
            <p className="text-center text-xl font-bold">
              저희 서비스를 이용해주셔서
              <br />
              감사합니다.
            </p>
          </div>
          <p className="mb-[160px] text-center">
            머니브릿지를 탈퇴하고
            <br />
            모든 데이터 폐기하는 데에 동의하십니까?
          </p>
          <button onClick={handleClick} className="button">
            동의
          </button>
        </>
      )}
    </>
  );
}

export default SecessionPage;
