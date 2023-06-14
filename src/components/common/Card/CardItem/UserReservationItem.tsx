"use client";

import React, { ReactNode } from "react";
import DefaultProfile from "/public/assets/images/default_profile.png";
import Image from "next/image";

interface UserReservationItemProps {
  children: ReactNode;
  buttonName: string;
}

function UserReservationItem({ children, buttonName }: UserReservationItemProps) {
  const onClickhandler = () => {
    console.log("click");
  };
  return (
    <li className="mx-auto flex h-[100px] max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-md">
      <div className="flex items-center ">
        <Image
          src={DefaultProfile}
          width={130}
          height={130}
          alt="default_profile"
          className="max-w-[60px] rounded-2xl"
        />
      </div>
      <div className="flex w-full flex-col justify-center rounded-lg px-4 py-3 ">{children}</div>

      <div className="flex items-center">
        <button className="w-[90px] rounded-lg bg-black px-1 py-1.5 text-sm text-white" onClick={onClickhandler}>
          + {buttonName}
        </button>
      </div>
    </li>
  );
}

export default UserReservationItem;
