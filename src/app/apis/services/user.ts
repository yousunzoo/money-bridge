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

export const checkPropensity = async (score: number) => {
  try {
    const res = await instance.post("/user/propensity", { score });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserInfo = async () => {
  try {
    const res = await instance.get("/user/mypage");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

export const getMyPropensity = async () => {
  try {
    const res = await instance.get("/user/mypage/list/pb");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};
