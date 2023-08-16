import { registerBranch } from "@/app/apis/services/common";
import { searchLoadLocation } from "@/app/apis/services/location";
import { useBranchRestrationStore } from "@/store/branchRestrationStore";
import { useMutation } from "@tanstack/react-query";
import React, { MouseEvent, useEffect } from "react";

const TEXT_STYLE = "mr-2 font-bold w-[70px]";

function BranchCreation() {
  const { selectCompany, setSelectCompany, setIsRegSelect, setIsButtonOpen } = useBranchRestrationStore();

  const { mutate } = useMutation(registerBranch, {
    onSuccess: () => {
      setIsButtonOpen(true);
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      companyId: selectCompany.companyId,
      name: selectCompany.name,
      address: selectCompany.address,
      specificAddress: selectCompany.specificAddress,
    });
    setIsRegSelect(false);
  };

  useEffect(() => {
    const geoLocationFunc = async (search: string) => {
      const data = await searchLoadLocation(search);
      const loadName = data[0].road_address.address_name;
      setSelectCompany({
        ...selectCompany,
        address: loadName,
      });
    };
    geoLocationFunc(selectCompany.address);
  }, [selectCompany.latitude]);

  const handleSpecificAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCompany({
      ...selectCompany,
      specificAddress: e.target.value,
    });
  };

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
        <input onChange={handleSpecificAddress} type="text" className="mt-2 w-full border-1 border-gray-normal p-2" />
        <button
          onClick={handleClick}
          className="mt-6 h-14 w-full items-end rounded-md bg-primary-normal text-base font-bold text-white"
        >
          등록하기
        </button>
      </form>
    </section>
  );
}

export default BranchCreation;
