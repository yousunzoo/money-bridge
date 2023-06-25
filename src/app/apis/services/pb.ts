import { ConsultationTimeCardProps } from "@/types/schedule";
import { instance } from "../axios";
import { AxiosError } from "axios";

export const getPBInfo = async () => {
  try {
    const res = await instance.get("/pb/mypage");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

interface GetScheduleInfoProps {
  year?: number;
  month?: number;
}

export const getScheduleInfo = async ({ year, month }: GetScheduleInfoProps) => {
  try {
    const res = await instance.get("/pb/reservation", {
      params: {
        year,
        month,
      },
    });
    return res.data.data;
  } catch (error) {}
};

export const getConsultTime = async () => {
  try {
    const res = await instance.get("/pb/consultTime");
    return res.data.data;
  } catch (error: any) {
    new AxiosError(error.response.data);
  }
};

export interface ConsultTimeProps {
  consultStart: string;
  consultEnd: string;
  consultNotice: string;
}
export const updateConsultTime = async ({ consultStart, consultEnd, consultNotice }: ConsultationTimeCardProps) => {
  try {
    const res = await instance.post("/pb/consultTime", {
      consultStart,
      consultEnd,
      consultNotice,
    });
    return res;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
