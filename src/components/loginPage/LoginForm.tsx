"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [autoLogin, setAutoLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = () => {};

  return (
    <div className="pt-[100px]">
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">이메일</h2>
          <input className="formInput" />
          <span className="text-xs text-slate-300">* @포함하여 작성해 주세요.</span>
        </div>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">비밀번호</h2>
          <input className="formInput" />
          <span className="text-xs text-slate-300">* 8자 이상입니다.</span>
        </div>
        {/* <button type="submit" className="h-[40px] w-full bg-gray-300 "> */}
        <button type="button" className="h-[40px] w-full bg-gray-300 ">
          <span className="text-xs font-semibold text-slate-400">로그인</span>
        </button>
      </form>
      <div className="flex h-[50px] items-center justify-center gap-1">
        <input type="radio" checked={autoLogin} onClick={() => setAutoLogin(!autoLogin)} />
        <span className="text-xs font-semibold">로그인 상태 유지하기</span>
      </div>
      <button type="button" className="h-[40px] w-full bg-black ">
        <span className="text-xs font-semibold text-slate-200">회원가입</span>
      </button>
      <div className="flex h-[40px] items-center justify-center gap-3 text-xs font-semibold">
        <button>
          <span>이메일 찾기</span>
        </button>
        <button>
          <span>비밀번호 찾기</span>
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
