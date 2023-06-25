import { getPBList } from "@/app/apis/services/etc";
import { useLocationStore } from "@/store/location";
import { ISpeciality } from "@/types/join";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IPbCard } from "@/types/card";

export interface IParams {
  sort: "distance" | "career";
  location: { latitude: number; longitude: number };
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
  const searchParams = useSearchParams();
  const { locations } = useLocationStore();
  const sortParam = (searchParams.get("sort") || "distance") as "distance" | "career";
  const speciality = searchParams.get("speciality");
  const company = searchParams.get("company");
  const [params, setParams] = useState<IParams>({ sort: sortParam, location: { ...locations.coordinate } });
  const [queryKey, setQueryKey] = useState<string[]>([]);

  const {
    data: pbListData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<IPBListData, AxiosError>(
    queryKey,
    ({ pageParam = 0 }) => {
      return getPBList(params, pageParam);
    },
    {
      getNextPageParam: ({ curPage, last }) => (last ? false : curPage + 1),
      refetchOnWindowFocus: false,
      cacheTime: 100000,
      staleTime: 100000,
    },
  );

  useEffect(() => {
    if (company) {
      setParams({ ...params, company });
      setQueryKey(["company", sortParam, company]);
    }
    if (speciality) {
      setParams({ ...params, speciality });
      setQueryKey(["company", sortParam, speciality]);
    }
  }, [company, speciality]);

  return { pbListData, fetchNextPage, hasNextPage, isFetching };
};
