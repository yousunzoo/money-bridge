"use client";
import { getLocationName } from "@/app/apis/services/location";
import { useLocationStore } from "@/store/location";
import { CoordinateProps, PositionProps } from "@/types/location";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const logoPath = ["/", "/lounge"];
export const useGeoLocation = () => {
  const { locations, setLocation, setCoordinate } = useLocationStore();
  const currentPath = usePathname();

  useEffect(() => {
    if (!logoPath.includes(currentPath)) return;
    const { geolocation } = navigator;
    if (!geolocation) {
      alert("위치가 지원되지 않습니다.");
      return;
    }

    function onGeoOkay(position: PositionProps) {
      const { latitude, longitude } = position.coords;
      if (latitude) {
        setCoordinate({ latitude, longitude });
      }
    }

    geolocation.getCurrentPosition(onGeoOkay);
    if (!locations.location) {
      geoLocationFunc({ ...locations.coordinate });
    }
  }, []);

  const geoLocationFunc = async ({ latitude, longitude }: CoordinateProps) => {
    const data = await getLocationName({ latitude, longitude });
    setLocation(data);
  };
};
