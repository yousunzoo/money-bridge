import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import { getCompanyListwithLogo } from "@/app/apis/services/etc";
import StockFirmSection from "./StockFirmSection";

async function HydrateStockFirm() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["companyListser"], getCompanyListwithLogo);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <StockFirmSection />
    </Hydrate>
  );
}

export default HydrateStockFirm;
