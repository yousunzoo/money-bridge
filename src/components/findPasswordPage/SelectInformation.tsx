import React from "react";
import { usePathname } from "next/navigation";
import InformationItem from "../findEmailPage/InformationItem";
import { useQueryClient } from "@tanstack/react-query";
import { IFindPassword } from "@/types/login";
import Link from "next/link";

function SelectInformation() {
  const pathName = usePathname();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["findPassword"]) as IFindPassword;

  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">회원 정보를 확인해주세요.</p>
      <InformationItem information={data.data} />

      <Link
        href={`/findPassword/${pathName.split("/")[2]}/resetPassword`}
        className="mt-[266px] flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-xl font-bold text-white"
      >
        비밀번호 재설정
      </Link>
    </>
  );
}

export default SelectInformation;
