import { instance } from "@/app/apis/axios";

export const getLoungeBoard = async () => {
  try {
    const res = await instance.get("/lounge/board");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getLoungeHot = async (page: number) => {
  try {
    const res = await instance.get("/boards/hot", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getLoungeNew = async (page: number) => {
  try {
    const res = await instance.get("/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getContentsId = async (id: number) => {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};
