"use client";

import ButtonModal from "@/components/common/ButtonModal";
import useApiError from "@/hooks/useApiError";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";
import { getUserInfo } from "./apis/services/user";
import { getLoginedUserInfo } from "./apis/services/auth";

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const { handleError, isOpen, modalContents, setIsOpen } = useApiError();

  queryClient.setDefaultOptions({
    queries: { onError: (error: any) => handleError(error) },
    mutations: {
      onError: (error: any) => {
        handleError(error);
      },
    },
  });
  queryClient.prefetchQuery({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    staleTime: Infinity,
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isOpen && <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
