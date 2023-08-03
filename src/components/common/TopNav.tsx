"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import arrayBack from "/public/assets/images/arrayBack.svg";
import logo from "/public/assets/images/logo.png";
import arrowDown from "/public/assets/images/arrowDown.svg";
import SelectLocationModal from "../mainPage/SelectLocationModal";
import { useLocationStore } from "@/store/location";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import { OPTIONS } from "@/constants/topNavOptions";

const LOGO_PAGES = ["/", "/lounge"];

export function TopNav() {
  const router = useRouter();
  const currentPath = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { locations } = useLocationStore();
  const { userInfo } = useGetUserInfo();
  const logout = useLogout();

  let current: any = null;

  if (currentPath === "/") {
    // 메인 페이지 경로 처리
    current = OPTIONS.find(option => option.href === "/main");
  } else {
    // 그 외 페이지 경로 처리
    current = OPTIONS.find(option => currentPath.includes(option.href));
  }

  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    setMounted(true);
  }, [locations.location]);

  if (!current) return;
  const routingHandler = () => {
    current.path ? router.push(current.path) : router.back();
  };
  if (!mounted) return null;
  return (
    <>
      <div
        className={`fixed left-1/2 top-0 z-20 flex h-[60px] w-full min-w-[390px] max-w-[768px] -translate-x-1/2 items-center justify-between px-4 ${
          current.backGroundWhite ? "bg-white" : "bg-background-primary"
        }`}
      >
        <div className="flex min-w-[100px] justify-self-start">
          {(LOGO_PAGES.includes(currentPath) || currentPath === "/pblist") && (
            <div className="flex cursor-pointer text-base font-bold" onClick={modalOpenHandler}>
              {locations.location}
              <Image className="mr-2" src={arrowDown} alt={"arrowDown"} width={22} height={14} />
            </div>
          )}
          {current.hasBack && (
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
          <span className="justify-self-center text-center font-bold leading-[22px]">{current.title}</span>
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
