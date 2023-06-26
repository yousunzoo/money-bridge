import { Axios, AxiosError } from "axios";
import { ConsultationTimeCardProps } from "@/types/schedule";
import { formInstance, instance } from "../axios";

export const getPBInfo = async () => {
  try {
    const res = await instance.get("/pb/mypage");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
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

export const getPBMyProfile = async () => {
  try {
    const res = await instance.get("/pb/portfolio/update");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const editPBMyProfile = async (formData: FormData) => {
  try {
    const res = await formInstance.put("/pb/profile", formData);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
