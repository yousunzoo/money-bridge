import React from "react";
import { getPbPortfolio } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import "@/styles/pb.css";
import { speciality } from "@/components/joinPage/pb/EnterCareer";
import { AxiosError } from "axios";
import { IDataResponse } from "@/types/common";
import { IContentData, IPortfolio } from "@/types/pb";

function Content({ contentData }: { contentData: IContentData }) {
  const { id, name, intro, speciality1, speciality2, career, award } = contentData;
  const { data: portfolio } = useQuery<IDataResponse<IPortfolio>, AxiosError>({
    queryKey: ["getPbPortfolio", id],
    queryFn: () => getPbPortfolio(id),
    refetchOnWindowFocus: false,
  });
  const portfolioData = portfolio?.data;
  const {
    cumulativeReturn,
    maxDrawdown,
    profitFactor,
    averageProfit,
    file,
    name: fileName,
  } = (portfolioData as IPortfolio) || {};

  const download = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "portfolio.pdf";
    link.click();
  };

  return (
    <>
      {intro && (
        <div className="mb-7">
          <p className="header">한 줄 소개</p>
          <div className="flex h-[111px] items-center justify-center rounded-md bg-background-secondary px-[22px] py-6 text-xs">
            "{intro}"
          </div>
        </div>
      )}
      <div className="mb-7 mt-3">
        <p className="header">전문분야 </p>
        <ul className="flex w-full flex-wrap gap-3">
          {speciality.map((item, idx) => (
            <li
              key={idx}
              id={item.id}
              className={`chip ${item.id === speciality1 ? "selected" : ""} ${
                item.id === speciality2 ? "selected" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {career && career?.length > 0 && (
        <div className="mb-7">
          <p className="header">경력</p>
          <ul className="flex flex-col">
            {career?.map((item) => (
              <li key={item.id} className="flex text-xs">
                <div>{item.start}&nbsp;-</div>
                <div>&nbsp;{item.end}</div>
                <div>&nbsp;&nbsp;{item.career}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {award && award?.length > 0 && (
        <div className="mb-[68px]">
          <p className="header">수상내역</p>
          <ul className="flex flex-col">
            {award.map((item) => (
              <li key={item.id} className="flex text-xs">
                <div>{item.year}&nbsp;&nbsp;</div>
                <div>{item.record}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cumulativeReturn && maxDrawdown && profitFactor && averageProfit && file && (
        <div className="mb-11">
          <p className="info_header">
            {name}PB의 포트폴리오를
            <br />
            확인해 보세요
          </p>

          <div className="flex justify-center px-3 font-bold">
            {cumulativeReturn && (
              <div className="portfolio">
                <div className="card portfolio_number">{cumulativeReturn}%</div>
                <p className="portfolio_text">누적 수익률</p>
              </div>
            )}
            {maxDrawdown && (
              <div className="portfolio">
                <div className="card portfolio_number">{maxDrawdown}%</div>
                <p className="portfolio_text">최대 자본인하율</p>
              </div>
            )}
            {averageProfit && (
              <div className="portfolio">
                <div className="card portfolio_number">{averageProfit}%</div>
                <p className="portfolio_text">평균 손익률</p>
              </div>
            )}
            {profitFactor && (
              <div className="portfolio">
                <div className="card portfolio_number">{profitFactor}:1</div>
                <p className="portfolio_text">Profit Factor</p>
              </div>
            )}
          </div>
        </div>
      )}
      {file && (
        <div className="mb-[95px]">
          <p className="header mb-[18px] font-bold">포트폴리오 다운로드</p>
          <div className="flex">
            <div className="mr-4 flex h-12 flex-1 items-center whitespace-normal rounded-md bg-background-normal pl-4 text-placeholder">
              {fileName + " PB의 포트폴리오.PDF"}
            </div>
            <button
              onClick={() => download(file)}
              className="h-12 min-w-[100px] rounded-md bg-primary-normal text-white"
            >
              다운로드
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
