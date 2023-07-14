"use client";
import React, { useEffect, useState } from "react";
import plus from "/public/assets/images/plus.svg";
import bottomArrow from "/public/assets/images/bottomArrow.svg";
import Image from "next/image";
import SearchLocation from "./SearchLocation";
import close from "/public/assets/images/close.svg";
import { useLocationStore } from "@/store/location";
import { PositionProps } from "@/types/location";
import { getLocationName } from "@/app/apis/services/location";

export interface SearchLocationProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function SelectLocationModal({ setIsOpenModal }: SearchLocationProps) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { locations, setLocation, setCoordinate } = useLocationStore();
  const onClickLocation = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const closedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  const deleteLocation = () => {
    setCoordinate({ latitude: 0, longitude: 0 });
    setLocation("위치 선택");
  };

  function currentLocation() {
    const { geolocation } = navigator;
    async function onGeoOkay(position: PositionProps) {
      const { latitude, longitude } = position.coords;
      const data = await getLocationName({ latitude, longitude });
      setLocation(data);
    }
    geolocation.getCurrentPosition(onGeoOkay);
  }

  return (
    <>
      <div className="fixed bottom-[70px] left-1/2 z-50 w-full max-w-[768px] -translate-x-1/2 rounded-t-md bg-primary-normal px-3 py-5 text-white shadow-md">
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">내 지역 선택</h3>
            <button onClick={closedHandler}>
              <Image className="p-1 mr-2" src={bottomArrow} alt="plus" width={24} height={24} />
            </button>
          </div>
          <p className="text-md">지역이 선택되지 않았다면 지역을 등록해주세요.</p>
        </div>
        {locations.location !== "위치 선택" ? (
          <button
            onClick={() => deleteLocation()}
            className="flex items-center justify-center w-full mt-5 mb-3 text-xl font-bold bg-white rounded-md h-14 text-primary-normal"
          >
            {locations.location} &ensp; <Image src={close} alt="plus" width={24} height={24} />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => currentLocation()}
              className="flex items-center justify-center w-full mt-5 mb-3 text-xl font-bold text-white rounded-md h-14 bg-primary-light"
            >
              현재 위치 불러오기
            </button>
            <button
              onClick={() => onClickLocation()}
              className="flex items-center justify-center w-full mt-5 mb-3 text-xl font-bold bg-white rounded-md h-14 text-primary-normal"
            >
              지역 등록하기&ensp; <Image src={plus} alt="plus" width={24} height={24} />
            </button>
          </div>
        )}

        <p>{locations.location} 근처 PB를 만나보세요.</p>
      </div>
      {isOpenSearch && <SearchLocation setIsOpenSearch={setIsOpenSearch} />}
    </>
  );
}

export default SelectLocationModal;
