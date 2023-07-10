"use client";

import EditProfileForm from "@/components/myPage/EditProfilePage/EditProfileForm";
import { useQuery } from "@tanstack/react-query";
import { getPBMyProfile } from "@/app/apis/services/pb";
import { AxiosError } from "axios";
import { IPBMyProfile } from "@/types/my";
import { redirect } from "next/navigation";

function EditProfilePage() {
  const { data: pbProfile, isError } = useQuery<IPBMyProfile, AxiosError>(["PBMyProfile"], getPBMyProfile, {
    staleTime: Infinity,
  });
  if (isError) {
    redirect("/");
  }

  return pbProfile && <EditProfileForm existingProfile={pbProfile} />;
}

export default EditProfilePage;
