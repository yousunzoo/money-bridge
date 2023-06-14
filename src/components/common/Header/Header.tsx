import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="my-2 flex w-full items-center px-3">
      <Image src="/images/logo.png" alt="logo" width={30} height={30} />
      <button className="flex w-full justify-end">로그인/회원가입</button>
    </div>
  );
}

export default Header;
