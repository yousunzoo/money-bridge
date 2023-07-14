import { getUserReservationInfo } from "@/app/apis/services/user";
import { UserReservationData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUserReservationInfo = (slug: number) => {
  const {
    data: reservationInfo,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useQuery<UserReservationData, AxiosError>({
    queryKey: ["getUserReservationInfo", slug],
    queryFn: () =>
      getUserReservationInfo({
        id: slug,
      }),
  });
  return { reservationInfo, reservationLoading, reservationError };
};
