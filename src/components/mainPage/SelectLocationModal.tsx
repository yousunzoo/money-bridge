"use client";
import React, { useEffect, useState } from "react";
import plus from "/public/assets/images/plus.svg";
import bottomArrow from "/public/assets/images/bottomArrow.svg";
import Image from "next/image";
import SearchLocation from "./SearchLocation";
import close from "/public/assets/images/close.svg";
import { useLocationStore } from "@/store/location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PbListSectionPorps } from "@/types/main";
import { AxiosError } from "axios";
import { getSuggestionPB } from "@/app/apis/services/common";

export interface SearchLocationProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function SelectLocationModal({ setIsOpenModal }: SearchLocationProps) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { locations, setLocation, setCoordinate } = useLocationStore();
  const queryClient = useQueryClient();
  const onClickLocation = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const { refetch } = useQuery<PbListSectionPorps[], AxiosError>(
    ["pbSuggestionPB"],
    () =>
      getSuggestionPB({
        latitude: locations.coordinate.latitude,
        longitude: locations.coordinate.longitude,
      }),
    { refetchOnWindowFocus: false, staleTime: 0 },
  );

  const closedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  const deleteLocation = () => {
    setLocation("");
    setCoordinate({ latitude: 37.4953666908089, longitude: 127.03306536185 });
    refetch();
  };

  return (
    <>
      <div className="fixed bottom-[70px] left-1/2 z-50 w-full max-w-[768px] -translate-x-1/2 rounded-t-md bg-primary-normal px-3 py-5 text-white shadow-md">
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">내 지역 선택</h3>
            <button onClick={closedHandler}>
              <Image className="mr-2 p-1" src={bottomArrow} alt="plus" width={24} height={24} />
            </button>
          </div>
          <p className="text-md">지역이 선택되지 않았다면 지역을 등록해주세요.</p>
        </div>
        {locations.location ? (
          <button
            onClick={() => deleteLocation()}
            className="mb-3 mt-5 flex h-14 w-full items-center justify-center rounded-md bg-white text-xl font-bold text-primary-normal"
          >
            {locations.location} &ensp; <Image src={close} alt="plus" width={24} height={24} />
          </button>
        ) : (
          <button
            onClick={() => onClickLocation()}
            className="mb-3 mt-5 flex h-14 w-full items-center justify-center rounded-md bg-white text-base text-xl font-bold text-primary-normal"
          >
            지역 등록하기&ensp; <Image src={plus} alt="plus" width={24} height={24} />
          </button>
        )}

        <p>{locations.location} 근처 PB를 만나보세요.</p>
      </div>
      {isOpenSearch && <SearchLocation setIsOpenSearch={setIsOpenSearch} />}
    </>
  );
}

export default SelectLocationModal;
