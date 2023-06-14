import { ICompanyListProps } from "@/types/pblist";
import { Carousel } from "antd";
import React from "react";
import "@/styles/companyCarousel.css";
import { company } from "@/constants/pbListMenu";
import { chunkArray } from "@/utils/chunkArray";

const LI_STYLE = "flex w-full h-[50px] justify-center items-center rounded-sm cursor-pointer";
function CompanyList({ nowCompany, handleIDClick }: ICompanyListProps) {
  const companyList = chunkArray(company, 8);

  return (
    <Carousel>
      {companyList.map((companyList, index) => (
        <div key={index}>
          <ul className="grid grid-cols-4 gap-6" onClick={handleIDClick}>
            {companyList.map(company => (
              <li
                data-id={company.id}
                className={`${LI_STYLE} ${company.id === nowCompany && "bg-primary-normal text-white"}`}
                key={company.id}
              >
                <span className="text-xs font-bold">{company.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Carousel>
  );
}

export default CompanyList;
