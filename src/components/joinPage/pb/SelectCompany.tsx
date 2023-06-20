import Image from "next/image";
import React, { useState } from "react";
import dropDown from "/public/assets/images/dropDown.svg";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import CompanyList from "./ModalCompanyList";

function SelectCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState<string | null>("");
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  console.log(company);
  return (
    <>
      <p className="mb-6 mt-14 text-xl font-bold leading-7">
        소속되어있는 증권사를
        <br /> 선택해 주세요
      </p>
      <div
        className={`relative flex h-14 w-full cursor-pointer items-center rounded-sm border-1 ${
          company ? "border-primary-normal" : "border-button-inactive"
        } pl-3`}
        onClick={handleOpenModal}
      >
        <span className={`${company ? "text-black" : "text-placeholder"}`}>
          {company === "" ? "증권사 선택" : company}
        </span>
        <Image src={dropDown} alt="dropDown" width={24} height={24} className="absolute right-3" />
      </div>
      <p className="mb-6 mt-[58px] text-xl font-bold leading-7">지점을 입력해 주세요</p>
      <div className="flex gap-2">
        <div className="h-14 w-full rounded-sm border-1 border-button-inactive">
          <span></span>
        </div>
        <div className="flex h-14 w-[110px] items-center justify-center rounded-sm border-1 border-button-inactive">
          <span className="font-bold text-placeholder">지점 찾기</span>
        </div>
      </div>
      <button className="mt-9 h-16 w-full rounded-[8px] bg-background-secondary text-xl font-bold leading-7 text-gray-heavy">
        다음
      </button>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          <CompanyList setCompany={setCompany} handleCloseModal={handleCloseModal}></CompanyList>
        </ModalLayout>
      )}
    </>
  );
}

export default SelectCompany;
