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

export const getPBMyProfile = async () => {
  try {
    const res = await instance.get("/pb/portfolio/update");
    return res.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
};
