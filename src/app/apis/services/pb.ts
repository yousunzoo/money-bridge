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
    const res = await instance.get("/pb/management/recent");
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
    const res = await instance.get("/pb/management/reservations", {
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

export const getReservationInfo = async ({ id }: { id: number }) => {
  try {
    const res = await instance.get(`/pb/reservation/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

interface changeReservationProps {
  id: number;
  category: string;
  time: string;
  type: string;
}

export const changeReservation = async ({ id, category, time, type }: changeReservationProps) => {
  try {
    const res = await instance.patch(`/pb/reservation/${id}`, {
      params: {
        category,
        time,
        type,
      },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const confirmedReservation = async ({ id, time }: { id: number; time: string }) => {
  try {
    const res = await instance.patch(`/pb/reservation/${id}/confirmed`, {
      params: {
        time,
      },
    });
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const completedReservation = async (id: number) => {
  try {
    const res = await instance.patch(`/auth/reservation/${id}/completed`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};

export const deleteReservation = async (id: number) => {
  try {
    const res = await instance.delete(`/auth/reservation/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
