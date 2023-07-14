"use client";

import { usePBListQueries } from "@/hooks/usePBListQueries";
import { Carousel, ConfigProvider } from "antd";
import { chunkArray } from "@/utils/chunkArray";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";
import "@/styles/companyCarousel.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
const LI_STYLE =
  "flex flex-col py-2 justify-between w-full h-[60px] justify-center items-center rounded-sm cursor-pointer";

function StockFirmSection() {
  const { handleIDClick } = usePBListQueries();

  const { data: companyList, isLoading } = useQuery<any, AxiosError>(["companyList"], getCompanyListwithLogo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  if (!companyList || isLoading) return null;
  const chunkedCompanyList = chunkArray([{ id: "ALL", logo: null, name: "전체보기" }, ...companyList], 8);

  return (
    <section className="companyList relative mt-3 w-full ">
      <h3 className="text-xl font-bold">
        선호하는 증권사의 <br /> PB를 만나보세요.
      </h3>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              colorBgContainer: "#242424",
            },
          },
        }}
      >
        <div className="my-4 rounded-md bg-white px-6 pb-3 pt-4 shadow-md">
          <Carousel
            arrows={true}
            nextArrow={<MdOutlineArrowForwardIos />}
            prevArrow={<MdOutlineArrowBackIos />}
            dots={true}
            dotPosition="bottom"
            draggable={true}
          >
            {chunkedCompanyList.map((companyList, index) => (
              <div key={index}>
                <ul className="mx-auto grid max-w-[680px] grid-cols-4 gap-4 pb-6">
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
        </div>
      </ConfigProvider>
    </section>
  );
}

export default StockFirmSection;
