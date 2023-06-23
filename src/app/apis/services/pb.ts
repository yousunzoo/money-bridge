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
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbProfile = async (id: any) => {
  try {
    const res = await instance.get(`/auth/profile/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};


export const getPbPortfolio = async (id: any) => {
  try {
    const res = await instance.get(`/auth/portfolio/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getSamePb = async (id: any) => {
  try {
    const res = await instance.get(`/auth/${id}/same`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbContent = async (id: any, page:number) => {
  try {
    const res = await instance.get(`/auth/boards/${id}`, { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getReviewStyle = async (id: any) => {
  try {
    const res = await instance.get(`/review/style/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbReviewRecent = async (id: any) => {
  try {
    const res = await instance.get(`/reviews/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};