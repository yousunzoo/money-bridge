import React from "react";
import Link from "next/link";

function Content() {
  return (
    <div>
      <div>
        <div>한 줄 소개</div>
        <div></div>
      </div>
      <div>
        <div>전문분야</div>
        <div></div>
      </div>
      <div>
        <div>경력</div>
        <div></div>
      </div>
      <div>
        <div>수상내역</div>
        <div></div>
      </div>
      <div>
        <div>포트폴리오 확인해 보세요</div>
        <div></div>
      </div>
      <div>
        <div>포트폴리오 다운로드</div>
        <div></div>
      </div>
      <div>
        <div>투자자님들의 실제 상담 후기</div>
        <div>매력</div>
        <div>
          <div>후기</div>
          <div></div>
        </div>
      </div>
      <div>
        <div>방문 상담을 원하시나요?</div>
        <div>지도</div>
      </div>
      <div>
        <div>핏에 맞는 다른 PB도 함께 만나보세요</div>
        <div></div>
      </div>
      <Link className="fixedButton" href="/reservation">
        상담 신청하기
      </Link>
    </div>
  );
}

export default Content;
