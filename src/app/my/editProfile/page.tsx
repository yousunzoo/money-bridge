"use client";

import TopNav from "@/components/common/TopNav";
import EditProfileForm from "@/components/myPage/EditProfilePage/EditProfileForm";
import { useQuery } from "@tanstack/react-query";
import { getPBMyProfile } from "@/app/apis/services/pb";
import { AxiosError } from "axios";
import { IPBMyProfile } from "@/types/my";
import { redirect } from "next/navigation";

function EditProfilePage() {
  const { data: pbProfile, isError } = useQuery<any, AxiosError, IPBMyProfile>(["PBMyProfile"], getPBMyProfile);
  if (isError) {
    redirect("/");
  }

  return (
    <>
      <TopNav title="프로필 수정" hasBack={true} />
      <div className="mb-8 text-xs">
        <p>*해당 프로필은 리스트 상에 노출되는 정보이오니 신중히 입력해 주세요.</p>
        <p>*일부 정보는 회원가입 시 등록하신 정보가 반영됩니다.</p>
      </div>
      {pbProfile && <EditProfileForm existingProfile={pbProfile} />}
    </>
  );
}

export default EditProfilePage;
