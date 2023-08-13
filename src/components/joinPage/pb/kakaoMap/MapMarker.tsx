import useMapStore from "@/store/kakaoMapStore";
import { PlaceType } from "@/types/mapTypes";
import React, { useLayoutEffect, useMemo } from "react";
import { useMap } from "react-kakao-maps-sdk";

interface MarkerProps {
  place: PlaceType;
}

function MapMarker(props: MarkerProps) {
  const { kakaoMap } = useMapStore();

  const marker = useMemo(() => {
    const marker = new kakao.maps.Marker({
      position: props.place.position,
    });
    marker.setMap(kakaoMap);
    return marker;
  }, []);

  useLayoutEffect(() => {
    marker.setMap(kakaoMap);

    return () => {
      marker.setMap(null);
    };
  }, [kakaoMap]);

  return <></>;
}

export default MapMarker;
