"use client";
import React, { useState } from "react";
import TopNav from "@/components/common/TopNav";
import search_active from "/public/assets/images/icon/search_active.svg";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { getSearchContent, getSearchPb } from "@/app/apis/services/common";

function LoungeSearch() {
  const { data: userData, isLoading } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const [isPB, setIsPB] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [searchPb, setSearchPb] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const { data: searchContentData } = useQuery(["getSearchContent"], () =>
    getSearchContent(searchContent, 0, searchTitle),
  );
  const { data: searchPbData } = useQuery(["getSearchPb"], () => getSearchPb(searchPb, 0));

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPB) {
      setSearchPb(e.target.value);
    } else {
      // api 수정됬음 확인후 수정하기
      // setSearchContent(e.target.value);
      // setSearchTitle(e.target.value);
    }
  };

  // if (!isLoading || !searchPbData) return null;
  return (
    <>
      {userData ? (
        <>
          <TopNav title="검색하기" hasBack={true} />
          <div className="relative">
            <input
              className="search_input mt-6 h-[56px] w-full"
              type="text"
              placeholder="궁금한 정보를 검색해보세요"
              onChange={onChangeSearch}
            />
            <Image src={search_active} alt="검색 활성화" className="absolute left-4 top-10 h-[25px] w-[25px]" />
          </div>
          <div className="mt-6 flex text-base font-bold text-primary-normal">
            <div
              className={`mr-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
                isPB ? "bg-primary-normal text-white" : ""
              }`}
              onClick={() => setIsPB(true)}
            >
              PB 검색
            </div>
            <div
              className={`ml-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
                isPB ? "" : "bg-primary-normal text-white"
              }`}
              onClick={() => setIsPB(false)}
            >
              콘텐츠 검색
            </div>
          </div>
          <div className="mt-[24px]">
            {searchPbData && searchPb && (
              <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
                {searchPbData ? <>PB 검색 결과</> : <>일치하는 정보가 없습니다</>}
              </div>
            )}
            {searchContentData && searchContent && (
              <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
                {searchContentData ? <>콘텐츠 검색 결과</> : <>일치하는 정보가 없습니다</>}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoungeSearch;
