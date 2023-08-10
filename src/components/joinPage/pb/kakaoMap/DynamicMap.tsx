import useMapStore from "@/store/kakaoMapStore";
import React, { useEffect, useRef, useState } from "react";

function DynamicMap({ children }: { children: React.ReactNode }) {
  const { kakaoMap, setKakaoMap } = useMapStore();
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!kakaoMapRef.current) return;

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: targetPoint,
      level: 3,
    };
    setKakaoMap(new window.kakao.maps.Map(kakaoMapRef.current, options));
  }, []);

  return (
    <div className="h-[220px]">
      <div className="w-full h-full " ref={kakaoMapRef}>
        {kakaoMap ? <>{children}</> : <div>지도 정보를 가져오는데 실패하였습니다.</div>}
      </div>
    </div>
  );
}

export default DynamicMap;
