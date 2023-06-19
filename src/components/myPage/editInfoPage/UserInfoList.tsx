import Image from "next/image";
import Link from "next/link";
import React from "react";

function UserInfoList({ userInfo }: { userInfo: { name: string; phoneNumber: string; email: string } }) {
  const { name, phoneNumber, email } = userInfo;
  const convertedPhoneNumber = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  return (
    <ul>
      <li className="flex w-full items-center border-b-1 border-button-inactive p-4">
        <span className="w-[80px] text-gray-heavy">[이메일]</span>
        <span className="mr-auto">{email}</span>
        <span className="text-xs text-status-caution">변경불가</span>
      </li>
      <li className="border-b-1 border-button-inactive p-4">
        <Link className="flex w-full items-center" href="/my/editInfo/password">
          <span className="w-[80px] text-gray-heavy">[비밀번호]</span>
          <span className="mr-auto">비밀번호 변경하기</span>
          <Image src="/assets/images/nextIcon.svg" width={12} height={20} alt="비밀번호 변경하기" />
        </Link>
      </li>
      <li className="border-b-1 border-button-inactive p-4">
        <Link className="flex w-full items-center" href="/my/editInfo/name">
          <span className="w-[80px] text-gray-heavy">[이름]</span>
          <span className="mr-auto">{name}</span>
          <Image src="/assets/images/nextIcon.svg" width={12} height={20} alt="이름 변경하기" />
        </Link>
      </li>
      <li className="border-b-1 border-button-inactive p-4">
        <Link className="flex w-full items-center" href="/my/editInfo/phoneNumber">
          <span className="w-[80px] text-gray-heavy">[휴대전화]</span>
          <span className="mr-auto">{convertedPhoneNumber}</span>
          <Image src="/assets/images/nextIcon.svg" width={12} height={20} alt="전화번호 변경하기" />
        </Link>
      </li>
    </ul>
  );
}

export default UserInfoList;
