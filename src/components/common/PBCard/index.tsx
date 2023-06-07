import React from "react";

function PBCard({ props }: any) {
  const { id, profile, name, companyName, intro, career, speciality1, speciality2, reservCount, reviewCount } = props;
  return (
    <div id={id}>
      <div>
        <div>{profile}프로필</div>
        <div>
          <div>{name}이름</div>
          <div>{companyName}소속</div>
          <div>
            {career}
            {speciality1}
            {speciality2}
            전문분야/경력
          </div>
        </div>
        <button>북마크</button>
      </div>
      <div>{intro}한줄 소개</div>
      <div>
        <div>
          <div>{reservCount}상담횟수</div>
          <div>{reviewCount}후기</div>
        </div>
        <button>정보보기</button>
      </div>
    </div>
  );
}

export default PBCard;
