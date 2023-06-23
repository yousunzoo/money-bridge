import { getCookie } from "@/utils/cookies";
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

export const reissueToken = async () => {
  try {
    const res = await instance.post("/reissue");
    console.log(getCookie("refreshToken"));
    return res;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
