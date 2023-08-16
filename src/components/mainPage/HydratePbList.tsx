import { getSuggestionPB } from "@/app/apis/services/common";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import PbListSection from "./PbListSection";
import getQueryClient from "@/utils/getQueryClient";

async function HydratePbList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["pbSuggestionPB"],
    /* @ts-expect-error Server Component */
    getSuggestionPB({ latitude: 35.1664132, longitude: 129.1155444 }),
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <PbListSection />
    </Hydrate>
  );
}

export default HydratePbList;
