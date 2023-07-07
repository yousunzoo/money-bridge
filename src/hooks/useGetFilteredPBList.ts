import { getPBList } from "@/app/apis/services/etc";
import { useLocationStore } from "@/store/location";
import { IPBListData, IParams } from "@/types/pblist";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    },
  );

  useEffect(() => {
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

  return { pbListData, fetchNextPage, hasNextPage, isFetching };
};
