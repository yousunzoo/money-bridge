import { instance } from "../axios";
import { AxiosError } from "axios";
import { IPBListParams, IPBListRequest } from "@/types/pblist";

export const getFAQs = async (page: number) => {
  try {
    const res = await instance.get("/faqs", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getNotices = async (page: number) => {
  try {
    const res = await instance.get("/notices", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const reissueToken = async () => {
  try {
    const res = await instance.post("/reissue");
    return res;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getCompanyListwithLogo = async () => {
  try {
    const res = await instance.get("/companies?includeLogo=true");
    return res.data.data.list;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getPBList = async (data: IPBListRequest, page: number, isLogined: boolean) => {
  try {
    const params: IPBListParams = { page };
    if (data.sort === "distance") {
      params.latitude = Number(data.location.latitude).toFixed(5);
      params.longitude = Number(data.location.longitude).toFixed(5);
    }
    if (data.speciality && data.speciality !== "ALL") {
      params.speciality = data.speciality;
    }
    if (data.company && data.company !== "ALL") {
      params.company = data.company;
    }
    const url = isLogined ? `/auth/list/pb/${data.sort}` : `/list/pb/${data.sort}`;
    const res = await instance.get(url, { params });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
