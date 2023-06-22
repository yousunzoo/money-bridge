import { PBSpecialty } from "@/constants/enum";
import { useJoinStore } from "@/store/joinStore";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useRef, useState } from "react";

const speciality = [
  { id: PBSpecialty.KOREAN_STOCK, name: "한국주식" },
  { id: PBSpecialty.US_STOCK, name: "미국주식" },
  { id: PBSpecialty.FUND, name: "펀드" },
  { id: PBSpecialty.ETF, name: "ETF" },
  { id: PBSpecialty.REAL_ESTATE, name: "부동산" },
  { id: PBSpecialty.BOND, name: "채권" },
  { id: PBSpecialty.WRAP, name: "랩" },
  { id: PBSpecialty.DERIVATIVE, name: "파생" },
];

function EnterCareer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<PBSpecialty[]>([]);
  const router = useRouter();
  const { setInformations } = useJoinStore();

  const handleSelectSpeciality = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const item = speciality.find(item => item.id === target.id)?.id as PBSpecialty;

    if (selectedItem.includes(item)) {
      setSelectedItem(selectedItem.filter(selectedItem => selectedItem !== item));
    } else if (selectedItem.length < 2) {
      setSelectedItem([...selectedItem, item]);
    }
  };

  const handleSubmit = () => {
    if (inputRef.current) {
      setInformations("career", Number(inputRef.current?.value));
    }
    setInformations("speciality1", selectedItem[0]);
    setInformations("speciality2", selectedItem[1]);

    router.push("/join/pb/agreements");
  };

  return (
    <>
      <p className="mb-6 mt-14 text-xl font-bold leading-7">경력을 입력해 주세요.</p>
      <div className="mb-14 flex items-center gap-8">
        <input type="number" className="input_authentication" ref={inputRef} />
        <span>년</span>
      </div>
      <p className="mb-2 text-xl font-bold leading-7">전문분야를 선택해 주세요.</p>
      <p className="mb-6 text-xs text-gray-heavy ">2개까지 중복선택이 가능합니다.</p>
      <ul className="flex w-full flex-wrap gap-3">
        {speciality.map(item => (
          <li
            key={item.id}
            id={item.id}
            className={`chip ${selectedItem.includes(item.id) && "selected"}`}
            onClick={handleSelectSpeciality}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button
        className={`mt-6 h-14 w-full rounded-[8px]  text-xl font-bold leading-7  ${
          inputRef.current?.value === "" || selectedItem.length === 0
            ? "bg-background-secondary text-gray-heavy"
            : "bg-primary-normal text-white"
        }`}
        onClick={handleSubmit}
        disabled={inputRef.current?.value === "" || selectedItem.length === 0}
      >
        다음
      </button>
    </>
  );
}

export default EnterCareer;
