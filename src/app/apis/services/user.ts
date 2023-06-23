import { instance } from "@/app/apis/axios";

export const getBookMarkPB = async (page: number) => {
  try {
    const res = await instance.get("/user/bookmarks/pb", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getBookMarkContent = async (page: number) => {
  try {
    const res = await instance.get("/auth/bookmarks/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getReservationData = async (pbId: string) => {
  try {
    const res = await instance.get(`/user/reservation/base/${pbId}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
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
