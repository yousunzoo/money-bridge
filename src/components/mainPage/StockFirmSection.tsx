"use client";

import React from "react";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import { Carousel } from "antd";
import { chunkArray } from "@/utils/chunkArray";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ICompanyList } from "@/types/pblist";
import { AxiosError } from "axios";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";

const LI_STYLE =
  "flex flex-col py-2 justify-between w-full h-[60px] justify-center items-center rounded-sm cursor-pointer";

function StockFirmSection() {
  const { handleIDClick } = usePBListQueries();

  const { data: companyList, isLoading } = useQuery<ICompanyList, AxiosError>(["companyList"], getCompanyListwithLogo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (!companyList || isLoading) return null;

  const chunkedCompanyList = chunkArray([{ id: "ALL", logo: null, name: "전체보기" }, ...companyList], 8);

  return (
    <section className="relative mt-3 w-full ">
      <h3 className="text-xl font-bold">
        선호하는 증권사의 <br /> PB를 만나보세요.
      </h3>
      <Carousel draggable={true} className="m-4 rounded-md bg-white p-6 shadow-md">
        {chunkedCompanyList.map((companyList, index) => (
          <div key={index}>
            <ul className="grid grid-cols-4 gap-6">
              {companyList.map(company => (
                <li
                  data-id={company.id}
                  onClick={handleIDClick}
                  className={`${LI_STYLE} ${company.name === "전체보기" && "!justify-center"}`}
                  key={company.id}
                >
                  {company.logo && <Image src={company.logo} alt={company.name} width={24} height={24} />}
                  {company.name === "전체보기" ? (
                    <p className="font-bold">
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
    </section>
  );
}

export default StockFirmSection;
