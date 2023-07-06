"use client";
import SpecialityList from "./SpecialityList";
import CompanyList from "../common/CompanyList";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import { useQuery } from "@tanstack/react-query";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";
import { ICompanyList } from "@/types/pblist";
import { AxiosError } from "axios";
import SkeletonButton from "antd/es/skeleton/Button";

const BUTTON_STYLE = "w-1/2 rounded-t-md bg-white py-4 shadow-md box-border";
function PBMenu() {
  const { data: companyList, isLoading } = useQuery<ICompanyList, AxiosError>(["companyList"], getCompanyListwithLogo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const { handleTypeClick, handleIDClick, company, speciality } = usePBListQueries();

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
      <div className="companyList h-[190px] w-full overflow-hidden rounded-b-md bg-white px-3 py-4">
        {speciality && <SpecialityList nowSpeciality={speciality} handleIDClick={handleIDClick} />}
        {company && isLoading && (
          <div className="my-4 grid grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <SkeletonButton key={item} className="mx-auto" size="large" />
            ))}
          </div>
        )}
        {company && companyList && (
          <CompanyList companyList={companyList} nowCompany={company} handleIDClick={handleIDClick} />
        )}
      </div>
    </nav>
  );
}

export default PBMenu;
