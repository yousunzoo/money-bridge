import React, { useState } from 'react'
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import { getSearchPb } from '@/app/apis/services/common';

function PbResult({ pbValue }: { pbValue: string; }) {
  const [result, setResult] = useState(false);
  return (
    <>
      {pbValue !== "" && (
        <>
          <div className="mb-[24px] h-[34px] border-b-[1px] border-b-gray-normal text-gray-normal">
            {result ? <>PB 검색 결과</> : <>일치하는 정보가 없습니다</>}
          </div>
          <PbCardList queryKey={["getSearchPb",pbValue]} api={getSearchPb} etc={pbValue} setResult={setResult} />
        </>
      )}
    </>
  );
}

export default PbResult