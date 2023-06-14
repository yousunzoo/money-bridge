import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

const TIMER_TIME = 300;

function AdminAuthentication() {
  const [code, setCode] = useState("");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(TIMER_TIME);
  const timerId = useRef<NodeJS.Timeout>();

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
    setCode(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {};

  const handleResend = () => {
    clearInterval(timerId.current);
    startTimer();
  };

  return (
    <>
      <p className="mb-[38px] mt-[56px] break-all text-[20px] font-bold leading-[28px]">
        관리자 인증을 위해 해당 이메일로
        <br /> 인증코드를 발송하였습니다.
      </p>
      <p className="mb-[50px] w-full rounded-sm px-3 text-xl font-bold leading-7 text-primary-normal">
        Moneybridge@logo.com
      </p>
      <p className="mb-4 text-xl font-bold leading-5">인증코드 입력</p>
      <p className="mb-[8px] text-[12px] leading-[18px]">개인정보 보호를 위해 인증코드는 5분 간 유효합니다.</p>

      <div className="flex gap-[18px]">
        <input className={`form_input ${code ? "entering" : ""}`} onChange={handleChange} />
        <button className="break-keep text-[14px] leading-[20px] underline" onClick={handleResend}>
          재발송
        </button>
      </div>
      <p className="mb-[20px] mt-[2px] px-[8px] text-[12px] leading-[18px] text-status-alert">
        남은시간: {min}:{sec < 10 ? `0${sec}` : sec}
      </p>
      <button
        className={`h-[56px] w-full rounded-[8px] text-[20px] font-bold leading-[28px] ${
          code ? "cursor-pointer bg-[#153445] text-white" : "cursor-not-allowed bg-[#ececec] text-[#565656]"
        }`}
        onClick={handleClick}
        disabled={code.length === 0}
      >
        확인
      </button>
    </>
  );
}

export default AdminAuthentication;