"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/pbdetailPage/Intro";
import TopNav from "@/components/common/TopNav";
import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { useQuery } from "@tanstack/react-query";
import { getPbContent } from "@/app/apis/services/pb";
import { usePathname } from "next/navigation";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function PbDetailContent() {
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: userData } = useQuery(["/auth/account"], getLoginedUserInfo);

  const data = authProfile.data;
  const introData = {
    id: data.id,
    profile: data.profile,
    name: data.name,
    isBookmarked: data.isBookmarked,
    branchName: data.branchName,
    msg: data.msg,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };

  const [role, setRole] = useState<string>("");

  useEffect(() => {
    setRole(userData?.role);
  }, [userData]);

  return (
    <div className="mb-32">
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} role={role} />
      <ContentCardList queryKey={`/auth/boards/${id}`} api={getPbContent} id={id} />
    </div>
  );
}

export default PbDetailContent;
