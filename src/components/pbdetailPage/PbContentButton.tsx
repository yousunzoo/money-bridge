import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function PbContentButton({
  path1,
  path2,
  text1,
  text2,
  mainStyle,
  subStyle1,
  subStyle2,
}: {
  path1: string;
  path2: string;
  text1: string;
  text2: string;
  mainStyle: string;
  subStyle1: string;
  subStyle2: string;
}) {
  const pathname = usePathname();

  return (
    <div className={mainStyle}>
      <Link href={path1} className={`${subStyle1} ${pathname === path1 ? "bg-primary-normal text-white" : ""}`}>
        {text1}
      </Link>
      <Link href={path2} className={`${subStyle2} ${pathname === path2 ? "bg-primary-normal text-white" : ""}`}>
        {text2}
      </Link>
    </div>
  );
}

export default PbContentButton;
