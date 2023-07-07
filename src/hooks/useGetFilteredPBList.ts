import { getPBList } from "@/app/apis/services/etc";
import { useLocationStore } from "@/store/location";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IPbCard } from "@/types/card";

export interface IParams {
  sort: "distance" | "career";
  speciality?: string;
  company?: string;
}

export interface IPBListData {
  list: IPbCard[];
  totalElements: number;
  totalPages: number;
  curPage: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const useGetFilteredPBlist = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const {
    locations: {
      coordinate: { latitude, longitude },
    },
  } = useLocationStore();
  const sortParam = (searchParams.get("sort") || "distance") as "distance" | "career";
  const speciality = searchParams.get("speciality");
  const company = searchParams.get("company");
  const [params, setParams] = useState<IParams>({ sort: sortParam });
  const [queryKey, setQueryKey] = useState<string[]>([]);

  const {
    data: pbListData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery<IPBListData, AxiosError>(
    queryKey,
    ({ pageParam = 0 }) => {
      const locatedParams = { ...params, location: { latitude, longitude } };
      return getPBList(locatedParams, pageParam);
    },
    {
      getNextPageParam: ({ curPage, last }) => (last ? false : curPage + 1),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    if (company) {
      const newParams = { ...params, sort: sortParam, company };
      if (newParams["speciality"]) {
        delete newParams["speciality"];
      }
      setParams({ ...newParams });
      setQueryKey(["company", sortParam, company]);
    }
    if (speciality) {
      const newParams = { ...params, sort: sortParam, speciality };
      if (newParams["company"]) {
        delete newParams["company"];
      }
      setParams({ ...newParams });
      setQueryKey(["speciality", sortParam, speciality]);
    }
  }, [company, speciality, sortParam]);

  useEffect(() => {
    if (!isMounted) return;
    refetch();
  }, [latitude, longitude]);

  return { pbListData, fetchNextPage, hasNextPage, isFetching };
};
