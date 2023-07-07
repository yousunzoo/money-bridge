"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { getLocationName, searchLocation } from "@/app/apis/services/location";
import Image from "next/image";
import close from "/public/assets/images/close.svg";
import { SearchListProps, SearchLocationProps } from "@/types/location";
import { useLocationStore } from "@/store/location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PbListSectionPorps } from "@/types/main";
import { AxiosError } from "axios";
import { getSuggestionPB } from "@/app/apis/services/common";

function SearchLocation({ setIsOpenSearch }: SearchLocationProps) {
  const [searchList, setSearchList] = useState<SearchListProps[]>([]);
  const { locations, setLocation, setCoordinate } = useLocationStore();
  const queryClient = useQueryClient();

  let debounceTimer: NodeJS.Timeout;
  const fetchData = async (search: string) => {
    try {
      const data = await searchLocation(search);
      const list = data.documents;
      setSearchList(list);
    } catch (error) {}
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length > 1) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchData(inputText);
      }, 500);
    }
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

  const selectLocation = async ({ x, y }: { x: number; y: number }) => {
    try {
      const latitude = y;
      const longitude = x;
      setCoordinate({ latitude, longitude });
      const data = await getLocationName({ latitude, longitude });
      setLocation(data);
      setIsOpenSearch(false);
      refetch();
    } catch (error) {}
  };

  const closedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenSearch(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-[70px] left-1/2 z-50 w-full max-w-[736px] -translate-x-1/2 rounded-t-md bg-white px-6 py-5 shadow-md">
      <div className="flex">
        <input
          placeholder="도로명, 동, 읍, 면 단위로 검색해주세요."
          onChange={onChangeInput}
          className="mr-4 h-[50px] w-full bg-background-primary px-4 py-2"
          type="text"
        />
        <button onClick={closedHandler}>
          <Image className="w-12 p-1" src={close} alt="arrowBack" width={26} height={26} />
        </button>
      </div>

      <p className="py-2 pl-4 font-bold">검색한 지역</p>
      <ul className="h-[300px] overflow-auto">
        {searchList &&
          searchList.map(item => (
            <li
              className="flex w-full items-center justify-between border-b-1 border-gray-normal p-4 hover:bg-background-secondary"
              key={item.address_name}
              onClick={() => selectLocation({ x: item.x, y: item.y })}
            >
              <p>{item.address_name}</p>
              <span className="p-2">선택</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchLocation;
