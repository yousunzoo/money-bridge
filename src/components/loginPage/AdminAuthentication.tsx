import { useAuthenticationStore } from "@/store/authenticationStore";
import { IResponseLogin } from "@/types/login";
import { setCookie } from "@/utils/cookies";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ButtonModal from "../common/ButtonModal";
import { useAuthentication } from "@/hooks/useAuthentication";

const TIMER_TIME = 300;

function AdminAuthentication() {
  const [value, setValue] = useState("");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(TIMER_TIME);
  const timerId = useRef<NodeJS.Timeout>();

  const [isOpen, setIsOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const queryClient = useQueryClient();
  const adminInfo = queryClient.getQueryData(["login"]) as IResponseLogin;
  const router = useRouter();
  const { code } = useAuthenticationStore();
  const authentication = useAuthentication();

  const modalContents_Error = {
    content: "인증코드가 일치하지 않습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
    },
  };

  const modalContents_Success = {
    content: "인증되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
      router.push("/");
    },
  };

  const startTimer = () => {
    time.current = TIMER_TIME;
    timerId.current = setInterval(() => {
      // @ts-ignore
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      setSec(0);
    }
  }, [sec]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value === code) {
      setCookie("Authorization", adminInfo.headers.authorization);
    }
    setModalError(value !== code);
    setIsOpen(true);
  };

  const handleResend = () => {
    clearInterval(timerId.current);
    startTimer();
    authentication(JSON.parse(adminInfo.config.data).email);
  };

  return (
    <>
      <p className="mb-[38px] mt-14 break-all text-xl font-bold leading-7">
        관리자 인증을 위해 해당 이메일로
        <br /> 인증코드를 발송하였습니다.
      </p>
      <p className="mb-[50px] w-full rounded-sm px-3 text-xl font-bold leading-7 text-primary-normal">
        {JSON.parse(adminInfo.config.data).email}
      </p>
      <p className="mb-4 text-xl font-bold leading-5">인증코드 입력</p>
      <p className="mb-2 text-xs leading-[18px]">개인정보 보호를 위해 인증코드는 5분 간 유효합니다.</p>

      <div className="flex gap-[18px]">
        <input className={`input_authentication ${value ? "entering" : ""}`} onChange={handleChange} />
        <button className="break-keep text-sm leading-5 underline" onClick={handleResend}>
          재발송
        </button>
      </div>
      <p className="mb-5 mt-0.5 px-2 text-xs leading-[18px] text-status-alert">
        남은시간: {min}:{sec < 10 ? `0${sec}` : sec}
      </p>
      <button
        className={`h-14 w-full rounded-[8px] text-xl font-bold leading-7 ${
          value
            ? "cursor-pointer bg-primary-normal text-white"
            : "cursor-not-allowed bg-background-disabled text-gray-heavy"
        }`}
        onClick={handleClick}
        disabled={value.length === 0}
      >
        확인
      </button>
      {isOpen && (
        <ButtonModal
          modalContents={modalError ? modalContents_Error : modalContents_Success}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></ButtonModal>
      )}
    </>
  );
}

export default AdminAuthentication;
