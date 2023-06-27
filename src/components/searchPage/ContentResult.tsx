import React, { useState } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { getSearchContent } from "@/app/apis/services/common";

function ContentResult({ contentValue}: { contentValue: string; }) {
  const [result, setResult] = useState(false);
  return (
    <>
      {contentValue !== "" && (
        <>
          <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
            {result ? <>콘텐츠 검색 결과</> : <>일치하는 정보가 없습니다</>}
          </div>
          <ContentCardList
            queryKey={["getSearchContent", contentValue]}
            api={getSearchContent}
            etc={contentValue}
            setResult={setResult}
          />
        </>
      )}
    </>
  );
}

export default ContentResult;
