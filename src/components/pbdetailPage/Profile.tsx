import Image from "next/image";
import { IProfile } from "@/types/pb";

function Profile({ notLoginData }: { notLoginData: IProfile }) {
  const { profile, msg, companyLogo } = notLoginData;
  return (
    <div className="relative h-[486px] w-full">
      <div className="relative h-[60px] w-[100px]">
        <Image src={companyLogo} alt="증권사 로고" fill className="object-contain" priority />
      </div>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-0% to-60%"></div>
      <Image src={profile} alt="프로필 이미지" fill className="object-contain" priority />
      <div className="absolute bottom-[60px] left-[24px] z-10 h-[70px] w-[285px] text-[26px] font-bold text-white">
        {msg}
      </div>
    </div>
  );
}

export default Profile;
