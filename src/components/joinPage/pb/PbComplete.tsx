import Image from "next/image";
import React from "react";
import polygon from "/public/assets/images/polygon.svg";
import arrayBackGray from "/public/assets/images/arrayBackGray.svg";
import iconMail from "/public/assets/images/iconMail.svg";
import iconEdit from "/public/assets/images/iconEdit.svg";
import iconMatching from "/public/assets/images/iconMatching.svg";
import Link from "next/link";

function PbComplete() {
  return (
    <>
      <p className="font-bold">반갑습니다 PB님 :&#41;</p>
      <p className="text-3xl font-bold leading-[42px]">
        회원가입이
        <br />
        완료되었습니다
      </p>
      <div className=" mt-14 flex items-center justify-center gap-6 px-[26px]">
        <div className=" relative flex h-[86px] w-[54px] flex-col items-center">
          <div className="absolute top-[-35px] flex w-[106px] items-center justify-center rounded-[8px] bg-primary-light px-2.5 py-1">
            <span className="text-tiny text-white">메일을 확인해 주세요.</span>
            <Image src={polygon} alt="polygon" width={12} height={12} className="absolute -bottom-2" />
          </div>
          <div className="flex h-[54px] w-full items-center justify-center rounded-full bg-primary-normal">
            <Image src={iconMail} alt="iconMail" width={24} height={24} />
          </div>
          <div className="mt-3 text-center">
            <p className="text-tiny font-bold leading-[10px] text-[#666666]">STEP.1</p>
            <p className="text-xs font-bold leading-3 tracking-[-1px]">인증완료</p>
          </div>
        </div>
        <Image src={arrayBackGray} alt="arrayBackGray" width={24} height={24} />
        <div className="flex h-[86px] w-[54px] flex-col items-center">
          <div className="flex h-[54px] w-full items-center justify-center rounded-full bg-primary-normal">
            <Image src={iconEdit} alt="iconEdit" width={24} height={24} />
          </div>
          <div className="mt-3 text-center">
            <p className="text-tiny font-bold leading-[10px] text-[#666666]">STEP.2</p>
            <p className="text-xs font-bold leading-3 tracking-[-1px]">프로필 등록</p>
          </div>
        </div>
        <Image src={arrayBackGray} alt="arrayBackGray" width={24} height={24} />
        <div className="flex h-[86px] w-[54px] flex-col items-center">
          <div className="flex h-[54px] w-full items-center justify-center rounded-full bg-primary-normal">
            <Image src={iconMatching} alt="iconMatching" width={24} height={24} />
          </div>
          <div className="mt-3 text-center">
            <p className="text-tiny font-bold leading-[10px] text-[#666666]">STEP.3</p>
            <p className="text-xs font-bold leading-3 tracking-[-1px]">매칭 시작</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center text-xs font-bold leading-5">
        <p>PB 인증 여부를 메일로 보내드립니다 (영업일 1-3일 이내)</p>
        <p>메일이 오지 않았다면 스팸함을 확인해주세요</p>
        <br />
        <p className="font-normal">인증 완료 후 프로필을 등록하시면</p>
        <p className="font-normal">투자자 매칭이 시작됩니다.</p>
      </div>
      <Link
        href="/"
        className="my-24 flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-xl font-bold text-white"
      >
        홈으로 가기
      </Link>
    </>
  );
}

export default PbComplete;
