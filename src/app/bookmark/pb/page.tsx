import React from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";

function PbBookMark({ data }: any) {
  return (
    data && (
      <div>
        <PbCardList props={data} />
      </div>
    )
  );
}

export default PbBookMark;
