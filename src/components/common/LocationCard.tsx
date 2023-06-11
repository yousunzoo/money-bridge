"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function LocationCard({ lat, lng }: { lat: number; lng: number }) {
  return (
    <>
      <div className="relative !z-0 h-[300px] w-full">
        <Map center={{ lat, lng }} style={{ width: "100%", height: "100%" }}>
          <MapMarker position={{ lat, lng }}></MapMarker>
        </Map>
      </div>
    </>
  );
}

export default LocationCard;
