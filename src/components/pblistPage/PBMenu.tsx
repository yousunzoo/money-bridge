"use client";
import SpecialityList from "./SpecialityList";
import CompanyList from "../common/CompanyList";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import { useQuery } from "@tanstack/react-query";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";
import { ICompanyList } from "@/types/pblist";
import { AxiosError } from "axios";

const BUTTON_STYLE = "w-1/2 rounded-t-md bg-white py-4 shadow-md box-border";
function PBMenu() {
  const { data: companyList, isLoading } = useQuery<ICompanyList, AxiosError>(["companyList"], getCompanyListwithLogo, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const { handleTypeClick, handleIDClick, company, speciality } = usePBListQueries();

  if (isLoading) return null;
  return (
    <nav className="mb-8">
      <div onClick={handleTypeClick}>
        <button data-type="speciality" className={`${BUTTON_STYLE} ${speciality && "border-b-4"}`}>
          분야별
        </button>
        <button data-type="company" className={`${BUTTON_STYLE} ${company && "border-b-4"}`}>
          증권사별
        </button>
      </div>
      <div className="h-[190px] w-full rounded-b-md bg-white px-3 py-4">
        {speciality && <SpecialityList nowSpeciality={speciality} handleIDClick={handleIDClick} />}
        {company && companyList && (
          <CompanyList companyList={companyList} nowCompany={company} handleIDClick={handleIDClick} />
        )}
      </div>
    </nav>
  );
}

export default PBMenu;
