import { instance } from "../axios";
import { AxiosError } from "axios";
import { IPBListParams, IPBListRequest } from "@/types/pblist";

export const getFAQs = async (page: number) => {
  try {
    const res = await instance.get("/FAQ", { params: { page } });
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
<<<<<<< HEAD
    throw new Error(error.response.data.status);
=======
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

export const getPBList = async (data: IPBListRequest, page: number) => {
  try {
    const params: IPBListParams = { page };
    if (data.sort === "distance") {
      params.latitude = data.location.latitude.toFixed(5);
      params.longitude = data.location.longitude.toFixed(5);
    }
    if (data.speciality && data.speciality !== "ALL") {
      params.speciality = data.speciality;
    }
    if (data.company && data.company !== "ALL") {
      params.company = data.company;
    }

    const res = await instance.get(`/list/pb/${data.sort}`, { params });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
>>>>>>> 323bb4a1210ce6c1f42dda85d6441723001b1f2b
  }
};
