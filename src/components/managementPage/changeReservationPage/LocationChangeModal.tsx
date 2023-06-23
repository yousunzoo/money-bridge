import Image from "next/image";
import React from "react";
import arrow from "/public/assets/images/bottomArrow.svg";

interface LocationChangeModal {
  type: string;
  location: string;
  locationOpenHandler: () => void;
  isOpenLocation: boolean;
  selectLocationHandler: (clickType: string | null) => void;
}

function LocationChangeModal({
  type,
  location,
  locationOpenHandler,
  isOpenLocation,
  selectLocationHandler,
}: LocationChangeModal) {
  return (
    <div className="relative flex flex-col justify-between">
      <div className="mt-2 flex justify-between">
        <span className="font-bold">미팅 장소</span>
        <span className="text-ellipsisxt-primary-normal">{type === "CALL" ? "전화로 결정" : location}</span>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={locationOpenHandler}
          disabled={type === "CALL" && true}
          className={`${
            type === "CALL" && "inactive"
          } flex w-[150px] items-center justify-center rounded-md bg-primary-normal py-1 text-white`}
        >
          <span className="flex flex-1 items-center justify-center pl-5">주소변경</span>
          <div className="mr-3 flex items-center justify-end">
            <Image src={arrow} alt={arrow} width={12} height={12} />
          </div>
        </button>
      </div>
      {isOpenLocation && (
        <div className="absolute right-0 top-16 flex h-[80px] w-[150px] flex-col items-center justify-center rounded-md bg-background-secondary px-2 py-1">
          <button
            onClick={() => selectLocationHandler("BRANCH")}
            className="my-1  px-3 py-1 text-[14px] font-bold text-gray-heavy hover:text-primary-normal"
          >
            소속 증권사 지점
          </button>
          <div className="w-[80px] border-t-1"></div>
          <button
            onClick={() => selectLocationHandler(null)}
            className="my-1 px-5 py-1 text-[14px] font-bold text-gray-heavy hover:text-primary-normal"
          >
            전화로 결정
          </button>
        </div>
      )}
    </div>
  );
}

export default LocationChangeModal;
