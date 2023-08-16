import BeatSpinner from "@/components/common/BearSpinner";
import React, { ReactNode, useEffect, useState } from "react";

const KAKAO_MAP_ID = "kakao-map-script";

function KakaoMapScriptLoader({ children }: { children: ReactNode }) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_ID);
    if (mapScript && !window.kakao) return;

    const script = document.createElement("script");
    script.id = KAKAO_MAP_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);

  return (
    <>
      {mapScriptLoaded ? (
        children
      ) : (
        <div>
          <BeatSpinner />
        </div>
      )}
    </>
  );
}

export default KakaoMapScriptLoader;
