import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import help from "/public/assets/images/help.svg";
import Image from "next/image";

function Authentication() {
  const [value, setValue] = useState("");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const time = useRef(300);
  const timerId = useRef<NodeJS.Timeout>();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    timerId.current = setInterval(() => {
      //@ts-ignore
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      if (time.current > 0) {
        time.current -= 1;
      }
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      // clearInterval(timerId.current);
      setSec(0);
    }
  }, [sec]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      router.push(`/findPassword/${pathName.split("/")[2]}/selectInformation`);
    }
  };

  return (
    <>
      <p className="my-[56px] text-[20px] font-bold leading-[28px]">인증코드 입력</p>
      <p className="mb-[8px] text-[12px] leading-[18px] text-[#242424]">
        개인정보 보호를 위해 인증코드는 5분간 유효합니다.
      </p>
      <div className="flex gap-[18px]">
        <input className={`form_input ${value ? "entering" : ""}`} onChange={handleChange} />
        <button
          className="break-keep text-[14px] leading-[20px]"
          onClick={() => {
            time.current = 300;
          }}
        >
          재발송
        </button>
      </div>
      <p className="mb-[32px] mt-[2px] px-[8px] text-[12px] leading-[18px] text-[#eb5147]">
        남은시간: {min}:{sec < 10 ? `0${sec}` : sec}
      </p>
      <div className="mb-[42px] flex flex-col gap-[8px]">
        <div className="flex gap-[6px]">
          <Image src={help} alt="help" />
          <p className="font-bold leading-[22px]">메일을 받지 못하셨나요?</p>
        </div>
        <div className="text-[14px] leading-[24px]">
          *정확한 이메일 주소를 등록하셨는지 확인해 주세요.
          <br />
          *인증메일 재발송을 원하시면 재발송 버튼을 눌러주세요.
        </div>
      </div>
      <button
        className={`h-[56px] w-full rounded-[8px] text-[20px] font-bold leading-[28px] ${
          value ? "cursor-pointer bg-[#153445] text-white" : "cursor-not-allowed bg-[#ececec] text-[#565656]"
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
