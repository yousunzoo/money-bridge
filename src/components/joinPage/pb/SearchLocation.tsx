import React, { FormEvent, useEffect, useRef, useState } from "react";
import DynamicMap from "./kakaoMap/DynamicMap";
import useMapStore from "@/store/kakaoMapStore";
import { PlaceType, SearchLoacationProps } from "@/types/mapTypes";
import { useBranchRestrationStore } from "@/store/branchRestrationStore";

function SearchLocation({ onUpdatePlaces, searchDefalutValue }: SearchLoacationProps) {
  const [keyword, setKeyword] = useState("");
  const [placeList, setPlaceList] = useState<PlaceType[]>([]);
  const { kakaoMap } = useMapStore();
  const placeService = useRef<kakao.maps.services.Places | null>(null);

  const { isRegOpen, selectCompany, setIsRegSelect, setIsRegOpen, setSelectCompany } = useBranchRestrationStore();

  useEffect(() => {
    if (placeService.current) {
      return;
    }
    placeService.current = new kakao.maps.services.Places();
    isRegOpen && searchPlaces(searchDefalutValue);
  }, []);
  const searchPlaces = (keyword: string) => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("지점명을 입력해주세요!");
      return;
    }

    if (!placeService.current) return;

    placeService.current.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeInfos = data.map(placeSearchResultItem => {
          return {
            id: placeSearchResultItem.id,
            position: new kakao.maps.LatLng(Number(placeSearchResultItem.y), Number(placeSearchResultItem.x)),
            title: placeSearchResultItem.place_name,
            address: placeSearchResultItem.address_name,
          };
        });

        onUpdatePlaces(placeInfos);
        setPlaceList(placeInfos);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };

  const handleItemClick = (place: PlaceType) => {
    kakaoMap?.setCenter(place.position);
    kakaoMap?.setLevel(4);
  };

  const handleSelect = ({ title, address }: { title: string; address: string }) => {
    setIsRegSelect(true);
    setIsRegOpen(false);
    setSelectCompany({
      ...selectCompany,
      name: title,
      address,
    });
  };
  return (
    <section className="h-[470px]">
      <form action="" className="flex w-[320px] rounded-md px-2 py-2 shadow-md" onSubmit={handleSubmit}>
        <input
          className="mr-4 w-[240px] p-1"
          onChange={e => {
            setKeyword(e.target.value);
          }}
          defaultValue={searchDefalutValue}
          type="text"
          placeholder="찾으실 지점명을 검색해주세요."
        />
        <button>검색</button>
      </form>
      <ul className="my-2 h-[200px] overflow-auto">
        {placeList.map(item => (
          <li key={item.id} className="flex justify-between p-2 hover:bg-background-normal">
            <div onClick={() => handleItemClick(item)} className=" w-[280px] cursor-pointer ">
              <div>
                <p className="font-bold">{item.title}</p>
                <p>{item.address}</p>
              </div>
            </div>
            <button
              onClick={() => handleSelect({ address: item.address, title: item.title })}
              className="z-10 px-4 py-2 rounded-md shadow-md hover:bg-gray-heavy hover:text-white"
            >
              선택
            </button>
          </li>
        ))}
      </ul>
      <DynamicMap>
        <article className="w-full mt-5"></article>
      </DynamicMap>
    </section>
  );
}

export default SearchLocation;
