"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import arrayBack from "/public/assets/images/arrayBack.svg";
import logo from "/public/assets/images/logo.png";
import { useGeoLocation } from "@/hooks/useGeoLacation";
import arrowDown from "/public/assets/images/arrowDown.svg";
import SelectLocationModal from "../mainPage/SelectLocationModal";
import { useLocationStore } from "@/store/location";
import { useQuery } from "@tanstack/react-query";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { useMyPageCheck } from "@/hooks/useMyPageCheck";

const logoPath = ["/", "/lounge"];

function TopNav({ title, hasBack, backGroundWhite }: { title: string; hasBack?: boolean; backGroundWhite?: boolean }) {
  const router = useRouter();
  const currentPath = usePathname();
  const current = useGeoLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { locations } = useLocationStore();
  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  const [mounted, setMounted] = useState<boolean>(false);

  const { logout } = useMyPageCheck(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed left-1/2 top-0 z-20 flex h-[60px] w-full min-w-[390px] max-w-[768px] -translate-x-1/2 items-center justify-between px-4 ${
          backGroundWhite ? "bg-white" : "bg-background-primary"
        }`}
      >
        <div className="flex min-w-[100px] justify-self-start">
          {(logoPath.includes(currentPath) || currentPath === "/pblist") && (
            <div className="flex cursor-pointer text-base font-bold" onClick={modalOpenHandler}>
              {locations.location ? locations.location : <span>위치 선택</span>}
              <Image className="mr-2" src={arrowDown} alt={"arrowDown"} width={22} height={14} />
            </div>
          )}
          {hasBack && (
            <button className="flex h-6 w-6 items-center justify-center" onClick={() => router.back()}>
              <Image src={arrayBack} alt="Back" height={24} />
            </button>
          )}
        </div>
        {logoPath.includes(currentPath) ? (
          <div className="flex self-center justify-self-center text-center font-bold leading-[22px]">
            <Image src={logo} alt="logo" width={120} height={20} onClick={() => router.push("/")} />
          </div>
        ) : (
          <span className="justify-self-center text-center font-bold leading-[22px]">{title}</span>
        )}
        <div className="flex min-w-[100px] justify-self-end">
          {logoPath.includes(currentPath) && (
            <>
              {userInfo ? (
                <button onClick={() => logout()}>로그아웃</button>
              ) : (
                <button onClick={() => router.push("/login")}>로그인/회원가입</button>
              )}
            </>
          )}
        </div>
      </div>
      {isOpenModal && <SelectLocationModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
}

export default TopNav;
