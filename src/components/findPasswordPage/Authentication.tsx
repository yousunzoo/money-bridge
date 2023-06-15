import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import help from "/public/assets/images/help.svg";
import Image from "next/image";

const TIMER_TIME = 300;

function Authentication() {
  const [value, setValue] = useState("");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(TIMER_TIME);
  const timerId = useRef<NodeJS.Timeout>();
  const router = useRouter();
  const pathName = usePathname();

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
    const routePath = pathName.split("/")[1] === "join" ? "password" : "selectInformation";
    if (value) {
      router.push(`/${pathName.split("/")[1]}/${pathName.split("/")[2]}/${routePath}`);
    }
  };

  const handleResend = () => {
    clearInterval(timerId.current);
    startTimer();
  };

  return (
    <>
      <p className="my-14 text-xl font-bold leading-7">인증코드 입력</p>
      <p className="mb-2 text-xs leading-[18px] text-black">개인정보 보호를 위해 인증코드는 5분간 유효합니다.</p>
      <div className="flex gap-[18px]">
        <input className={`input_authentication ${value ? "entering" : ""}`} onChange={handleChange} />
        <button className="break-keep text-sm leading-5" onClick={handleResend}>
          재발송
        </button>
      </div>
      <p className="mb-8 mt-0.5 px-2 text-xs leading-[18px] text-status-alert">
        남은시간: {min}:{sec < 10 ? `0${sec}` : sec}
      </p>
      <div className="mb-[42px] flex flex-col gap-2">
        <div className="flex gap-1.5">
          <Image src={help} alt="help" />
          <p className="font-bold leading-[22px]">메일을 받지 못하셨나요?</p>
        </div>
        <div className="text-sm leading-6">
          *정확한 이메일 주소를 등록하셨는지 확인해 주세요.
          <br />
          *인증메일 재발송을 원하시면 재발송 버튼을 눌러주세요.
        </div>
      </div>
      <button
        className={`h-14 w-full rounded-[8px] text-xl font-bold leading-7 ${
          value ? "bg-primary-normal text-white" : "bg-background-disabled text-gray-heavy"
        }`}
        onClick={handleClick}
        disabled={value.length === 0}
      >
        확인
      </button>
    </>
  );
}

export default Authentication;
