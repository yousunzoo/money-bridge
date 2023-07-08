import React, { useState } from 'react'
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import { getSearchPb } from '@/app/apis/services/common';

function PbResult({ value }: { value: string }) {
  const [result, setResult] = useState(false);
  return (
    <>
      {value !== "" && (
        <>
          <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
            {result ? <>PB 검색 결과</> : <>일치하는 정보가 없습니다</>}
          </div>
          <PbCardList
            queryKey={["getSearchPb", value]}
            api={getSearchPb}
            etc={value}
            setResult={setResult}
            bookmarks={false}
          />
        </>
      )}
    </>
  );
}

export default PbResult