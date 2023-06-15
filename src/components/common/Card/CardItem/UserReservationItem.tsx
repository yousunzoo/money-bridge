"use client";

import React, { ReactNode } from "react";
import DefaultProfile from "/public/assets/images/profile.svg";
import Image from "next/image";

interface UserReservationItemProps {
  children: ReactNode;
  buttonName: string;
  onClickhandler: () => void;
  isRole: string;
  profileImage?: string;
}

function UserReservationItem({ children, buttonName, onClickhandler, isRole, profileImage }: UserReservationItemProps) {
  return (
    <li className="flex h-[90px] w-full justify-between overflow-hidden rounded-xl bg-white pl-4 shadow-md">
      <div className="flex items-center">
        <Image
          src={profileImage ? profileImage : DefaultProfile}
          width={70}
          height={70}
          alt="profile"
          className=" max-w-[70px]"
        />
      </div>
      <div className="flex flex-col justify-center rounded-lg px-4 py-3 ">{children}</div>

      <button
        className={
          isRole === "user"
            ? "text-lg ml-auto h-auto w-[100px] justify-end rounded-r-lg bg-secondary-heavy font-bold text-white"
            : "text-lg ml-auto h-auto w-[100px] justify-end rounded-r-lg bg-primary-normal font-bold text-white"
        }
        onClick={onClickhandler}
      >
        {buttonName}
      </button>
    </li>
  );
}

export default UserReservationItem;
