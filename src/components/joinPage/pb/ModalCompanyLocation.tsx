import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import search from "/public/assets/images/search.svg";
import Image from "next/image";
import { useGetCompnayLocation } from "@/hooks/useGetCompanyLocation";
import { ICompanyInput } from "@/types/join";

function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timer: NodeJS.Timer;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  } as any;
}

function ModalCompanyLocation({
  setLocation,
  companyId,
  handleCloseModal,
}: {
  setLocation: Dispatch<SetStateAction<ICompanyInput>>;
  companyId: number;
  handleCloseModal: () => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const companyLocationList = useGetCompnayLocation(companyId, value);
  console.log(companyLocationList);

  const debouncedSetValue = debounce((newValue: string) => {
    setValue(newValue);
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSelect = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLLIElement;
    console.log(target);
    setLocation({ name: target.innerText, id: Number(target.id) });
    handleCloseModal();
  };

  return (
    <div className="h-[472px]">
      <p className="mb-8 text-xl font-bold leading-7">지점 찾기</p>
      <div className="relative flex items-center text-xl font-bold">
        <input
          className={`form_input h-14 pl-12 pr-10 ${value && "entering"}`}
          onChange={handleChange}
          ref={inputRef}
        />
        <Image src={search} alt="search" className="absolute left-4" width={24} height={24} />
        <button
          className="absolute right-3 h-4 w-4 bg-[url('/assets/images/clear.svg')] bg-cover bg-no-repeat"
          onClick={handleClear}
        />
      </div>
      {companyLocationList && companyLocationList?.data.totalElements >= 5 && (
        <p className="mt-2 border-b-1 border-button-inactive px-4 py-2 text-xs font-normal  leading-[18px] text-gray-normal">
          검색결과가 많습니다. '도로명+건물번호' 또는 '지역명+지번'으로 검색하시면 보다 정확한 결과를 확인하실 수
          있습니다.
        </p>
      )}

      <ul className="h-[300px] w-full overflow-y-scroll text-base font-bold leading-7" onClick={handleSelect}>
        {companyLocationList?.data.list.map(location => (
          <li
            key={location.id}
            id={location.id.toString()}
            className="cursor-pointer border-b-1 border-button-inactive py-2 pl-4"
          >
            {location.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyLocation;
