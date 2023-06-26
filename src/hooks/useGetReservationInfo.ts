import { getReservationInfo } from "@/app/apis/services/pb";
import { ReservationData } from "@/types/pb";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetReservationInfo = (slug: number) => {
  const {
    data: reservationInfo,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useQuery<ReservationData, AxiosError>({
    queryKey: ["getReservationInfo", slug],
    queryFn: () =>
      getReservationInfo({
        id: slug,
      }),
  });

  return { reservationInfo, reservationLoading, reservationError };
};
