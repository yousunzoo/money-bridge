"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent } from "react";
import SpecialityList from "./SpecialityList";
import CompanyList from "../common/CompanyList";
import { createQueryString } from "@/utils/createQueryString";
import { ICompanyList } from "@/types/pblist";

const BUTTON_STYLE = "w-1/2 rounded-t-md bg-white py-4 shadow-md box-border";
function PBMenu({ companyList }: { companyList: ICompanyList }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const speciality = searchParams.get("speciality");
  const company = searchParams.get("company");
  const nowType = speciality ? "speciality" : "company";

  const handleTypeClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const selectedType = e.target.dataset.type as string;
    const url = createQueryString(selectedType, "ALL");
    router.push("/pblist?" + url);
  };

  const handleIDClick = (e: MouseEvent<HTMLUListElement>) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    const selectedId = e.target.dataset.id as string;
    const url = createQueryString(nowType, selectedId);
    router.push("/pblist?" + url);
  };
  return (
    <nav>
      <div onClick={handleTypeClick}>
        <button data-type="speciality" className={`${BUTTON_STYLE} ${speciality && "border-b-4"}`}>
          분야별
        </button>
        <button data-type="company" className={`${BUTTON_STYLE} ${company && "border-b-4"}`}>
          증권사별
        </button>
      </div>
      <div className="h-[180px] w-full rounded-b-md bg-white px-3 py-4">
        {speciality && <SpecialityList nowSpeciality={speciality} handleIDClick={handleIDClick} />}
        {company && <CompanyList companyList={companyList} nowCompany={company} />}
      </div>
    </nav>
  );
}

export default PBMenu;
