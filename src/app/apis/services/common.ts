import { CoordinateProps } from "@/types/location";
import { instance } from "@/app/apis/axios";
import { PbListSectionPorps } from "@/types/main";
import { AxiosError } from "axios";

export const getLoungeBoard = async () => {
  try {
    const res = await instance.get("/lounge/board");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getLoungeHot = async (page: number) => {
  try {
    const res = await instance.get("/boards/hot", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getLoungeNew = async (page: number) => {
  try {
    const res = await instance.get("/boards", { params: { page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getContentsId = async (id: number) => {
  try {
    const res = await instance.get(`auth/board/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getNotLoginContents = async (id: number) => {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const deleteContent = async ({ id }: { id: number }) => {
  try {
    const res = await instance.delete(`pb/board/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response);
  }
};

export const getSuggestionPB = async ({ latitude, longitude }: CoordinateProps): Promise<PbListSectionPorps[]> => {
  try {
    const res = await instance.get("/main/pb", {
      params: {
        longitude,
        latitude,
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

export const getSearchContent = async (search: string, page: string) => {
  try {
    const res = await instance.get("/lounge/boards", { params: { search, page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const getSearchPb = async (name: string, page: string) => {
  try {
    const res = await instance.get("/pbs", { params: { name, page } });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

interface phoneNumCheckProps {
  phoneNumber: string;
  type: string;
}

export const phoneNumCheck = async ({ phoneNumber, type }: phoneNumCheckProps) => {
  try {
    const res = await instance.post(`/phonenumber?type=${type}`, { phoneNumber });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
