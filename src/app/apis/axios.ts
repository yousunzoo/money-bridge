import axios, { AxiosError } from "axios";
import { getCookie } from "@/utils/cookies";

const createInstance = (ContentType: string) => {
  const instance = axios.create({
    // TODO: env
    baseURL: "http://ec2-3-37-11-7.ap-northeast-2.compute.amazonaws.com:8080/",
    // baseURL: "http://43.201.57.38:8080/",
    timeout: 3000,
    headers: {
      "Content-Type": ContentType,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    request => {
      const token = getCookie("Authorization");
      if (token) request.headers["Authorization"] = `${token}`;
      return request;
    },
    (error: AxiosError) => {
      console.log(error);
      return Promise.reject(error);
    },
  );

  return instance;
};
export const instance = createInstance("application/json");
export const formInstance = createInstance("multipart/form-data");
