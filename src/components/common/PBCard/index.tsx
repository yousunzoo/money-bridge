import Image from "next/image";
import React from "react";

function PBCard({ props }: any) {
  return (
    <>
      {props.map((item: any) => (
        <div id={item.id} key={item.id}>
          <div>
            <div><Image src={item.profile} alt="프로필"/>프로필</div>
            <div>
              <div>{item.name}이름</div>
              <div>{item.companyName}소속</div>
              <div>
                {item.career}
                {item.speciality1}
                {item.speciality2}
                전문분야/경력
              </div>
            </div>
            <button>북마크</button>
          </div>
          <div>{item.intro}한줄 소개</div>
          <div>
            <div>
              <div>{item.reservCount}상담횟수</div>
              <div>{item.reviewCount}후기</div>
            </div>
            <button>정보보기</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default PBCard;
