import { getPBInfo } from "@/app/apis/services/pb";
import { speciality } from "@/constants/pbListMenu";
import { IPBInfo } from "@/types/my";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PBInfo() {
  const { data, isLoading } = useQuery<IPBInfo, AxiosError>({
    queryKey: ["getPBInfo"],
    queryFn: getPBInfo,
    staleTime: Infinity,
  });

  if (!data || isLoading) return;

  const { name, profile, branchName, msg, career, speciality1, speciality2, reserveCount, reviewCount } = data;
  const pbSpeciality1 = speciality.find(item => item.id === speciality1)?.text;
  const pbSpeciality2 = speciality.find(item => item.id === speciality2)?.text;

  return (
    <section className="mb-10">
      <h2 className="mb-9 text-2xl font-bold">
        반가워요, {name}PB님!
        <br />
        오늘은 어떤 투자자를 만나볼까요?
      </h2>
      <article className="w-full rounded-md bg-white p-4 shadow-md">
        <div className="mb-6 flex">
          <Image width={60} height={60} className="mr-3 h-[60px] max-w-[60px] rounded-full" src={profile} alt={name} />
          <div>
            <p className="font-bold">{name} PB</p>
            <p className="text-xs">{branchName}</p>
            <p className="text-xs text-gray-normal">
              <b>{pbSpeciality1}</b>{" "}
              {pbSpeciality2 && (
                <>
                  및 <b>{pbSpeciality2}</b>
                </>
              )}{" "}
              &#183; {career}년차
            </p>
          </div>
        </div>
        <p className="mb-3 rounded-[8px] bg-background-secondary py-2 text-center font-bold text-primary-normal shadow-md">
          "{msg}"
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-6 text-xs">
            <p>
              <b>총 상담횟수</b> {reserveCount}회
            </p>
            <p>
              <b>상담 후기</b> {reviewCount}건
            </p>
          </div>
          <Link
            href="/my/editProfile"
            className="w-[110px] rounded-[8px] bg-primary-normal py-2 text-center text-xs font-bold text-white"
          >
            프로필 등록
          </Link>
        </div>
      </article>
    </section>
  );
}

export default PBInfo;
