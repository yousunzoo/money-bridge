import { instance } from "../axios";
import { useQuery } from "@tanstack/react-query";

export const useBookmarkPB = () => {
  const queryKey = "/user/bookmarks/pb";
  const queryFn = () =>
    // todo: 헤더 붙이기
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};

export const getReservationData = async (pbId: string) => {
  try {
    const res = await instance.get(`/user/reservation/base/${pbId}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
