import SingleButton from "@/components/common/SingleButton";
import { useBranchRestrationStore } from "@/store/branchRestrationStore";
import React from "react";

const TEXT_STYLE = "mr-2 font-bold w-[70px]";

function BranchCreation() {
  const { selectCompany, setSelectCompany } = useBranchRestrationStore();

  const handleClick = () => {};

  return (
    <section className="h-[460px]">
      <h3 className="mb-8 text-xl font-bold leading-7">지점 등록</h3>
      <p className="mb-4">선택한 지점의 상세 주소를 작성해주세요.</p>
      <div className="flex py-2">
        <p className={TEXT_STYLE}>지점 명</p>
        {selectCompany.name}
      </div>
      <div className="flex py-2">
        <p className={TEXT_STYLE}>지점 주소</p>
        {selectCompany.address}
      </div>
      <form className="py-2 ">
        <p className={`${TEXT_STYLE} `}>상세 주소</p>
        <input type="text" className="w-full p-2 mt-2 border-1 border-gray-normal" />
        <SingleButton title="등록하기" role="pb" ClickFunc={handleClick} />
      </form>
    </section>
  );
}

export default BranchCreation;
