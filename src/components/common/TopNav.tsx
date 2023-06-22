"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import arrayBack from "/public/assets/images/arrayBack.svg";
import logo from "/public/assets/images/logo.png";
import { useGeoLocation } from "@/hooks/useGeoLaction";
import arrowDown from "/public/assets/images/arrowDown.svg";
import SelectLocationModal from "../mainPage/SelectLocationModal";
import { useLocationStore } from "@/store/location";

const logoPath = ["/", "/lounge"];

function TopNav({
  title,
  hasBack,
  path = "",
  backGroundWhite,
}: {
  title: string;
  hasBack?: boolean;
  path?: string;
  backGroundWhite?: boolean;
}) {
  const router = useRouter();
  const currentPath = usePathname();
  const current = useGeoLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { locations } = useLocationStore();
  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div
        className={`fixed left-1/2 top-0 z-10 flex h-10 w-full min-w-[390px] max-w-[768px] -translate-x-1/2 items-center justify-around px-4 ${
          backGroundWhite ? "bg-white" : "bg-background-primary"
        }`}
      >
        <div className="flex min-w-[100px] justify-self-start">
          {logoPath.includes(currentPath) && (
            <div className="flex text-base cursor-pointer font-bol" onClick={modalOpenHandler}>
              {locations.location ? locations.location : <span>위치 선택</span>}
              <Image className="mr-2" src={arrowDown} alt={"arrowDown"} width={22} height={14} />
            </div>
          )}
          {hasBack && (
            <button onClick={() => router.back()}>
              <Image src={arrayBack} alt="Back" />
            </button>
          )}
        </div>
        {logoPath.includes(currentPath) ? (
          <div className="flex self-center justify-self-center text-center font-bold leading-[22px]">
            <Image src={logo} alt="logo" width={120} height={20} />
          </div>
        ) : (
          <span className="justify-self-center text-center font-bold leading-[22px]">{title}</span>
        )}
        <div className="flex min-w-[100px] justify-self-end"></div>
      </div>
      {isOpenModal && <SelectLocationModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
}

export default TopNav;
