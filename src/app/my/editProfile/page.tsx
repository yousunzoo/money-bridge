"use client";

import EditProfileForm from "@/components/myPage/EditProfilePage/EditProfileForm";
import { useQuery } from "@tanstack/react-query";
import { getPBMyProfile } from "@/app/apis/services/pb";
import { AxiosError } from "axios";
import { IPBMyProfile } from "@/types/my";
import { redirect } from "next/navigation";

function EditProfilePage() {
  const {
    data: pbProfile,
    isError,
    isSuccess,
  } = useQuery<IPBMyProfile, AxiosError>(["PBMyProfile"], getPBMyProfile, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
  if (isError) {
    redirect("/");
  }

  return isSuccess && <EditProfileForm existingProfile={pbProfile} />;
}

export default EditProfilePage;
