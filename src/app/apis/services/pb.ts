import { instance } from "../axios";

export const getPBInfo = async () => {
  try {
    const res = await instance.get("/pb/mypage");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

export const getPbNotLogin = async (id: any) => {
  try {
    const res = await instance.get(`/profile/${id}`);
    return res;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbProfile = async (id: any) => {
  try {
    const res = await instance.get(`/auth/profile/${id}`);
    return res;
  } catch (error: any) {
    throw new Error(error.response);
  }
};


export const getPbPortfolio = async (id: any) => {
  try {
    const res = await instance.get(`/auth/portfolio/${id}`);
    return res;
  } catch (error: any) {
    throw new Error(error.response);
  }
};