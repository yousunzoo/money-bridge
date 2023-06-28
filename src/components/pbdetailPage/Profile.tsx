import React from "react";
import Image from "next/image";
import { IProfile } from "@/types/pb";
import BlurModal from "@/components/common/Modal/BlurModal";

function Profile({ notLoginData }: { notLoginData: IProfile }) {
  const { profile, msg, companyLogo } = notLoginData;
  return (
    <>
      <div className="relative">
        <Image
          src={companyLogo}
          alt="증권사 로고"
          width={112}
          height={42}
          className="absolute left-1 top-4 z-10 h-[42px] w-[112px] cursor-pointer object-contain"
          priority
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-black from-0%"></div>
        <div className="absolute bottom-[74px] left-[19px] h-[70px] w-[285px] text-[26px] text-white">{msg}</div>
        <Image
          src={profile}
          alt="프로필 이미지"
          width={0}
          height={390}
          sizes="100vw"
          className="h-[390px] w-full"
          priority
        />
      </div>
      <BlurModal />
    </>
  );
}

export default Profile;
