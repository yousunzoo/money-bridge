import { instance } from "@/app/apis/axios";
import { IConvertedAnswers } from "@/types/analysis";
import { AxiosError } from "axios";

export const getBookMarkPB = async (page: number) => {
  try {
    const res = await instance.get("/user/bookmarks/pb", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const getBookMarkContent = async (page: number) => {
  try {
    const res = await instance.get("/auth/bookmarks/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const getReservationData = async (pbId: string) => {
  try {
    const res = await instance.get(`/user/reservation/base/${pbId}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const checkPropensity = async (score: number) => {
  try {
    const res = await instance.post("/user/propensity", { score });
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getUserInfo = async () => {
  try {
    const res = await instance.get("/user/mypage");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getMyPropensity = async () => {
  try {
    const res = await instance.get("/user/mypage/list/pb");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const reserve = async (data: { pbId: number; answers: IConvertedAnswers }) => {
  const { pbId, answers } = data;
  try {
    const res = await instance.post(`/user/reservation/${pbId}`, answers);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getRecommendedPBList = async (page: number) => {
  try {
    const res = await instance.get("user/list/pb", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const postBookMarkPB = async (id: number) => {
  try {
    const res = await instance.post(`/user/bookmark/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const deleteBookMarkPB = async (id: number) => {
  try {
    const res = await instance.delete(`/user/bookmark/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const postBookMarkContent = async (id: number) => {
  try {
    const res = await instance.post(`/auth/bookmark/board/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const deleteBookMarkContent = async (id: number) => {
  try {
    const res = await instance.delete(`auth/bookmark/board/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const getUserContents = async () => {
  try {
    const res = await instance.get("/user/main/board");
    return res.data.data.list;
  } catch (error) {
    throw error;
  }
};
