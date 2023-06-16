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
  backGroundWhite,
}: {
  title: string;
  hasBack?: boolean;
  hasClose?: boolean;
  path?: string;
  backGroundWhite?: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={`fixed left-1/2 top-0 grid h-10 w-full min-w-[390px] max-w-[425px] -translate-x-1/2 grid-cols-3 items-center px-4 ${
        backGroundWhite ? "bg-white" : "bg-background-primary"
      }`}
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
