"use client";
import React, { useState } from "react";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE, Propensity } from "@/constants/enum";
import { useRouter, usePathname } from "next/navigation";
import portfolio from "@/mocks/hyeon17/PbDetail/portfolio.json";

function Content({ contentData, edit }: { contentData: any; edit: boolean }) {
  const { name, intro, speciality1, speciality2, career, award } = contentData;
  const { getUser } = useRoleStore();
  const router = useRouter();
  const pathname = usePathname();
  const portfolioData = portfolio.data;
  const { highestReturn, propensity, startDate, endDate, dangerRate, file } = portfolioData;
  const [introValue, setIntroValue] = useState(intro);
  const [value, setValue] = useState(introValue.length);
  const [speciality1Value, setSpeciality1Value] = useState(speciality1);
  const [speciality2Value, setSpeciality2Value] = useState(speciality2);
  const [careerValue, setCareerValue] = useState(career);
  const [awardValue, setAwardValue] = useState(award);
  const [highestReturnValue, setHighestReturnValue] = useState(highestReturn);
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);
  const [fileValue, setFileValue] = useState(file);

  const goToPage = () => {
    if (getUser().role === CommonROLE.USER) {
      router.push("/reservation");
    } else if (getUser().role === CommonROLE.PB) {
      if (pathname === "/detail") {
        router.push("/detail/edit");
      }
      if (pathname === "/detail/edit") {
        router.push("/detail");
      }
      if (pathname === "/detail/content") {
        router.push("/lounge/write");
      }
    }
  };

  let text;
  if (getUser().role === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (getUser().role === CommonROLE.PB) {
    if (pathname === "/detail") {
      text = "프로필 수정하기";
    }
    if (pathname === "/detail/edit") {
      text = "수정 완료";
    }
    if (pathname === "/detail/content") {
      text = "콘텐츠 작성하기";
    }
  }

  const download = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "portfolio.pdf";
    link.click();
  };

  const introChange = (event: any) => {
    setValue(event.target.value.length);
    const text = event.target.value;
    if (value <= 150) {
      setIntroValue(text);
    }
  };

  const Change = (event: any) => {};

  return (
    <>
      <div>
        <div>
          <div>한 줄 소개</div>
          {edit ? (
            <>
              <div>
                <div>"</div>
                <input type="text" value={introValue} onChange={introChange} />
                <div>"</div>
              </div>
              <div>{value}/150</div>
            </>
          ) : (
            <>
              <div>"{introValue}"</div>
            </>
          )}
        </div>
        <div>
          <div>전문분야 </div>
          {edit ? (
            <>
              <input type="text" value={speciality1Value} />
              <input type="text" value={speciality2Value} />
            </>
          ) : (
            <>
              <div>{speciality1Value}</div>
              <div>{speciality2Value}</div>
            </>
          )}
        </div>
        <div>
          <div>경력</div>
          <ul>
            {careerValue?.map((item: any) => (
              <li key={item.id}>
                {edit ? (
                  <>
                    <input type="text" value={item.start} />
                    <input type="text" value={item.end} />
                    <input type="text" value={item.career} />
                  </>
                ) : (
                  <>
                    <div>{item.start}</div>
                    <div>{item.end}</div>
                    <div>{item.career}</div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {awardValue ? (
          <div>
            <div>수상내역</div>
            <ul>
              {awardValue.map((item: any) => (
                <li key={item.id}>
                  {edit ? (
                    <>
                      <input type="text" value={item.year} />
                      <input type="text" value={item.record} />
                    </>
                  ) : (
                    <>
                      <div>{item.year}</div>
                      <div>{item.record}</div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {edit ? (
          <>
            <div>
              <div>나의 포트폴리오</div>
              <div>
                <div>
                  <div>최고 수익률</div>
                  <input type="text" value={highestReturnValue} />
                </div>
                <div>
                  <div>투자성향</div>
                  <select>
                    {Object.keys(Propensity).map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div>기간</div>
                  <input type="text" value={startDateValue} />
                  <input type="text" value={endDateValue} />
                </div>
                <div>
                  <div>위험등급</div>
                  <div>{dangerRate}</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>포트폴리오 업로드</div>
                <button>수정하기</button>
              </div>
              <div>파일명</div>
              <div>
                <div>{fileValue}</div>
                <div>파일용량</div>
                <div>업로드 날짜</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>{name}PB의 포트폴리오를 확인해 보세요</div>
              <div>
                <div>
                  <div>{highestReturnValue}</div>
                  <div>최고 수익률</div>
                </div>
                <div>
                  <div>{propensity}</div>
                  <div>투자 성향</div>
                </div>
                <div>
                  <div>
                    {startDateValue}
                    {endDateValue}
                  </div>
                  <div>기간</div>
                </div>
                <div>
                  <div>{dangerRate}</div>
                  <div>위험등급</div>
                </div>
              </div>
            </div>
            <div>
              <div>포트폴리오 다운로드</div>
              <div>
                <div>{fileValue}</div>
                <button onClick={() => download}>다운로드</button>
              </div>
            </div>
          </>
        )}
      </div>
      <button className="fixedButton" onClick={() => goToPage()}>
        {text}
      </button>
    </>
  );
}

export default Content;
