"use client";
import { PlaceType } from "@/types/mapTypes";
import React, { useEffect } from "react";
import MapMarker from "./MapMarker";
import useMapStore from "@/store/kakaoMapStore";

interface MapMarkerControllerProps {
  places: PlaceType[];
}

function MapMarkerController(props: MapMarkerControllerProps) {
  const { kakaoMap } = useMapStore();
  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    props.places.forEach(place => {
      bounds.extend(place.position);
    });

    kakaoMap && kakaoMap.setBounds(bounds);
  }, [props.places]);
  return (
    <>
      {props.places.map(place => {
        return <MapMarker key={place.id} place={place} />;
      })}
    </>
  );
}

export default MapMarkerController;
