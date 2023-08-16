import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";
import StockFirmSection from "./StockFirmSection";
import getQueryClient from "@/utils/getQueryClient";

async function HydrateStockFirm() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["companyList"], getCompanyListwithLogo);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <StockFirmSection />
    </Hydrate>
  );
}

export default HydrateStockFirm;
