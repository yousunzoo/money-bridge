import { instance } from "../axios";

export const getFAQs = async (curPage: number) => {
  try {
    const res = await instance.get("/FAQ", { params: { curPage } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getNotices = async (curPage: number) => {
  try {
    const res = await instance.get("/notices", { params: { curPage } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
