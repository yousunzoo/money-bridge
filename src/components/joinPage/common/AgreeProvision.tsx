import React, { useState } from "react";
import checkProvision from "/public/assets/images/checkProvision.svg";
import openProvision from "/public/assets/images/openProvision.svg";
import close from "/public/assets/images/close.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const necessary = [
  { id: 0, title: "[필수] 머니브릿지 이용약관" },
  { id: 1, title: "[필수] 개인정보 취급방침 동의" },
  { id: 2, title: "[필수] 개인정보 제 3자 제공 동의" },
];
const optional = [
  { id: necessary.length, title: "[선택] 위치기반 서비스 이용 동의" },
  { id: necessary.length + 1, title: "[선택] 포트폴리오 관련 정보 수신 동의" },
  { id: necessary.length + 2, title: "[선택] 마케팅 및 정보성 알림 수신 동의" },
];

function AgreeProvision() {
  const router = useRouter();
  const pathName = usePathname();
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>(necessary.concat(optional).map(() => false));

  const handleCheckboxClick = (key: number) => {
    setIsChecked({ ...isChecked, [key]: !isChecked[key] });
  };

  const handleAllClick = () => {
    setIsChecked(necessary.concat(optional).map(() => true));
  };

  const isAllChecked = () => {
    return Object.values(isChecked).every(checked => checked);
  };

  const isNecessaryAllChecked = () => {
    const necessaryLength = necessary.length;
    for (let i = 0; i < necessaryLength; i++) {
      if (isChecked[i] === false) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (isNecessaryAllChecked()) {
      const joinType = pathName.split("/")[2];
      router.push(`/join/${joinType}/complete`);
    }
  };

  return (
    <>
      <p className="my-14 text-xl font-bold leading-7">약관을 확인해 주세요</p>
      <div className="border mb-6 rounded-sm border-1 border-button-inactive">
        <div className="border relative flex h-14 w-full min-w-[358px] items-center gap-4 pl-6 pr-4">
          <button className="flex h-6 w-6 items-center justify-center" onClick={handleAllClick}>
            <Image src={isAllChecked() ? checkProvision : close} alt="check" />
          </button>
          <span className="text-xl font-bold leading-7">약관 전체 동의</span>
          <button className="absolute right-6 flex h-6 w-6 items-center justify-center">
            <Image src={openProvision} alt="open" />
          </button>
        </div>
      </div>
      <div className="border mb-6 rounded-sm border-1 border-button-inactive">
        {necessary.map(item => provisionContent(item.id, item.title, handleCheckboxClick, isChecked[item.id]))}
      </div>
      <div className="border mb-6 rounded-sm border-1 border-button-inactive">
        {optional.map(item => provisionContent(item.id, item.title, handleCheckboxClick, isChecked[item.id]))}
      </div>
      <button
        className={`mb-[50px] mt-8 h-14 w-full rounded-[8px]  text-xl font-bold leading-7 ${
          isNecessaryAllChecked() ? "bg-primary-normal text-white" : "bg-background-secondary text-gray-heavy"
        }`}
        onClick={handleSubmit}
        disabled={!isNecessaryAllChecked()}
      >
        다음
      </button>
    </>
  );
}
export default AgreeProvision;

const provisionContent = (key: number, subTitle: string, setIsChecked: (index: number) => void, isChecked: boolean) => {
  const handleClick = () => {
    setIsChecked(key);
  };
  return (
    <div className={`border relative flex h-14 w-full min-w-[358px] items-center gap-4 pl-6 pr-4 ${key}`}>
      <button className="flex h-6 w-6 items-center justify-center" onClick={handleClick}>
        <Image src={isChecked ? checkProvision : close} alt="check" />
      </button>
      <span className="leading-6">{subTitle}</span>
      <button className="absolute right-6 flex h-6 w-6 items-center justify-center">
        <Image src={openProvision} alt="open" />
      </button>
    </div>
  );
};
