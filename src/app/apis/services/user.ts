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

export const checkPropensity = async (propensity: number) => {
  try {
    const res = await instance.post("/user/propensity", propensity);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
