import Image from "next/image";
import { ICompanyListProps } from "@/types/pblist";
import { Carousel } from "antd";
import React, { MouseEvent } from "react";
import { chunkArray } from "@/utils/chunkArray";
import { createQueryString } from "@/utils/createQueryString";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/companyCarousel.css";
import { usePBListQueries } from "@/hooks/usePBListQueries";

const LI_STYLE =
  "flex flex-col py-2 justify-between w-full h-[60px] justify-center items-center rounded-sm cursor-pointer";

function CompanyList({ companyList, nowCompany }: ICompanyListProps) {
  const { handleIDClick } = usePBListQueries();
  const chunkedCompanyList = chunkArray([{ id: "ALL", logo: null, name: "전체보기" }, ...companyList], 8);

  return (
    <Carousel draggable={true}>
      {chunkedCompanyList.map((companyList, index) => (
        <div key={index}>
          <ul className="grid grid-cols-4 gap-6">
            {companyList.map(company => (
              <li
                data-id={company.id}
                onClick={handleIDClick}
                className={`${LI_STYLE} ${company.id == nowCompany && "bg-primary-normal font-bold text-white"} ${
                  company.name === "전체보기" && "!justify-center"
                }`}
                key={company.id}
              >
                {company.logo && (
                  <Image src="/assets/images/default_profile.png" alt={company.name} width={24} height={24} />
                )}
                {company.name === "전체보기" ? (
                  <p>
                    전체
                    <br />
                    보기
                  </p>
                ) : (
                  <p className="text-xs font-bold leading-3">{company.name}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Carousel>
  );
}

export default CompanyList;
