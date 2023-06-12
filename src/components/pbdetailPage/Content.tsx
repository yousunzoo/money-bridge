"use client";
import React from "react";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE } from "@/constants/enum";
import { useRouter, usePathname } from "next/navigation";
import portfolio from "@/mocks/hyeon17/PbDetail/portfolio.json";

function Content({ contentData, edit }: { contentData: any; edit: boolean }) {
  const { id, name, intro, speciality1, speciality2, career, award } = contentData;
  const { getRole } = useRoleStore();
  const router = useRouter();
  const pathname = usePathname();
  const portfolioData = portfolio.data;
  const goToPage = () => {
    if (getRole() === CommonROLE.USER) {
      router.push("/reservation");
    } else if (getRole() === CommonROLE.PB) {
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
  if (getRole() === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (getRole() === CommonROLE.PB) {
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
    link.href = portfolioData.file;
    link.download = "portfolio.pdf";
    link.click();
  };

  return (
    <>
      <div id={id}>
        <div>
          <div>한 줄 소개</div>
          <div>"{intro}"</div>
        </div>
        <div>
          <div>전문분야 </div>

          <div>{speciality1}</div>
          <div>{speciality2}</div>
        </div>
        <div>
          <div>경력</div>
          <div>
            {career?.map((item: any) => (
              <div key={item.id}>
                <div>{item.start}</div>
                <div>{item.end}</div>
                <div>{item.career}</div>
              </div>
            ))}
          </div>
        </div>
        {award ? (
          <div>
            <div>수상내역</div>
            <div>
              {award.map((item: any) => (
                <div key={item.id}>
                  <div>{item.start}</div>
                  <div>{item.end}</div>
                  <div>{item.record}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {edit ? (
          <>
            <div>
              <div>나의 포트폴리오</div>
              <div>
                <div>
                  <div>최고 수익률</div>
                  <div>입력</div>
                </div>
                <div>
                  <div>투자성향</div>
                  <div>드롭다운</div>
                </div>
                <div>
                  <div>기간</div>
                  <div>입력</div>
                </div>
                <div>
                  <div>위험등급</div>
                  <div>드롭다운</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>포트폴리오 업로드</div>
                <div>수정하기</div>
              </div>
              <div>
                <div>파일명</div>
                <div>파일용량</div>
                <div>업로드 날짜</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>{name}PB의 포트폴리오를 확인해 보세요</div>
              <div key={portfolioData.id}>
                <div>
                  <div>{portfolioData.highestReturn}</div>
                  <div>최고 수익률</div>
                </div>
                <div>
                  <div>{portfolioData.propensity}</div>
                  <div>투자 성향</div>
                </div>
                <div>
                  <div>
                    {portfolioData.startDate}
                    {portfolioData.endDate}
                  </div>
                  <div>기간</div>
                </div>
                <div>
                  <div>{portfolioData.dangerRate}</div>
                  <div>위험등급</div>
                </div>
              </div>
            </div>
            <div>
              <div>포트폴리오 다운로드</div>
              <div>
                <div>portfolio.pdf</div>
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
