"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function LoginForm() {
  const [autoLogin, setAutoLogin] = useState(false);
  const noticeEmail = useRef<HTMLSpanElement>(null);
  const noticePassword = useRef<HTMLSpanElement>(null);

  const schema = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(8).max(15).required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  if (errors.email) {
    noticeEmail.current?.classList.remove("text-slate-300");
    noticeEmail.current?.classList.add("text-red-600");
  } else {
    noticeEmail.current?.classList.add("text-slate-300");
    noticeEmail.current?.classList.remove("text-red-600");
  }

  if (errors.password) {
    noticePassword.current?.classList.remove("text-slate-300");
    noticePassword.current?.classList.add("text-red-600");
  } else {
    noticePassword.current?.classList.add("text-slate-300");
    noticePassword.current?.classList.remove("text-red-600");
  }

  const onSubmit = () => {
    if (noticeEmail.current?.classList.contains("text-red-600")) {
      alert("ㅡemailㅡ");
    } else if (noticePassword.current?.classList.contains("text-red-600")) {
      alert("ㅡpasswordㅡ");
    }
  };

  return (
    <div className="pt-[100px]">
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">이메일</h2>
          <input type="text" className="formInput" {...register("email")} />
          <span className="text-xs" ref={noticeEmail}>
            * @포함하여 작성해 주세요.
          </span>
        </div>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">비밀번호</h2>
          <input type="password" className="formInput" {...register("password")} />
          <span className="text-xs" ref={noticePassword}>
            * 8자 이상입니다.
          </span>
        </div>
        {/* <button type="submit" className="h-[40px] w-full bg-gray-300 "> */}
        <button type="button" className="h-[40px] w-full bg-gray-300" onClick={onSubmit}>
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
