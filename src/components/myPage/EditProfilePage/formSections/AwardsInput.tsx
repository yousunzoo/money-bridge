import Image from "next/image";
import AddIcon from "/public/assets/images/addCircle.svg";
import React from "react";
import AwardForm from "../AwardForm";
import { IAwardsInputProps } from "@/types/editProfile";

function AwardsInput({ addAwards, awards, register, removeItems }: IAwardsInputProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xl font-bold">수상 내역을 입력해주세요.</p>
        <button type="button" onClick={addAwards}>
          <Image src={AddIcon} alt="수상 내역 추가하기" width={36} height={36} />
        </button>
      </div>
      <p className="mb-4 text-xs">*입력을 안하면 공백으로 보여집니다.</p>
      <ul className="px-4">
        {awards.map(item => (
          <AwardForm key={item.id} register={register} removeItems={removeItems} award={item} />
        ))}
      </ul>
    </section>
  );
}

export default AwardsInput;
