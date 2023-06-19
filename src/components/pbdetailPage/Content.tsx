import React, { useState } from "react";
import portfolio from "@/mocks/hyeon17/PbDetail/portfolio.json";
import "@/styles/pb.css";

function Content({ contentData }: any) {
  const { name, intro, speciality1, speciality2, career, award } = contentData;
  const portfolioData = portfolio.data;
  const { cumulativeReturn, maxDrawdown, profitFactor, averageProfit, file } = portfolioData;
  const [introValue, setIntroValue] = useState(intro);
  const [speciality1Value, setSpeciality1Value] = useState(speciality1);
  const [speciality2Value, setSpeciality2Value] = useState(speciality2);
  const [careerValue, setCareerValue] = useState(career);
  const [awardValue, setAwardValue] = useState(award);
  const [fileValue, setFileValue] = useState(file);

  const download = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "portfolio.pdf";
    link.click();
  };

  return (
    <article>
      <div className="mb-7">
        <div className="header">한 줄 소개</div>
        <div className="flex h-[111px] items-center justify-center rounded-md bg-background-secondary px-[22px] py-6 text-xs">
          "{introValue}"
        </div>
      </div>
      <div className="mb-7">
        <div className="header">전문분야 </div>
        <div>{speciality1Value}</div>
        <div>{speciality2Value}</div>
      </div>
      <div className={`mb-${awardValue ? "7" : "[68px]"}`}>
        <div className="header">경력</div>
        <ul className="flex flex-col">
          {careerValue?.map((item: any) => (
            <li key={item.id} className="flex text-xs">
              <div>{item.start}&nbsp;-</div>
              <div>&nbsp;{item.end}</div>
              <div>&nbsp;&nbsp;{item.career}</div>
            </li>
          ))}
        </ul>
      </div>
      {awardValue ? (
        <div className="mb-[68px]">
          <div className="header">수상내역</div>
          <ul className="flex flex-col">
            {awardValue.map((item: any) => (
              <li key={item.id} className="flex text-xs">
                <div>{item.year}&nbsp;&nbsp;</div>
                <div>{item.record}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mb-11">
        <div className="info_header">
          {name}PB의 포트폴리오를
          <br />
          확인해 보세요
        </div>
        <div className="flex justify-between px-3 font-bold">
          <div className="portfolio">
            <div className="card portfolio_number">{cumulativeReturn}%</div>
            <div className="portfolio_text">누적 수익률</div>
          </div>
          <div className="portfolio">
            <div className="card portfolio_number">{maxDrawdown}%</div>
            <div className="portfolio_text">최대 자본인하율</div>
          </div>
          <div className="portfolio">
            <div className="card portfolio_number">{averageProfit}%</div>
            <div className="portfolio_text">평균 손익률</div>
          </div>
          <div className="portfolio">
            <div className="card portfolio_number">{profitFactor}:1</div>
            <div className="portfolio_text">Profit Factor</div>
          </div>
        </div>
      </div>
      <div className="mb-[95px]">
        <div className="header">포트폴리오 다운로드</div>
        <div className="flex">
          <div className="mr-1 flex h-12 w-full items-center rounded-md bg-white pl-4 text-placeholder">
            {fileValue}
          </div>
          <button onClick={() => download} className="h-12 w-[100px] rounded-md bg-primary-normal text-white">
            다운로드
          </button>
        </div>
      </div>
    </article>
  );
}

export default Content;
