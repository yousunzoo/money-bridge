import React from "react";
import SelectSpeciality from "../SelectSpeciality";
import { ISpecialityInputProps } from "@/types/editProfile";

function SpecialityInput({ speciality, handleToggleButtons }: ISpecialityInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">전문분야를 선택해주세요.</p>
      <p className="mb-4 text-xs">2개까지 중복선택이 가능합니다.</p>
      <SelectSpeciality specialityData={speciality} handleToggleButtons={handleToggleButtons} />
    </section>
  );
}

export default SpecialityInput;
