"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function LocationCard({ latitude, longitude }: { latitude: number; longitude: number }) {
  return (
    <>
      <div className="relative !z-0 h-[140px] w-full">
        <Map center={{ lat: latitude, lng: longitude }} style={{ width: "100%", height: "100%" }}>
          <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
        </Map>
      </div>
    </>
  );
}

export default LocationCard;
