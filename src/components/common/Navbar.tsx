"use client";

import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isRole, setisRole] = useState("USER");

  return (
    <nav className="fixed bottom-0 left-1/2 min-w-[425px] -translate-x-1/2 bg-gray-200">
      <div className="flex justify-around py-4">
        <Link href="/">home</Link>
        {isRole === "USER" && <Link href="/">PB리스트</Link>}
        {isRole === "PB" && <Link href="/">고객관리</Link>}
        <Link href="/">라운지</Link>
        <Link href="/">마이페이지</Link>
      </div>
    </nav>
  );
}

export default Navbar;
