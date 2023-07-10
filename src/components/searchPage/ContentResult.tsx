import React, { useState } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { getSearchContent } from "@/app/apis/services/common";

function ContentResult({ value}: { value: string; }) {
  const [result, setResult] = useState(false);
  return (
    <>
      {value !== "" && (
        <>
          <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
            {result ? <>콘텐츠 검색 결과</> : <>일치하는 정보가 없습니다</>}
          </div>
          <ContentCardList
            queryKey={["getSearchContent", value]}
            api={getSearchContent}
            etc={value}
            setResult={setResult}
            bookmarks={false}
          />
        </>
      )}
    </>
  );
}

export default ContentResult;
