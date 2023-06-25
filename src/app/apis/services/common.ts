import { CoordinateProps } from "@/types/location";
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
import { PbListSectionPorps } from "@/types/main";
import { AxiosError } from "axios";

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

export const getSuggestionPB = async ({ latitude, longitude }: CoordinateProps): Promise<PbListSectionPorps[]> => {
  try {
    const res = await instance.get("/main/pb", {
      params: {
        latitude,
        longitude,
      },
    });
    return res.data.data.list;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getContents = async () => {
  try {
    const res = await instance.get("/main/board");
    return res.data.data.list;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};