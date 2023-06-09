"use client";

import { useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function LocationCard({ lat, lng, closeButton }: { lat: number; lng: number; closeButton: boolean }) {
  const [display, setDisplay] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  mapRef.current?.classList.add(display ? "block" : "hidden");

  return (
    <>
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
    </>
  );
}

export default LocationCard;
