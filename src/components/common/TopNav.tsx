"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import arrayBack from "/public/assets/images/arrayBack.svg";
import close from "/public/assets/images/close.svg";

function TopNav({
  title,
  hasBack,
  hasClose,
  path = "",
  backgroundColor = "#ffffff",
}: {
  title: string;
  hasBack?: boolean;
  hasClose?: boolean;
  path?: string;
  backgroundColor?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={`fixed top-0 grid h-[40px] min-w-[425px] grid-cols-3 items-center bg-[${backgroundColor}] px-[16px]`}
    >
      <div className="flex">
        {hasBack && (
          <button onClick={() => router.back()}>
            <Image src={arrayBack} alt="Back" />
          </button>
        )}
      </div>
      <span className="text-center font-bold leading-[22px]">{title}</span>
      <div className="flex justify-end">
        {hasClose && (
          <button onClick={() => router.replace(path)}>
            <Image src={close} alt="Close" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TopNav;
