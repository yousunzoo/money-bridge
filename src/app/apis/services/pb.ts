import { AxiosError } from "axios";
import { instance } from "../axios";

export const getPBInfo = async () => {
  try {
    const res = await instance.get("/pb/mypage");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

export const getConsultationStatus = async () => {
  try {
    const res = await instance.get("pb/management/recent");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

interface ConsultationListPorps {
  type: string;
  page: number;
}

export const getConsultationList = async ({ type, page }: ConsultationListPorps) => {
  try {
    const res = await instance.get("pb/management/reservations", {
      params: {
        page,
        type,
      },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
