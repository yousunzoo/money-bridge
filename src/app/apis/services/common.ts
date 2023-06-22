import { instance } from "@/app/apis/axios";

export const LoungeBoard = async () => {
  try {
    const res = await instance.get("/lounge/board");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const LoungeHot = async (page: number) => {
  try {
    const res = await instance.get("/boards/hot", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const LoungeNew = async (page: number) => {
  try {
    const res = await instance.get("/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const ContentsId = async (id: any) => {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};