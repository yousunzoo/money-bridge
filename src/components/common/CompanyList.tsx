import { ICompanyListProps } from "@/types/pblist";
import { Carousel } from "antd";
import React, { MouseEvent } from "react";
import "@/styles/companyCarousel.css";
import { chunkArray } from "@/utils/chunkArray";
import { createQueryString } from "@/utils/createQueryString";
import { useRouter } from "next/navigation";

const LI_STYLE = "flex w-full h-[50px] justify-center items-center rounded-sm cursor-pointer z-[1]";
function CompanyList({ companyList, nowCompany }: ICompanyListProps) {
  const router = useRouter();
  const chunkedCompanyList = chunkArray(companyList, 8);

  const handleIDClick = (e: MouseEvent<HTMLLIElement>) => {
    const selectedId = e.currentTarget.dataset.id as string;
    const url = createQueryString("company", selectedId);
    router.push("/pblist?" + url);
  };

  return (
    <Carousel draggable={true}>
      {chunkedCompanyList.map((companyList, index) => (
        <div key={index}>
          <ul className="grid grid-cols-4 gap-6">
            {companyList.map(company => (
              <li
                data-id={company.id}
                onClick={handleIDClick}
                className={`${LI_STYLE} ${company.id == nowCompany && "bg-primary-normal text-white"}`}
                key={company.id}
              >
                <span className="text-xs font-bold">{company.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Carousel>
  );
}

export default CompanyList;
