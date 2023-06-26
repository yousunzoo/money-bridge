import React from "react";
import TopNav from "@/components/common/TopNav";
import PbContentButton from "@/components/pbdetailPage/PbContentButton";

function BookMark() {
  return (
    <div className="mb-[24px]">
      <TopNav title="북마크 목록" hasBack={true} />
      <PbContentButton
        path1="/bookmark/content"
        path2="/bookmark/pb"
        text1="콘텐츠"
        text2="PB"
        mainStyle="mx-[-16px] mb-6 flex h-[52px] items-center border-[1px] border-solid border-primary-normal text-base font-bold"
        subStyle1="flex h-full w-full items-center justify-center pl-[8px]"
        subStyle2="flex h-full w-full items-center justify-center pr-[8px]"
      />
    </div>
  );
}

export default BookMark;
