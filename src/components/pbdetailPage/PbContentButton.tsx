import React from "react";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className={mainStyle}>
      <button
        onClick={() => router.replace(path1)}
        className={`${subStyle1} ${pathname === path1 ? "bg-primary-normal text-white" : ""}`}
      >
        {text1}
      </button>
      <button
        onClick={() => router.replace(path2)}
        className={`${subStyle2} ${pathname === path2 ? "bg-primary-normal text-white" : ""}`}
      >
        {text2}
      </button>
    </div>
  );
}

export default PbContentButton;
