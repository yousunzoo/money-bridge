"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import arrayBack from "/public/assets/images/arrayBack.svg";
import logo from "/public/assets/images/logo.png";
import { useGeoLocation } from "@/hooks/useGeoLacation";
import arrowDown from "/public/assets/images/arrowDown.svg";
import SelectLocationModal from "../mainPage/SelectLocationModal";
import { useLocationStore } from "@/store/location";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";

const LOGO_PAGES = ["/", "/lounge"];

function TopNav({
  title,
  hasBack,
  backGroundWhite,
  path,
}: {
  title: string;
  hasBack?: boolean;
  backGroundWhite?: boolean;
  path?: string;
}) {
  const router = useRouter();
  const currentPath = usePathname();

  const current = useGeoLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { locations } = useLocationStore();
  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const routingHandler = () => {
    path ? router.push(path) : router.back();
  };

  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  const [mounted, setMounted] = useState<boolean>(false);

  const logout = useLogout();

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
          {(LOGO_PAGES.includes(currentPath) || currentPath === "/pblist") && (
            <div className="flex cursor-pointer text-base font-bold" onClick={modalOpenHandler}>
              {locations.location ? locations.location : <span>위치 선택</span>}
              <Image className="mr-2" src={arrowDown} alt={"arrowDown"} width={22} height={14} />
            </div>
          )}
          {hasBack && (
            <button className="flex h-6 w-6 items-center justify-center" onClick={routingHandler}>
              <Image src={arrayBack} alt="Back" height={24} />
            </button>
          )}
        </div>
        {LOGO_PAGES.includes(currentPath) ? (
          <Link href={"/"} className="flex self-center justify-self-center text-center font-bold leading-[22px]">
            <Image src={logo} alt="logo" width={120} height={20} onClick={() => router.push("/")} />
          </Link>
        ) : (
          <span className="justify-self-center text-center font-bold leading-[22px]">{title}</span>
        )}
        <div className="flex min-w-[100px] justify-end font-bold">
          {LOGO_PAGES.includes(currentPath) && (
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

export default memo(TopNav, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.hasBack === nextProps.hasBack &&
    prevProps.backGroundWhite === nextProps.backGroundWhite
  );
});
