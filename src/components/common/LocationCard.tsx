"use client";

import Script from "next/script";
import { useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = "//dapi.kakao.com/v2/maps/sdk.js?appkey=56706da76ae397a2378c593f91e2bafb&autoload=false";

function LocationCard({ lat, lng, closeButton }: { lat: number; lng: number; closeButton: boolean }) {
  const [display, setDisplay] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  mapRef.current?.classList.add(display ? "block" : "hidden");

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <div className="relative h-[300px] w-full" ref={mapRef}>
        <Map center={{ lat, lng }} style={{ width: "100%", height: "100%" }}>
          <MapMarker position={{ lat, lng }}></MapMarker>
        </Map>
        {closeButton && (
          <button className="absolute right-[20px] top-[10px] z-10" onClick={() => setDisplay(!display)}>
            X
          </button>
        )}
      </div>
      {/* <input className="formInput" placeholder="입력" /> */}
    </>
  );
}

export default LocationCard;
