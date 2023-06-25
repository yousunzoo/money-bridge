import { instance } from "../axios";
import useBookMark from "./../../../hooks/useBookMark";

export const getPBInfo = async () => {
  try {
    const res = await instance.get("/pb/mypage");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

export const getPbNotLogin = async (id: number) => {
  try {
    const res = await instance.get(`/profile/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbProfile = async (id: number) => {
  try {
    const res = await instance.get(`/auth/profile/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbPortfolio = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/auth/portfolio/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getSamePb = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/auth/${id}/same`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbContent = async (id: number, page: number) => {
  try {
    const res = await instance.get(`/auth/boards/${id}`, { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getReviewStyle = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/review/style/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbReviewRecent = async (id: number | undefined) => {
  try {
    const res = await instance.get(`/reviews/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const getPbReview = async (id: number | undefined, page: number) => {
  try {
    const res = await instance.get(`auth/reviews/${id}`, { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};
