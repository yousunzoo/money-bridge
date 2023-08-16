import { getSuggestionPB } from "@/app/apis/services/common";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import PbListSection from "./PbListSection";
import getQueryClient from "@/utils/getQueryClient";

async function HydratePbList() {
  const queryClient = getQueryClient();
  /* @ts-expect-error Server Component */
  await queryClient.prefetchQuery(["pbSuggestionPB"], getSuggestionPB({ latitude: 0, longitude: 0 }));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PbListSection />
    </Hydrate>
  );
}

export default HydratePbList;
