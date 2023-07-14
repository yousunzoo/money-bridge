import { PBSpecialty } from "@/constants/enum";
import { useJoinStore } from "@/store/joinStore";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";

export const speciality = [
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
  const [career, setCareer] = useState("");
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

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setCareer(e.target.value);
  };

  const handleSubmit = () => {
    setInformations("career", Number(career));
    setInformations("speciality1", selectedItem[0]);
    setInformations("speciality2", selectedItem[1]);

    router.push("/join/pb/registerBusinessCard");
  };

  return (
    <>
      <p className="mb-6 mt-14 text-xl font-bold leading-7">경력을 입력해주세요.</p>
      <div className="mb-14">
        <div className="mb-2 flex items-center gap-8">
          <input
            type="number"
            className={`input_authentication ${Number(career) > 100 && "border-status-alert"}`}
            value={career}
            onChange={handleChage}
          />
          <span>년</span>
        </div>
        <p className={`text-xs ${Number(career) > 100 ? "text-status-alert" : "text-gray-normal"}`}>
          경력은 2자리 이하의 숫자로 입력해주세요.
        </p>
      </div>
      <p className="mb-2 text-xl font-bold leading-7">전문분야를 선택해주세요.</p>
      <p className="mb-6 text-xs text-gray-heavy">2개까지 중복선택이 가능합니다.</p>
      <ul className="flex w-full flex-wrap gap-3">
        {speciality.map(item => (
          <li
            key={item.id}
            id={item.id}
            className={`chip cursor-pointer ${selectedItem.includes(item.id) && "selected"}`}
            onClick={handleSelectSpeciality}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button
        className={`mt-6 h-14 w-full rounded-[8px]  text-xl font-bold leading-7  ${
          career === "" || selectedItem.length === 0 || Number(career) > 100
            ? "bg-background-secondary text-gray-heavy"
            : "bg-primary-normal text-white"
        }`}
        onClick={handleSubmit}
        disabled={career === "" || selectedItem.length === 0 || Number(career) > 100}
      >
        다음
      </button>
    </>
  );
}

export default EnterCareer;
